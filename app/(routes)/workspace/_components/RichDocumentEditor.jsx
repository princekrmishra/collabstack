"use client";
import React, { useEffect, useRef, use, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import EditorjsList from "@editorjs/list";
import CodeTool from "@editorjs/code";
import SimpleImage from "simple-image-editorjs";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import GenerateAITemplate from "./GenerateAITemplate";

function RichDocumentEditor({ params }) {
  const editorRef = useRef(null);
  const unwrappedParams = use(params);
  const documentId = unwrappedParams?.documentid;
  const { user } = useUser();
  const isFetched = useRef(false);

  useEffect(() => {
    if (user && !editorRef.current) {
      initEditor();
    }
  }, [user]);

  const saveDocument = () => {
    editorRef.current?.save().then(async (outputData) => {
      const docRef = doc(db, "documentOutput", documentId);
      await updateDoc(docRef, {
        output: outputData,
        editedBy: user?.primaryEmailAddress?.emailAddress,
      });
    });
  };

  const getDocumentOutput = () => {
    onSnapshot(doc(db, "documentOutput", documentId), (snapshot) => {
      const data = snapshot.data()?.output;
      if (
        (!isFetched.current ||
          snapshot.data()?.editedBy !== user?.primaryEmailAddress?.emailAddress) &&
        data?.blocks &&
        Array.isArray(data.blocks)
      ) {
        editorRef.current.render(data);
      }
      isFetched.current = true;
    });
  };

  const initEditor = () => {
    editorRef.current = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        delimiter: Delimiter,
        alert: {
          class: Alert,
          inlineToolbar: true,
        },
        list: {
          class: EditorjsList,
          inlineToolbar: true,
        },
        code: CodeTool,
        image: SimpleImage,
      },
      onChange: saveDocument,
      onReady: getDocumentOutput,
    });
  };

  return (
    <div className="lg:-ml-40">
      <div id="editorjs" className="w-70%"></div>
      <div className="fixed bottom-10 md:ml-80 left-0 z-0">
        <GenerateAITemplate
          setGenerateAIOutput={async (output) => {
            editorRef.current.render(output);
            const docRef = doc(db, "documentOutput", documentId);
            await updateDoc(docRef, {
              output,
              editedBy: user?.primaryEmailAddress?.emailAddress,
            });
          }}
        />
      </div>
    </div>
  );
}

export default RichDocumentEditor;
