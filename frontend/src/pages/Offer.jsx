import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { faGear, faDesktop, faCode } from '@fortawesome/free-solid-svg-icons'
import Category from '../components/Offer/Category'

function Offer() {
  const [openedContent, setOpenedContent] = useState(0)
  const [items, setItems] = useState([])
  useEffect(() => {
    setItems([
      {
        ID: 1,
        Title: "Gépészeti tervezés és műszaki tanácsadás",
        Icon: faGear,
        Services: [
          {
            ID: 1,
            Title: "asdf",
            Description: "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
          },
          {
            ID: 4,
            Title: "a",
            Description: "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
          }
        ]
      },
      {
        ID: 2,
        Title: "Webfejlesztés",
        Icon: faDesktop,
        Services: [
          {
            ID: 2,
            Title: "asdx",
            Description: "asdxasdx"
          }
        ]
      },
      {
        ID: 3,
        Title: "Szoftverfejlesztés",
        Icon: faCode,
        Services: [
          {
            ID: 3,
            Title: "asdz",
            Description: "asdzasdz"
          }
        ]
      },
    ])
  },[])
  return (
    <div>
      <Header />
      <div>
        <h3 className='font-semibold mx-10 my-8 text-xl'>Kérlek válassz az alábbi ágazataink közül!</h3>
        <div className='rounded-lg overflow-hidden flex flex-col gap-0.5 mx-10'>
          {items.map((item, i) => <Category icon={item.Icon} title={item.Title} services={item.Services} contentIndex={i + 1} openedContent={openedContent} setOpenedContent={setOpenedContent} />)}        
        </div>
      </div>
    </div>
  )
}

export default Offer