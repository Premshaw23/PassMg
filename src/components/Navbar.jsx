import React from 'react'

const Navbar = () => {
  return (
      <nav className='flex justify-between md:px-40 px-10 bg-slate-800 py-2 z-10 items-center sticky top-0 w-full'>
      <div className="logo font-bold text-white text-2xl ">
        <span className='text-green-400'>&lt;</span>
        <span>Pass</span>
        <span className='text-green-400'>Mg&gt;</span>
      </div>
      <div className='flex items-center gap-12'>
      {/* <ul className='flex gap-4 text-white'>
        <li className='hover:font-semibold'><a href="/">Home</a></li>
        <li className='hover:font-semibold'><a href="/">About</a></li>
        <li className='hover:font-semibold'><a href="/">Contact</a></li>
      </ul> */}
      <div className="github flex gap-2 bg-green-500 py-1.5 px-2.5 rounded-full cursor-pointer">
        <img className='invert w-6' src="/icons/github.svg" alt="github" />
        <div className='text-base font-semibold text-gray-200'>GitHub</div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar
