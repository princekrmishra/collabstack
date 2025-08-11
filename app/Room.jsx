"use client";

import { React, use } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export function Room({ children, params }) {
    const unwrappedParams = use(params); // ✅ Correct way
      const documentId = unwrappedParams?.documentid;
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth?roomId="+documentId}
    resolveUsers={async ({ userIds }) => {
    const q = query(collection(db, 'CollabStackUser'), where('email', 'in', userIds));
    const querySnapshot = await getDocs(q);
     const userList=[];
    querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        userList.push(doc.data())
    })
    console.log(userList);
    return userList
  }}
  
  
  resolveMentionSuggestions={async ({ text, roomId }) => {
    const q = query(collection(db, 'CollabStackUser'), where('email', '!=', null));
    const querySnapshot = await getDocs(q);
     let userList=[];
    querySnapshot.forEach((doc) => {
        userList.push(doc.data())
    })

     if (text) {
      // Filter any way you'd like, e.g. checking if the name matches
      userList = userList.filter((user) => user.name.includes(text));
    }


    // Return a list of user IDs that match the query
    return userList.map((user) => user.id);
  }}>
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}