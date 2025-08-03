"use client"
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

function CreateWorkspace() {
    const [coverImage, setCoverImage] = useState('/c4.svg');
    const [workspaceName, setWorkspaceName] = useState();
    const [emoji, setEmoji] = useState();
  return (
    <div className='p-10 md:px-36 lg:px-64 xl:px-96 py-28'>
        <div className='shadow-2xl rounded-xl'>
            <CoverPicker setNewCover={(v) => setCoverImage(v)}>
            <div className='relative group cursor-pointer'>
                <h2 className='hidden absolute p-4 w-full h-full  items-center justify-center group-hover:flex '>Change Cover</h2>
                <div className='group-hover:opacity-40'>
                    <Image src={coverImage} width={400} height={400} className='w-full h-[180px] object-cover rounded-t-xl' alt='coverimage' />
                </div>
            </div>
            </CoverPicker>
            <div className='p-12'>
                    <h2 className='font-medium text-xl'>Create a new workspace</h2>
                    <h2 className='text-sm mt-2'>This is a shared space where you can collaborate with your team. You can always rename it later</h2>
            
            <div className='mt-8 flex gap-2 items-center'>
                <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
                <Button variant='outline'>
                    {emoji ? emoji : <SmilePlus />}
                </Button>
                </EmojiPickerComponent>
                <Input placeholder='workspace Name' onChange={(e) => setWorkspaceName(e.target.value)} />
            </div>
            <div className='mt-7 flex justify-end gap-6'>
                <Button disabled={!workspaceName?.length}>Create</Button>
                <Button variant='outline'>Cancel</Button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default CreateWorkspace