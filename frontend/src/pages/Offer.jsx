import React, { useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faGear, faDesktop, faCode } from '@fortawesome/free-solid-svg-icons'

function Offer() {
  const [openedContent, setOpenedContent] = useState(0)
  return (
    <div>
      <Header />
      <div>
        <h3>Kérlek válassz az alábbi ágazataink közül!</h3>
        <div className='rounded-lg overflow-hidden'>
          <div className='flex justify-between bg-[#0F1035] items-center gap-4 p-4'>
            <FontAwesomeIcon icon={faGear}/> 
            <p className='w-full'>Gépészeti tervezés és műszaki tanácsadás</p>
            <FontAwesomeIcon className={`${openedContent === 1 ? "rotate-90" : ""} transition-all`} icon={faChevronRight} onClick={() => setOpenedContent(openedContent === 0 ? 1 : 0)}/>   
          </div>
          {openedContent === 1 ?
          <div className='flex p-4 bg-[#0F1035]/40 gap-8'>
            <div className='w-3/5'>
              <p>Válaszd ki milyen szolgáltatásra van szükséged!</p>
              <select className='w-full rounded-md mt-1'></select>
              <p>Megjegyzés</p>
              <textarea className='w-full rounded-md resize-none mt-1'></textarea>
            </div>
            <div className='flex flex-col w-2/5'>
              <p>
                <b>Email:</b> <br />
                <b>Vezetéknév:</b> <br />
                <b>Keresztnév:</b>
              </p>
              <button className='bg-[#FF0000]/50 px-3 py-2 rounded-lg w-max'>Eddigi törlése</button>
              <button className='bg-[#008000]/50 px-3 py-2 rounded-lg mt-2 w-max'>Rendelés leadása</button>
            </div>
          </div>: <></> }
        </div>
      </div>
    </div>
  )
}

export default Offer