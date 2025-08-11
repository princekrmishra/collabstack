"use client"
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseConfig'
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import NotificationBox from './NotificationBox'

function SideNav({ params }) {
  // unwrap params once
  const unwrappedParams = React.use(params);
  const workspaceId = Number(unwrappedParams?.workspaceid);
  const MAX_FILE=process.env.NEXT_PUBLIC_MAX_COUNT;
  const [documentList, setDocumentList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (workspaceId) {
      const unsubscribe = GetDocumentList();
      return () => unsubscribe && unsubscribe();
    }
  }, [workspaceId]);

  const GetDocumentList = () => {
    
    const q = query(
      collection(db, 'workspaceDocuments'),
      where('workspaceId', '==', workspaceId)
    );

    return onSnapshot(q, (QuerySnapshot) => {
      const docs = [];
      QuerySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setDocumentList(docs);
    });
  };

  const CreateNewDocument = async () => {
    if(documentList?.length >= MAX_FILE){
      toast("Upgrade to add new file", {
          description: "You reach max file, Please upgrade for unlimited file creation",
          action: {
            label: "Upgrade",
            onClick: () => console.log("Undo"),
          },
        })
      return;
    }
    setLoading(true);
    const docId = uuid4();

    await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
      workspaceId: workspaceId, // use unwrapped value
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: 'Untitled Document',
      documentOutput: []
    });

    await setDoc(doc(db, 'documentOutput', docId.toString()), {
            docId: docId,
            output: [],
        });

    setLoading(false);
    router.replace(`/workspace/${workspaceId}/${docId}`); // use unwrapped value
  };

  return (
    <div className='h-screen md:w-72 md:block fixed bg-blue-50 p-5 shadow-md'>
      <div className='flex justify-between items-center'>
        <Logo />
        
        <NotificationBox>
            <Bell className='h-5 w-5 text-gray-500' />
        </NotificationBox>

      </div>
      <hr className='my-5' />
      <div>
        <div className='flex justify-between items-center'>
          <h2 className='font-medium'>Workspace Name</h2>
          <Button size='sm' onClick={CreateNewDocument}>
            {loading ? <Loader2Icon className='h-4 w-4 animate-spin' /> : '+'}
          </Button>
        </div>
      </div>

      <DocumentList documentList={documentList} params={params} />

      {/* Progress Bar */}
      <div className='absolute bottom-10 w-[85%]'>
        <Progress value={(documentList?.length/MAX_FILE)*100} />
        <h2 className='text-sm font-light my-2'><strong>{documentList.length}</strong> Out of <strong>5</strong> files used</h2>
        <h2 className='text-sm font-light'>Update your plan for unlimited access</h2>
      </div>

    </div>
  );
}

export default SideNav;
