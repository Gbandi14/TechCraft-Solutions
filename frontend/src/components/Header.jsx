import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavItem from './Header/NavItem'

function Header() {
  const [menu, setMenu] = useState(false)

  return (
    <div className='relative flex items-center justify-between px-6 py-5 bg-[#0F1035]'>
      <Link to={'/'} className='flex items-center gap-4'>
        <img src="logo" alt="logo" />
        <div className='h-8 w-[1px] bg-white'></div>
        <span className="text-2xl">TechCraft Solutions</span>
      </Link>
      <div className={`lg:relative absolute lg:top-0 top-full left-0 lg:flex lg:w-max w-full lg:flex-row flex-col items-center gap-12 bg-[#0F1035] lg:h-max ${menu ? 'h-80' : 'h-0'} overflow-hidden lg:transition-none transition-all`}>
        <div className='flex lg:flex-row flex-col items-center gap-5 lg:mt-0 mt-3'>
          <NavItem text='Ajánlatkérés' pathname='/offer' />
          <NavItem text='Cégünkről' pathname='/about' />
          <NavItem text='Galéria' pathname='/gallery' />
          <NavItem text='Elérhetőségeink' pathname='/contacts' />
        </div>
        <div className="flex lg:flex-row flex-col items-center lg:gap-2.5 gap-3 lg:mt-0 mt-6">
          <Link to={'/login'} className='px-5 py-2 rounded-lg bg-[#365486]/50 hover:bg-[#365486]/75 transition-colors'>Bejelentkezés</Link>
          <Link to={'/register'} className='px-5 py-2 rounded-lg bg-[#365486]/50 hover:bg-[#365486]/75 transition-colors'>Regisztráció</Link>
        </div>
      </div>
      <button onClick={() => setMenu(!menu)} className='relative lg:hidden flex flex-col justify-between w-8 h-8 overflow-hidden'>
        <div className={`h-[2px] bg-white ${menu ? 'absolute w-16 rotate-[45deg] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'w-8 mt-1'} transition-all`}></div>
        <div className={`h-[2px] bg-white ${menu ? 'w-16 opacity-0' : 'w-8'} transition-all`}></div>
        <div className={`h-[2px] bg-white ${menu ? 'absolute w-16 rotate-[135deg] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'w-8 mb-1'} transition-all`}></div>
      </button>
    </div>
  )
}

export default Header