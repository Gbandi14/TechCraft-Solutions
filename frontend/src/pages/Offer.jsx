import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { faGear, faDesktop, faCode } from '@fortawesome/free-solid-svg-icons'
import Category from '../components/Offer/Category'
import axios from 'axios'

function Offer() {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [openedContent, setOpenedContent] = useState(0)
  const [items, setItems] = useState(null)
  useEffect(() => {
    if (sessionStorage.getItem("token")){
      axios.get("http://localhost:8000/userdata", {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
          setFirstname(res.data.Firstname)
          setLastname(res.data.Lastname)
          setEmail(res.data.Email)
      })

      axios.get("http://localhost:8000/services", {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
        const groupData = res.data.reduce((a, c) => {
          const category = a.find(x => x.ID === c.categoryId)
          if (category) {
            category.Services.push({ ID: c.serviceId, Title: c.serviceTitle, Description: c.serviceDescription })
          } else {
            a.push({
              ID: c.categoryId,
              Icon: (c.categoryId === 1 ? faGear : c.categoryId === 2 ? faDesktop : faCode),
              Title: c.categoryTitle,
              Services: [{ ID: c.serviceId, Title: c.serviceTitle, Description: c.serviceDescription }]
            })
          }

          return a
        }, [])

        setItems(groupData)
      })
    }
  },[])

  return (
    <div>
      { items !== null ? 
        <div>
          <h3 className='font-semibold mx-10 my-8 text-xl'>Kérlek válassz az alábbi ágazataink közül!</h3>
          <div className='rounded-lg overflow-hidden flex flex-col gap-0.5 mx-10'>
            {items.map((item, i) => <Category key={i} icon={item.Icon} title={item.Title} services={item.Services} contentIndex={i + 1} openedContent={openedContent} setOpenedContent={setOpenedContent} email={email} firstname={firstname} lastname={lastname} />)}        
          </div>
        </div> 
      : 
        <div className='bg-[#0F1035] mx-auto max-w-max mt-10 px-16 py-10 rounded-xl'>
          <h2>Az ajánlatkéréshez regisztrációra van szükség!</h2>
          <p className='text-center'><Link to={'/register'} ><button className='bg-[#365486]/50 hover:bg-[#365486]/75 transition-colors rounded-xl px-8 py-3 mt-10'>Regisztrálj fiókot</button></Link></p>
          <p className='text-center'><Link to={'/login'} ><button className='bg-[#365486]/50 hover:bg-[#365486]/75 transition-colors rounded-xl px-8 py-3 mt-3'>Már rendelkezem fiókkal</button></Link></p>
        </div>
      }
    </div>
  )
}

export default Offer