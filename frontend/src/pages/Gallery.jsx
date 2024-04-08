import React, { useEffect, useState } from 'react'
import htmlParse from 'html-react-parser'
import Modal from '../components/Gallery/Modal'
import axios from 'axios'

function Gallery() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/references").then((res) => {
      setItems(res.data)
    })   
  }, []);
  
  return (
    <div>
      {
        items.map((item) => (
        <div key={item.ID} className='flex flex-col lg:flex-row lg:items-center lg:space-x-6'>
          <img src={item.Image} alt="itemImage" className='m-7 rounded-3xl aspect-video object-cover lg:w-1/2'/>
          <div className='m-7'>
            <div className='mb-8'>
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