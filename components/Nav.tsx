import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className='w-full p-4 border-b border-slate-200'>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Link href={'/'}>Home</Link>
          <Link href={'/dashboard'}>Dashboard</Link>
        </div>

        <Button>Sign in</Button>

      </div>
    </nav>
  )
}

export default Nav