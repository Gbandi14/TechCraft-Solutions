import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faDesktop, faCode } from '@fortawesome/free-solid-svg-icons'

function Offer() {
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(0)
  const [description, setDescription] = useState('')
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/services", {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
      setServices(res.data)
      if (res.data.length >0) {
        setId(res.data[0].serviceId)
        setTitle(res.data[0].serviceTitle)
        setCategory(res.data[0].categoryId)
        setDescription(res.data[0].serviceDescription)
      }
    })

    axios.get("http://localhost:8000/categories").then((res) => {
      setCategories(res.data)
    })
  }, [])

  useEffect(() => {
    if (id === 0) {
      setId(0)
      setTitle('')
      setCategory(categories[0].ID)
      setDescription('')
    }

    const service = services.find((x) => x.serviceId === id)
    if (!service) return

    setId(service.serviceId)
    setTitle(service.serviceTitle)
    setCategory(service.categoryId)
    setDescription(service.serviceDescription)
  }, [id, services, categories])

  function update() {
    if (id === 0) {
      axios.post("http://localhost:8000/services", { title, description, categoryId: category }, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
        alert(res.data)
        window.location.reload()
      }).catch((err) => {
        alert(err.response.data)
      })
    } else {
      axios.patch("http://localhost:8000/services", { id, title, description, categoryId: category }, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
        alert(res.data)
        window.location.reload()
      }).catch((err) => {
        alert(err.response.data)
      })
    }
  }

  function remove() {
    axios.delete("http://localhost:8000/services/" + id, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
        alert(res.data)
        window.location.reload()
      }).catch((err) => {
        alert(err.response.data)
      })
  }

  return (
    <div className='flex m-20 mb-0 pb-20'>
      <div className='relative w-96 bg-[#0F1035] p-7 rounded-s-xl'>
        <h1 className='text-center text-lg'>Ajánlatkérés</h1>

        <div className='flex flex-col gap-2 mt-4 *:rounded-md *:outline-none *:px-3 *:py-1 *:text-lg justify-center min-h-0 grow'>
          {services.map((service) => 
            <button className='flex items-center gap-2.5 bg-[#3887BE]/50 hover:bg-[#3887BE]/100' key={service.serviceId} onClick={()=>{setId(service.serviceId)}}>
              <div>
                <FontAwesomeIcon icon={(service.categoryId === 1 ? faGear : service.categoryId === 2 ? faDesktop : faCode)} />
              </div>
              <div className='text-center w-full'>
                {service.serviceTitle}
              </div>
            </button>
          )}
          <button className='bg-[#008000]/50 hover:bg-[#008000]/100' onClick={()=>{setId(0)}}>Új szolgáltatás</button>
        </div>
      </div>
      <div className='w-full bg-[#0F1035]/40 rounded-e-xl p-7'>
        <h1 className='text-center text-lg'>{id === 0 ? 'Új adat' : 'Módosítás'}</h1>

        <div className='flex flex-col w-4/5 mx-auto my-8'>
          <label htmlFor="title" className='ml-1'>Cím</label>
          <input value={title} onChange={(e) => {setTitle(e.target.value)}} type="text" name="title" id="title" className='rounded-lg mt-1 text-black px-2 py-1 outline-none' />

          <label htmlFor="category" className='ml-1'>Kategória</label>
          <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className='w-full rounded-md mt-1 text-black px-2 py-1'>
            {categories.map((c) => 
              <option value={c.ID} key={c.ID}>{c.Title}</option>
            )}
          </select>

          <label htmlFor="description" className='ml-1'>Leírás</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} id='description' className='w-full rounded-md resize-none mt-1 text-black px-2 py-1 outline-none' rows={3}></textarea>
        </div>

        <div className='flex gap-3 *:rounded-md *:outline-none *:px-3 *:py-1 *:text-lg justify-center'>
          <button onClick={update} className='!bg-[#3887BE]/50 hover:!bg-[#3887BE]/100 transition-colors'>{id === 0 ? 'Adat felvétele' : 'Adatok módosítása'}</button>
          {id !== 0 ? <button onClick={remove} className='!bg-[#FF0000]/50 hover:!bg-[#FF0000]/100 transition-colors'>Törlés</button> : <></>}
          <button onClick={() => window.location.reload()} className='!bg-[#FF0000]/50 hover:!bg-[#FF0000]/75 transition-colors'>Mégsem</button>
        </div>
      </div>
    </div>
  )
}

export default Offer