import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Offer from '../components/Admin/Offer'
import About from '../components/Admin/About'
import Gallery from '../components/Admin/Gallery'
import User from '../components/Admin/User'
import ManageOffers from '../components/Admin/ManageOffers'

function Admin(props) {
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)
  const [selected, setSelected] = useState(0)

  function userSearch() {
    if (!name && !name.includes(" ")) return setUser('none')

    axios.get("http://localhost:8000/user-search/" + name, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
      setSelected(0)
      setUser(res.data || 'none')
    }).catch((err) => {
      alert(err.response.data)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:8000/offers", {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) =>{}).catch((err) => {
      props.history("/")
    })
  }, [props])

  return (
    <div className='mt-2'>
      <div className='flex gap-20 justify-center mt-20'>
        <div className='bg-[#0F1035] p-7 aspect-square w-96 rounded-xl'>
          <h1 className='text-center text-lg'>Oldalak</h1>
          <div className='flex flex-col gap-2 mt-4'>
            <button className={`${selected === 1 ? 'bg-[#3887BE]/100' : 'bg-[#3887BE]/50'} hover:bg-[#3887BE]/100 rounded-md px-3 py-1`} onClick={() => { setSelected(selected === 1 ? 0 : 1) }}>Ajánlatkérés</button>
            <button className={`${selected === 2 ? 'bg-[#3887BE]/100' : 'bg-[#3887BE]/50'} hover:bg-[#3887BE]/100 rounded-md px-3 py-1`} onClick={() => { setSelected(selected === 2 ? 0 : 2) }}>Cégünkről</button>
            <button className={`${selected === 3 ? 'bg-[#3887BE]/100' : 'bg-[#3887BE]/50'} hover:bg-[#3887BE]/100 rounded-md px-3 py-1`} onClick={() => { setSelected(selected === 3 ? 0 : 3) }}>Galéria</button>
          </div>
        </div>
        <div className='relative bg-[#0F1035] p-7 aspect-square w-96 rounded-xl'>
          <h1 className='text-center text-lg'>Profilok</h1>
          <div className='flex flex-col gap-2 mt-4 items-center h-max'>
            <div className='relative flex mt-1'>
              <button onClick={userSearch} className='h-full aspect-square flex items-center justify-center absolute right-0'><FontAwesomeIcon icon={ faSearch } className='text-black'/></button>
              <input value={name} onChange={(e) => {setName(e.target.value)}} onKeyDown={(e) => (e.key === "Enter" ? userSearch() : null)} type="text" name="username" id="username" className='rounded-lg text-black pl-2 py-1 pr-8 outline-none' />
            </div>   
            {user && user !== 'none' ? <button className={`${selected === 4 ? 'bg-[#3887BE]/100' : 'bg-[#3887BE]/50'} hover:bg-[#3887BE]/100 rounded-md px-3 py-1`} onClick={() => { setSelected(selected === 4 ? 0 : 4) }}>{user.Firstname} {user.Lastname}</button> : <></>}
            {user === 'none' ? <p>Nincs ilyen felhasználó!</p> : ''}
          </div>
          <button onClick={() => { setSelected(selected === 5 ? 0 : 5) }} className={`absolute bottom-7 left-1/2 -translate-x-1/2 ${selected === 5 ? 'bg-[#008000]/100' : 'bg-[#008000]/50'} hover:bg-[#008000]/100 rounded-md px-3 py-1`}>Ajánlatok kezelése</button>
        </div>      
      </div>
      {selected === 1 ? <Offer history={props.history} /> : <></>}
      {selected === 2 ? <About history={props.history} /> : <></>}
      {selected === 3 ? <Gallery history={props.history} /> : <></>}
      {selected === 4 && user && user !== 'none' ? <User user={user} history={props.history} /> : <></>}
      {selected === 5 ? <ManageOffers /> : <></>}
    </div>
  )
}

export default Admin