import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'

function DocumentEditorSection({params}) {
    
  return (
    <div>
        {/* Header */}
        <DocumentHeader />

        {/* Document Info */}
        <DocumentInfo params={params} />

        {/* Rich Text Editor */}
        <RichDocumentEditor params={params}/>
    </div>
  )
}

export default DocumentEditorSection