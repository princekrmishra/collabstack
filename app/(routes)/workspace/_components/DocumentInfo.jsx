"use client";

import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { db } from '@/config/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function DocumentInfo({ params }) {
  // ✅ Proper unwrapping of params (Next.js 15+)
  const unwrappedParams = React.use(params);
  const documentId = unwrappedParams?.documentid;

  const [coverImage, setCoverImage] = useState('/c4.svg');
  const [emoji, setEmoji] = useState();
  const [documentInfo, setDocumentInfo] = useState();

  useEffect(() => {
    if (documentId) {
      GetDocumentInfo();
    }
  }, [documentId]);

  const GetDocumentInfo = async () => {
    try {
      const docRef = doc(db, 'workspaceDocuments', documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDocumentInfo(data);
        if (data.emoji) setEmoji(data.emoji);
        if (data.coverImage) setCoverImage(data.coverImage);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const updateDocumentInfo = async (key, value) => {
    if (!documentId) return;

    try {
      const docRef = doc(db, 'workspaceDocuments', documentId);
      await setDoc(docRef, { [key]: value }, { merge: true });
      toast.success('Document Updated');
    } catch (error) {
      toast.error('Failed to update document');
      console.error(error);
    }
  };

  return (
    <div>
      {/* Cover */}
      <CoverPicker
        setNewCover={(cover) => {
          setCoverImage(cover);
          updateDocumentInfo('coverImage', cover);
        }}
      >
        <div className="relative group cursor-pointer">
          <h2 className="hidden absolute p-4 w-full h-full items-center justify-center group-hover:flex">
            Change Cover
          </h2>
          <div className="group-hover:opacity-40">
            <Image
              src={coverImage}
              width={400}
              height={400}
              className="w-full h-[220px] object-cover rounded-t-xl"
              alt="coverimage"
            />
          </div>
        </div>
      </CoverPicker>

      {/* Emoji picker */}
      <div className="absolute ml-10 mt-[-40px] cursor-pointer">
        <EmojiPickerComponent
          setEmojiIcon={(v) => {
            setEmoji(v);
            updateDocumentInfo('emoji', v);
          }}
        >
          <div className="bg-[#ffffffb0] p-4 rounded-md">
            {emoji ? (
              <span className="text-5xl">{emoji}</span>
            ) : (
              <SmilePlus className="h-10 w-10 text-gray-200" />
            )}
          </div>
        </EmojiPickerComponent>
      </div>

      {/* File Name */}
      <div className="mt-10 p-10">
        <input
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName}
          className="font-bold text-4xl outline-none"
          onBlur={(event) =>
            updateDocumentInfo('documentName', event.target.value.trim())
          }
        />
      </div>
    </div>
  );
}

export default DocumentInfo;
