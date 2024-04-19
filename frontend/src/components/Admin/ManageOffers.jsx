import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function ManageOffers() {
  const [offers, setOffers] = useState([])
  const [openedContent, setOpenedContent] = useState(null)
  const [description, setDescription] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:8000/offers", {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
      setOffers(res.data)
    })
  }, [])

  useEffect(() => {
    setDescription('')
  }, [openedContent])

  function endOffer() {
    axios.post("http://localhost:8000/offer-end",{userId: offers[openedContent].UserID, serviceId: offers[openedContent].ServiceID, email: offers[openedContent].Email, description},{headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
      alert(res.data)
      window.location.reload()
    })
  }

  return (
    <div className='flex flex-col m-20 mb-0 pb-20'>
      <button className='mb-3 ml-auto bg-[#0F1035]/50 hover:bg-[#0F1035]/100 rounded-md px-3 py-1' onClick={() => {setShowAll(!showAll)}}>{showAll ? 'Lezárt ajánlatkérések elrejtése' : 'Összes ajánlatkérés mutatása'}</button>

      <div className='rounded-lg overflow-hidden flex flex-col gap-0.5 w-full'>
        {offers.filter(offer => showAll ? true : offer.Type === 1).length === 0 ? <p className='text-center'>Nincs egy darab ajánlatkérés sem.</p> : <></>}
        {offers.filter(offer => showAll ? true : offer.Type === 1).map((item, i) => 
          <div key={i}>
            <div className='flex justify-between bg-[#0F1035] items-center gap-4 p-4 select-none' onClick={() => setOpenedContent(openedContent === i ? null : i)}>
              <img src={item.ProfilePicture.startsWith("http") ? item.ProfilePicture : 'http://localhost:8000/get-file/' + item.ProfilePicture.split("/")[2]} alt="Profilkép" className='h-8' />
              <p className='w-full'>{item.Firstname} {item.Lastname} <span className='opacity-60'>({item.ServiceTitle})</span></p>
              <div className='flex gap-5 items-center'>
                <div className={`${item.Type === 1 ? 'bg-green-700' : 'bg-red-700'} px-3 py-1 rounded-md`}>
                  {item.Type === 1 ? 'Folyamatban' : 'Lezárt'}
                </div>
                <FontAwesomeIcon className={`${openedContent === i ? "rotate-90" : ""} transition-all`} icon={faChevronRight}/>   
              </div>
            </div>
            {openedContent === i ?
            <div className='flex p-4 bg-[#0F1035]/40 gap-8'>
              <div className='w-3/5'>
                <p>Igényelt szolgáltatás</p>
                <input value={`${item.ServiceTitle} (${item.CategoryTitle})`} readOnly={true} type="text" name="service" id="service" className='w-full rounded-lg mt-1 text-black px-2 py-1 outline-none' />

                <p className='mt-4'>Megjegyzés</p>
                <textarea value={item.Description} readOnly={true} className='w-full rounded-md resize-none mt-1 text-black px-2 py-1 outline-none' rows={4}></textarea>
              </div>
              <div className='flex flex-col w-2/5'>
                <p>
                  <b>Email:</b> {item.Email}<br />
                  <b>Vezetéknév:</b> {item.Firstname}<br />
                  <b>Keresztnév:</b> {item.Lastname}
                </p>

                <p className='mt-4'>Megjegyzés az ajánlat lezárásához</p>
                <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} className='w-full rounded-md resize-none mt-1 text-black px-2 py-1 outline-none' rows={2}></textarea>

                {item.Type === 1 ? <button onClick={endOffer} className='bg-[#008000]/50 hover:bg-[#008000]/100 transition-colors px-3 py-2 rounded-lg mt-2 w-max'>Rendelés lezárása</button> : <p className='mt-2 text-red-400'>A rendelés már le van zárva.</p>}
              </div>
            </div>: <></> }
          </div>
        )}        
      </div>
    </div>
  )
}

export default ManageOffers