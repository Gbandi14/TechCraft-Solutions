import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavItem from './Header/NavItem'
import Logo from '../img/TechCraft logo.png'
import axios from 'axios'

function Header() {
  const [menu, setMenu] = useState(false)
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (sessionStorage.getItem("token")){
      axios.get("http://localhost:8000/userdata", {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
        setUser(res.data)
      })
    }    
  },[])
  return (
    <>
      <div className='fixed z-50 left-0 top-0 right-0 flex items-center justify-between px-6 py-5 bg-[#0F1035]'>
        <Link to={'/'} className='flex items-center gap-4'>
          <img src={Logo} alt="logo" className='h-8'/>
          <div className='h-8 w-[1px] bg-white'></div>
          <span className="text-2xl">TechCraft Solutions</span>
        </Link>
        <div className={`lg:relative absolute lg:top-0 top-full left-0 lg:flex lg:w-max w-full lg:flex-row flex-col items-center gap-12 bg-[#0F1035] lg:h-max ${menu ? 'h-80' : 'h-0'} overflow-hidden lg:transition-none transition-all`}>
          <div className='flex lg:flex-row flex-col items-center gap-5 lg:mt-0 mt-3'>
            <NavItem text='Ajánlatkérés' pathname='/offer' />
            <NavItem text='Cégünkről' pathname='/about' />
            <NavItem text='Galéria' pathname='/gallery' />
            <NavItem text='Elérhetőségeink' pathname='/contacts' />
            {user?.Rank === 2 ? <NavItem text='Admin' pathname='/admin' /> : <></>}
          </div>
          <div className="flex lg:flex-row flex-col items-center lg:gap-2.5 gap-3 lg:mt-0 mt-6">
            {user ? <Link to={"/profile"} className='group flex items-center gap-4'>
              <div className='flex flex-col'>
                <div>
                  {user.Firstname} {user.Lastname}
                </div>
                <div>
                  {["Megrendelő", "Admin"][user.Rank -1]}
                </div>
              </div>
              <img src={user.ProfilePicture} alt="Profilkép" className='h-11 rounded-md border-2 border-transparent group-hover:border-[#365486] transition-all' />
            </Link> : <> 
              <Link to={'/login'} className='px-5 py-2 rounded-lg bg-[#365486]/50 hover:bg-[#365486]/75 transition-colors'>Bejelentkezés</Link>
              <Link to={'/register'} className='px-5 py-2 rounded-lg bg-[#365486]/50 hover:bg-[#365486]/75 transition-colors'>Regisztráció</Link>
            </>}
          </div>
        </div>
        <button onClick={() => setMenu(!menu)} className='relative lg:hidden flex flex-col justify-between w-8 h-8 overflow-hidden'>
          <div className={`absolute w-16 left-1/2 -translate-x-1/2 h-[2px] bg-white ${menu ? 'rotate-[45deg] top-1/2 -translate-y-1/2' : 'top-1'} transition-all`}></div>
          <div className={`absolute w-16 top-1/2 -translate-y-1/2 h-[2px] bg-white ${menu ? 'opacity-0' : ''} transition-all`}></div>
          <div className={`absolute w-16 left-1/2 -translate-x-1/2 h-[2px] bg-white ${menu ? 'rotate-[-45deg] bottom-1/2 -translate-y-1/2 -mb-[2px]' : 'bottom-1'} transition-all`}></div>
        </button>
      </div>
      <div className='h-[5.2rem]'></div>
    </>
  )
}

export default Header