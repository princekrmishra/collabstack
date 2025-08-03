"use client"
import Logo from '@/app/_components/Logo'
import { useAuth } from '@clerk/clerk-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
    const {orgId} = useAuth();
    console.log(orgId);
  return (
    <div className='flex justify-between items-center p-3 shadow-sm pr-9'>
        <Logo/>
        <OrganizationSwitcher afterLeaveOrganizationUrl={'/dashboard'} afterCreateOrganizationUrl={'/dashboard'}/>
        <UserButton />
    </div>
  )
}

export default Header