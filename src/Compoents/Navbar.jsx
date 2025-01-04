import React from 'react'

const Navbar = () => {
  return (
    <div className='text-white w-full'>
        <div className='flex justify-between'>
            <div className='flex justify-center rounded-md w-[10%] border border-gray-400'>
                Home
            </div>
            <div className='flex justify-center rounded-md w-[10%] border border-gray-400'>
                Report
            </div>
            <div className='flex justify-center rounded-md w-[10%] border border-gray-400'>
                Analysis
            </div>
            <div className='flex justify-center rounded-md w-[10%] border border-gray-400'>
                Settings
            </div>
        </div>
    </div>
  )
}

export default Navbar
