import React, {useRef, useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Gear from '../img/Gear.svg'
import Monitor from '../img/Monitor.svg'
import Code from '../img/Code.svg'
import axios from 'axios'

function About() {
  const content_1 = useRef(null)
  const content_2 = useRef(null)
  const content_3 = useRef(null)
  const [categories, setCategories] = useState([])

  function scrollTo(ref) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
  }


  useEffect(() => {
    axios.get("http://localhost:8000/categories").then((res) => {
      const data = res.data.map((x) => {
        return {
          ...x,
          Icon: (x.ID === 1 ? Gear : x.ID === 2 ? Monitor : Code),
          Content: (x.ID === 1 ? content_1 : x.ID === 2 ? content_2 : content_3)
        }
      })

      setCategories(data)
    })
    
  }, [])

  return (
    <div>
      <h1 className='text-center text-3xl mt-16 font-semibold'>Cégünkről</h1>
      <p className='text-center mt-12 max-w-screen-xl mx-auto px-5'>
        A TechCraft Solutions egy dinamikus és innovatív vállalkozás, amely széleskörű szolgáltatásokat nyújt szoftverfejlesztés, webfejlesztés, gépészeti tervezés és műszaki tanácsadás terén. 
        Vállalkozásunk magasan képzett szakemberekből álló csapattal rendelkezik, akik elkötelezettek az ügyfelek igényeinek kielégítése és a legújabb technológiai trendek követése mellett.
      </p>
      <h2 className='text-center text-2xl font-semibold mt-20 px-10'>Szolgáltatásaink</h2>
      <div className='flex flex-wrap gap-10 px-20 mt-10 justify-center'>
        {categories.map((category) => 
          <div key={category.ID} className='flex flex-col bg-[#0F1035]/40 rounded-2xl p-12 w-60 relative pb-16'>
            <img src={category.Icon} alt="gear" className='w-full mb-4'/>
            <h3 className='font-semibold text-center'>{category.Title}</h3>
            <button onClick={() => scrollTo(category.Content)}><FontAwesomeIcon icon={faChevronDown} className='h-6 absolute left-1/2 bottom-6 -translate-x-1/2'/></button>
          </div>
        )}
      </div>
      {categories.map((category) => 
        <div key={`x${category.ID}`} className='relative bg-[#0F1035]/20 mt-20 p-10 items-center overflow-hidden' ref={category.Content}>
          <img src={category.Icon} alt="gear" className='absolute ml-20 scale-[2.2] opacity-25 rotate-45'/>
          <h2 className='text-center text-2xl font-semibold px-10'>{category.Title}</h2>
          <p className='text-center mt-8 max-w-screen-xl mx-auto px-5'>{category.Text}</p>   
        </div>  
      )}
    </div>
  )
}

export default About