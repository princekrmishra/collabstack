import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CoverOption from '../_shared/CoverOption'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'

function CoverPicker({children, setNewCover}) {
    const [selectedCover, setSelectedCover] = useState();
  return (
    <Dialog>
  <DialogTrigger className='w-full'>
    {children}
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='font-bold'>Update Cover</DialogTitle>
      <DialogDescription>
        
      </DialogDescription>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3 '>
            {CoverOption.map((cover, index) => (
                <div 
                 key={cover.imageUrl || index}
                onClick={() => setSelectedCover(cover?.imageUrl)} className={`${selectedCover == cover?.imageUrl && 'border-primary border-2'} p-1 rounded-md cursor-pointer`}>
                    <Image src={cover?.imageUrl} width={200} height={140}
                    className='h-[70px] w-full rounded-md object-cover' alt='coverimage options'/>
                </div>
            ))}
        </div>
    </DialogHeader>
    <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className='cursor-pointer'>
              Close
            </Button>
           
          </DialogClose>
           <Button type="button" className='cursor-pointer' onClick={() => setNewCover(selectedCover)}>
              Update
            </Button>
        </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default CoverPicker