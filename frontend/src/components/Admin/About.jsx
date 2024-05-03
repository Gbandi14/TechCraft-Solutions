import React, { useState, useEffect } from 'react'
import axios from 'axios'

function About() {
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [id, setId] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:8000/categories").then((res) => {
      setCategories(res.data)
      setId(res.data[0].ID)
      setTitle(res.data[0].Title)
      setText(res.data[0].Text)
    })
    
  }, [])

  useEffect(() => {
    const category = categories.find(x => x.ID === id)
    if (!category) return

    setTitle(category.Title)
    setText(category.Text)
  }, [id, categories])

  function update() {
    axios.patch("http://localhost:8000/categories", {id, title, text}, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
      alert('Sikeres módosítás!')
      window.location.reload()
    }).catch((err) => {
      alert('Hiba történt! Kérjük küldje el az oldal tulajdonosainak a Konzolban található hibaüzenetet, hogy mielőbb kijavíthassák a hibát! Megértését és türelmét köszönjük!')
      console.log(err)
    })
  }

  return (
    <div className='flex m-20 mb-0 pb-20'>
      <div className='relative w-96 bg-[#0F1035] p-7 rounded-s-xl'>
        <h1 className='text-center text-lg'>Cégünkről</h1>

        <div className='flex flex-col gap-2 mt-4 *:rounded-md *:outline-none *:px-3 *:py-1 *:text-lg justify-center min-h-0 grow'>
          {categories.map((r) => 
            <button className='bg-[#3887BE]/50 hover:bg-[#3887BE]/100' key={r.ID} onClick={()=>{setId(r.ID)}}>{r.Title}</button>
          )}
        </div>
      </div>
      <div className='w-full bg-[#0F1035]/40 rounded-e-xl p-7'>
        <h1 className='text-center text-lg'>Módosítás</h1>

        <div className='flex flex-col w-4/5 mx-auto my-8'>
          <label htmlFor="title" className='ml-1'>Cím</label>
          <input value={title} onChange={(e) => {setTitle(e.target.value)}} type="text" name="title" id="title" className='rounded-lg mt-1 text-black px-2 py-1 outline-none' />

          <label htmlFor="text" className='ml-1'>Szöveg</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className='w-full rounded-md resize-none mt-1 text-black px-2 py-1 outline-none' rows={4}></textarea>
        </div>

        <div className='flex gap-3 *:rounded-md *:outline-none *:px-3 *:py-1 *:text-lg justify-center'>
          <button onClick={update} className='!bg-[#3887BE]/50 hover:!bg-[#3887BE]/100 transition-colors'>Adatok módosítása</button>
          <button onClick={() => window.location.reload()} className='!bg-[#FF0000]/50 hover:!bg-[#FF0000]/75 transition-colors'>Mégsem</button>
        </div>
      </div>
    </div>
  )
}

export default About