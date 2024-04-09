import React, { useEffect, useState } from 'react'
import axios from 'axios'

function User(props) {
  const [rank, setRank] = useState('')
  const [email, setEmail] = useState('')

  function update() {
    axios.patch("http://localhost:8000/user-data", {email, rank, id: props.user.ID}, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
      alert(res.data)
    }).catch((err) => {
      alert(err.response.data)
    })
  }

  function remove() {
    if (!window.confirm("Biztos szeretnéd törölni a felhasználót?")) return

    axios.delete("http://localhost:8000/user-data/" + props.user.ID, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
      alert(res.data)
      window.location.reload()
    }).catch((err) => {
      alert(err.response.data)
    })
  }

  useEffect(() => {
    setRank(props.user.Rank)
    setEmail(props.user.Email)
  }, [props])

  return (
    <div className='flex m-20 mb-0 pb-20'>
      <div className='relative w-96 bg-[#0F1035] p-7 rounded-s-xl'>
        <h1 className='text-center text-lg'>Felhasználó</h1>

        <div className='flex flex-col gap-2 mt-4 *:rounded-md *:outline-none *:px-3 *:py-1 *:text-lg justify-center min-h-0 grow'>
          <button className='bg-[#3887BE]/50'>{props.user.Firstname} {props.user.Lastname}</button>
        </div>
      </div>
      <div className='w-full bg-[#0F1035]/40 rounded-e-xl p-7'>
        <h1 className='text-center text-lg'>Módosítás</h1>

        <div className='flex flex-col w-4/5 mx-auto my-8'>
          <label htmlFor="title" className='ml-1'>Rang</label>
          <input value={rank} onChange={(e) => {setRank(e.target.value)}} type="text" name="title" id="title" className='rounded-lg mt-1 text-black px-2 py-1 outline-none' />

          <label htmlFor="title" className='ml-1'>Email</label>
          <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="text" name="email" id="email" className='rounded-lg mt-1 text-black px-2 py-1 outline-none' />
        </div>

        <div className='flex gap-3 *:rounded-md *:outline-none *:px-3 *:py-1 *:text-lg justify-center'>
          <button onClick={update} className='!bg-[#3887BE]/50 hover:!bg-[#3887BE]/100 transition-colors'>Adatok módosítása</button>
          <button onClick={remove} className='!bg-[#FF0000]/50 hover:!bg-[#FF0000]/75 transition-colors'>Fiók törlése</button>
        </div>
      </div>
    </div>
  )
}

export default User