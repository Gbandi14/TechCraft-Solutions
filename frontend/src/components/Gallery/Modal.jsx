import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'

function Modal(props) {
  const [hoverStar, setHoverStar] = useState(5)
  const [star, setStar] = useState(5)
  const [comment, setComment] = useState("")
  function rateClick() {
      alert(comment + "," + star + "," + props.ID)
  }
  return (
    <div className="fixed flex items-center justify-center inset-0 z-10 bg-black/30">
        <div className='flex flex-col items-center bg-[#0F1035] px-12 py-8 rounded-xl'>
            <p className='font-semibold'>Mennyire voltál megelégedve a cég munkájával?</p>
            <div className='flex mt-6' onMouseLeave={() => setHoverStar(star)}>
                {[1, 2, 3, 4, 5].map(x => hoverStar >= x ? <FontAwesomeIcon key={x} icon={faStar} onClick={() => setStar(x)} onMouseMove={() => setHoverStar(x)} className='h-8 text-[#FFD700]'/> : <FontAwesomeIcon key={x} icon={faEmptyStar} onClick={() => setStar(x)} onMouseMove={() => setHoverStar(x)} className='h-8 text-[#FFD700]'/>)}
            </div>

            <textarea rows="4" placeholder='Megjegyzés' value={comment} onChange={(e) => setComment(e.target.value)} className='px-2 py-1 mt-5 rounded-lg w-full resize-none outline-none text-black'></textarea>
            <div className='flex gap-2.5 mt-6'>
                <button onClick={rateClick} className='px-5 py-2 rounded-lg bg-[#365486]/100 hover:bg-[#365486]/75 transition-colors'>Értékelés leadása</button>
                <button onClick={() => props.close()} className='px-5 py-2 rounded-lg bg-[#FF004D]/100 hover:bg-[#FF004D]/75 transition-colors'>Mégse</button>
            </div>         
        </div>
    </div>
  )
}

export default Modal