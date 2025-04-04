import { Sparkles } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
        <Sparkles className='h-6 w-6' strokeWidth={1.5}/>
        <span className='font-bold text-md'>Rcms Ai</span>
    </div>
  )
}

export default Logo