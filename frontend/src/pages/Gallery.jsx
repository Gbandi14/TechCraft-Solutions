import React, { useEffect, useState } from 'react'
import htmlParse from 'html-react-parser'
import Modal from '../components/Gallery/Modal'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Gallery() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/references").then(async (res) => {
      for (let i = 0; i < res.data.length; i++) {
        const { data } = await axios.get("http://localhost:8000/reference-rating/" + res.data[i].ID)
        res.data[i].Score = data.Score
      }

      setItems(res.data)
    })   
  }, []);
  
  return (
    <div>
      {
        items.map((item) => (
        <div key={item.ID} className='flex flex-col lg:flex-row lg:items-center lg:space-x-6'>
          <div className='m-7 rounded-3xl overflow-hidden aspect-video lg:w-1/2 relative'>
            <img src={item.Image} alt="itemImage" className='object-cover w-full h-full'/>
            <div className='flex items-center absolute bottom-0 right-0 px-10 py-5 text-4xl gap-3 bg-black/60 rounded-tl-3xl'>{Number(item.Score).toFixed(1)} <FontAwesomeIcon icon={faStar} className='text-3xl text-[#FFD700]' /></div>
          </div>
          <div className='m-7 pr-7 lg:w-1/2'>
            <div className='mb-8 custom-content'>
              <h2 className='text-center mb-3 text-3xl'>{item.Title}</h2>
              {htmlParse(item.Text)}
            </div>
            <div className='flex justify-center'>
              <button onClick={() => setEdit(item.ID)} className='px-5 py-2 rounded-lg bg-[#0F1035]/100 hover:bg-[#0F1035]/75 transition-colors mt-6'>Saját értékelés írása</button>
            </div>   
          </div>
        </div>))
      }
      {edit != null ?<Modal ID={edit} close={() => setEdit(null)} /> : null }
    </div>
  )
}

export default Gallery