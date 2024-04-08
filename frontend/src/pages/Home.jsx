import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/TechCraft logo.png'

function Home() {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <img src={Logo} alt="logo" className='h-40 mt-20'/>
        <p className='text-center text-4xl text-white mt-10'>Üdvözöljük a TechCraft Solutions oldalán!</p>
        <p className='text-center text-2xl text-white mt-5'>Széleskörű szaktudással rendelkezünk webfejlesztés, szoftverfejlesztés, gépészeti tervezés és műszaki tanácsadás területén.</p>
        <Link to={'/about'} className='px-5 py-2 rounded-lg bg-[#3887BE]/100 hover:bg-[#3887BE]/75 transition-colors mt-5'>Tudj meg többet!</Link>
        <p className='text-center text-2xl text-white mt-10'>Kérj tőlünk ajánlatot és egy munkatársunk visszajelez.</p>
        <Link to={'/offer'} className='px-5 py-2 rounded-lg bg-[#3887BE]/100 hover:bg-[#3887BE]/75 transition-colors mt-5'>Kérj ajánlatot!</Link>
      </div>
    </div>
  )
}

export default Home