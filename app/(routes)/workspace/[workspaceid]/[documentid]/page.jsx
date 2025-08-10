"use client";

import React, { useEffect } from 'react';
import SideNav from '../../_components/SideNav';
import DocumentEditorSection from '../../_components/DocumentEditorSection';
import { Room } from '@/app/Room';

function WorkspaceDocument({ params }) {
  // console.log(params);
  
  return (
    <Room>
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
    </Room>
  );
}

export default WorkspaceDocument;
