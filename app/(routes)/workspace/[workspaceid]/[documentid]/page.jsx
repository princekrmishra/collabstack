"use client";

import React, { useEffect } from 'react';
import SideNav from '../../_components/SideNav';
import DocumentEditorSection from '../../_components/DocumentEditorSection';

function WorkspaceDocument({ params }) {
  // console.log(params);
  
  return (
    <div>
      {/* Sidebar */}
      <div>
        <SideNav params={params} />
      </div>

      {/* Main content (with left margin to offset the sidebar) */}
      <div className="md:ml-72">
       <DocumentEditorSection params={params}/>
      </div>
    </div>
  );
}

export default WorkspaceDocument;
