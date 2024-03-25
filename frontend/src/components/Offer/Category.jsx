import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Category(props) {
    const [service, setService] = useState(props.services[0].ID)
    const [comment, setComment] = useState("")
    function Clear() {
        setService(props.services[0].ID)
        setComment("")
    }
  return (
    <div>
      <div className='flex justify-between bg-[#0F1035] items-center gap-4 p-4'>
        <FontAwesomeIcon icon={props.icon}/> 
        <p className='w-full'>{props.title}</p>
        <FontAwesomeIcon className={`${props.openedContent === props.contentIndex ? "rotate-90" : ""} transition-all`} icon={faChevronRight} onClick={() => props.setOpenedContent(props.openedContent === props.contentIndex ? 0 : props.contentIndex)}/>   
      </div>
      {props.openedContent === props.contentIndex ?
      <div className='flex p-4 bg-[#0F1035]/40 gap-8'>
        <div className='w-3/5'>
          <p>Válaszd ki milyen szolgáltatásra van szükséged!</p>
          <select value={service} onChange={(e) => setService(e.target.value)} className='w-full rounded-md mt-1 text-black px-2 py-1'>
            {props.services.map(service =>
                <option value={service.ID} key={service.ID}>{service.Title}</option>
            )}
          </select>
          <p className='mt-2'>Megjegyzés</p>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} className='w-full rounded-md resize-none mt-1 text-black px-2 py-1 outline-none' rows={4}></textarea>
        </div>
        <div className='flex flex-col w-2/5'>
          <p>
            <b>Email:</b> <br />
            <b>Vezetéknév:</b> <br />
            <b>Keresztnév:</b>
          </p>
          <button onClick={Clear} className='bg-[#FF0000]/50 px-3 py-2 rounded-lg w-max mt-8'>Eddigi törlése</button>
          <button className='bg-[#008000]/50 px-3 py-2 rounded-lg mt-2 w-max'>Rendelés leadása</button>
        </div>
      </div>: <></> }
    </div>
  )
}

export default Category