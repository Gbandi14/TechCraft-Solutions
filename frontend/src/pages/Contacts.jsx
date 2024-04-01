import React from 'react'
import Header from '../components/Header'

function Contacts() {
  return (
    <div>
      <Header />
      <div>
        <div className='relative flex items-center justify-center w-full h-72 bg-[#0F1035]/25'>
          <div className='text-xl'>Betöltés...</div>
          <iframe
            className='absolute inset-0 w-full h-full outline-none'
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA4ySGX0OjFsWmcwIyaELMVqTol5DEPFns&q=Baja">
          </iframe>
        </div>
        
        <div className='text-center mt-10'>
          <h3 className='font-semibold text-2xl mb-3'>Elérhetőségeink</h3>
          <p>Email: TechCraft-Solutions@gmail.com</p>
          <p>Telefonszám: +36 30 117 215</p>
          <p className='font-semibold text-lg mt-5 mb-1'>Nyitvatartás:</p>
          <p>Hétfő-Péntek: 8:00-17:00 <br /> Szombat: 8:00-13:00</p>
        </div>
        
      </div>
    </div>
  )
}

export default Contacts