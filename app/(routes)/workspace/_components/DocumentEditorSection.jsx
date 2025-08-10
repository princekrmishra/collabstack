import React, { useState } from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import dynamic from "next/dynamic";
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import CommentBox from './CommentBox';

// ✅ Dynamically load RichDocumentEditor without SSR
const RichDocumentEditor = dynamic(() => import("./RichDocumentEditor"), {
  ssr: false,
});

function DocumentEditorSection({params}) {
    const [openComment, setOpenComment] = useState(false);
  return (
    
    <div>
        {/* Header */}
        <DocumentHeader />

        {/* Document Info */}
        <DocumentInfo params={params} />

        {/* Rich Text Editor */}
        <RichDocumentEditor params={params}/>

        <div className='fixed right-5 bottom-5 z-50'>
          <Button onClick={()=>setOpenComment(!openComment)}>
            <MessageCircle />
          </Button>
          {openComment && <CommentBox />}
        </div>
    </div>
  )
}

export default DocumentEditorSection