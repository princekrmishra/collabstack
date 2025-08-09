"use client";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef } from "react";

function RichDocumentEditor() {
  const editorRef = useRef(null);

  useEffect(() => {
    let editorInstance;

    const saveDocument = () => {
      editorRef.current?.save().then((outputData) => {
        
      });
    };

    const initEditor = async () => {
      // Import EditorJS core and tools dynamically
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const Delimiter = (await import("@editorjs/delimiter")).default;
      const Alert = (await import("editorjs-alert")).default;
      const Table = (await import("@editorjs/table")).default;
      const EditorjsList = (await import("@editorjs/list")).default;
      const CodeTool = (await import("@editorjs/code")).default;
      const ImageTool = (await import("@editorjs/image")).default;

      editorInstance = new EditorJS({
        holder: "editorjs",
        onChange: () => saveDocument(),
        tools: {
          header: Header,
          delimiter: Delimiter,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+A",
            config: {
              alertTypes: [
                "primary", "secondary", "info", "success",
                "warning", "danger", "light", "dark",
              ],
              defaultType: "primary",
              messagePlaceholder: "Enter something",
            },
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: { rows: 2, cols: 3, maxRows: 5, maxCols: 5 },
          },
          list: {
            class: EditorjsList,
            shortcut: "CMD+SHIFT+L",
            inlineToolbar: true,
            config: { defaultStyle: "unordered" },
          },
          code: CodeTool,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "http://localhost:8008/uploadFile",
                byUrl: "http://localhost:8008/fetchUrl",
              },
            },
          },
        },
      });

      editorRef.current = editorInstance;
    };

    initEditor();

    return () => {
      if (editorInstance) {
        editorInstance.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="-ml-100">
      <div id="editorjs"></div>
    </div>
  );
}

export default RichDocumentEditor;
