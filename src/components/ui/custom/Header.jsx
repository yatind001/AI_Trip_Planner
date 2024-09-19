import React, { useEffect } from 'react'
import { Button } from '../button'

function Header() {

  const user=JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    console.log(user)
  },[])

  return (
    
    <div className='p-2 shadow-sm flex justify-between items-center px-1'>
      <img src='/logo.svg' width="50" height="50"/>
      <div>
        {user?
        <div className='flex items-center gap-3'>
          <Button variant="outline" className="rounded-full">My Trips</Button>
          <div></div>
          <img  src={user?.picture} className='h-[30px] w-[35px] rounded-full'></img>
        </div>
        :
        <Button>Sign In</Button>
        }
        
      </div>
    </div>
  )
}

export default Header
