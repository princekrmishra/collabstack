import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <div className=' flex items-center gap-2'>
        <Image src={'/logo.jpeg'} alt='logo' height={10} width={200}/>
    </div>
  )
}

export default Logo