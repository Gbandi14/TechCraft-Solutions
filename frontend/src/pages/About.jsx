import React, {useRef} from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Gear from '../img/Gear.svg'
import Monitor from '../img/Monitor.svg'
import Code from '../img/Code.svg'
import { Link } from 'react-router-dom'

function About() {
  const content_1 = useRef(null)
  const content_2 = useRef(null)
  const content_3 = useRef(null)
  function scrollTo(ref) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
  }
  return (
    <div>
      <Header />
      <h1 className='text-center text-3xl mt-16 font-semibold'>Cégünkről</h1>
      <p className='text-center mt-12 max-w-screen-xl mx-auto px-5'>
        A TechCraft Solutions egy dinamikus és innovatív vállalkozás, amely széleskörű szolgáltatásokat nyújt szoftverfejlesztés, webfejlesztés, gépészeti tervezés és műszaki tanácsadás terén. 
        Vállalkozásunk magasan képzett szakemberekből álló csapattal rendelkezik, akik elkötelezettek az ügyfelek igényeinek kielégítése és a legújabb technológiai trendek követése mellett.
      </p>
      <h2 className='text-center text-2xl font-semibold mt-20 px-10'>Szolgáltatásaink</h2>
      <div className='flex flex-wrap gap-10 px-20 mt-10 justify-center'>
        <div className='flex flex-col bg-[#0F1035]/40 rounded-2xl p-12 w-60 relative pb-16'>
          <img src={Gear} alt="gear" className='w-full mb-4'/>
          <h3 className='font-semibold text-center'>Gépészeti tervezés és műszaki tanácsadás</h3>
          <button onClick={() => scrollTo(content_1)}><FontAwesomeIcon icon={faChevronDown} className='h-6 absolute left-1/2 bottom-6 -translate-x-1/2'/></button>
        </div>
        <div className='flex flex-col bg-[#0F1035]/40 rounded-2xl p-12 w-60 relative pb-16'>
          <img src={Monitor} alt="monitor" className='w-full mb-4'/>
          <h3 className='font-semibold text-center'>Webfejlesztés</h3>
          <button onClick={() => scrollTo(content_2)}><FontAwesomeIcon icon={faChevronDown} className='h-6 absolute left-1/2 bottom-6 -translate-x-1/2'/></button>
        </div>
        <div className='flex flex-col bg-[#0F1035]/40 rounded-2xl p-12 w-60 relative pb-16'>
          <img src={Code} alt="code" className='w-full mb-4'/>
          <h3 className='font-semibold text-center'>Szoftverfejlesztés</h3>
          <button onClick={() => scrollTo(content_3)}><FontAwesomeIcon icon={faChevronDown} className='h-6 absolute left-1/2 bottom-6 -translate-x-1/2'/></button>
        </div>
      </div>
      <div className='relative bg-[#0F1035]/20 mt-20 p-10 items-center overflow-hidden' ref={content_1}>
        <img src={Gear} alt="gear" className='absolute ml-20 scale-[2.2] opacity-25 rotate-45'/>
        <h2 className='text-center text-2xl font-semibold px-10'>Tervezés és tanácsadás</h2>
        <p className='text-center mt-8 max-w-screen-xl mx-auto px-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore nobis dolore vitae ab eligendi et! Veniam facere incidunt aliquid fuga neque fugiat, unde iure nesciunt deleniti voluptatem assumenda. Odit illum corporis, asperiores facilis accusamus eaque nostrum temporibus consequuntur aperiam quae necessitatibus laborum quia eum enim sit ut repellendus, dolore cupiditate totam officiis distinctio molestias libero! Aliquid, consequuntur mollitia odit quae at ipsam sequi deleniti sint vitae autem consectetur magni ducimus quibusdam unde doloribus deserunt sunt aut maxime tempore optio inventore voluptas earum quaerat. Reiciendis praesentium optio numquam iusto pariatur consequatur aut qui dolorum repellat, labore inventore itaque dolores cupiditate tempora.</p>   
      </div>  
      <div className='relative bg-[#0F1035]/20 mt-20 p-10 items-center overflow-hidden' ref={content_2}>
        <img src={Monitor} alt="monitor" className='absolute ml-20 scale-[2.2] opacity-25 rotate-[20deg]'/>
        <h2 className='text-center text-2xl font-semibold px-10'>Webfejlesztés</h2>
        <p className='text-center mt-8 max-w-screen-xl mx-auto px-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore nobis dolore vitae ab eligendi et! Veniam facere incidunt aliquid fuga neque fugiat, unde iure nesciunt deleniti voluptatem assumenda. Odit illum corporis, asperiores facilis accusamus eaque nostrum temporibus consequuntur aperiam quae necessitatibus laborum quia eum enim sit ut repellendus, dolore cupiditate totam officiis distinctio molestias libero! Aliquid, consequuntur mollitia odit quae at ipsam sequi deleniti sint vitae autem consectetur magni ducimus quibusdam unde doloribus deserunt sunt aut maxime tempore optio inventore voluptas earum quaerat. Reiciendis praesentium optio numquam iusto pariatur consequatur aut qui dolorum repellat, labore inventore itaque dolores cupiditate tempora.</p>
      </div>  
      <div className='relative bg-[#0F1035]/20 mt-20 p-10 items-center overflow-hidden' ref={content_3}>
        <img src={Code} alt="code" className='absolute ml-20 scale-[2.2] opacity-25 rotate-[20deg]'/>
        <h2 className='text-center text-2xl font-semibold px-10'>Szoftverfejlesztés</h2>
        <p className='text-center mt-8 max-w-screen-xl mx-auto px-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore nobis dolore vitae ab eligendi et! Veniam facere incidunt aliquid fuga neque fugiat, unde iure nesciunt deleniti voluptatem assumenda. Odit illum corporis, asperiores facilis accusamus eaque nostrum temporibus consequuntur aperiam quae necessitatibus laborum quia eum enim sit ut repellendus, dolore cupiditate totam officiis distinctio molestias libero! Aliquid, consequuntur mollitia odit quae at ipsam sequi deleniti sint vitae autem consectetur magni ducimus quibusdam unde doloribus deserunt sunt aut maxime tempore optio inventore voluptas earum quaerat. Reiciendis praesentium optio numquam iusto pariatur consequatur aut qui dolorum repellat, labore inventore itaque dolores cupiditate tempora.</p>
      </div>  
    </div>
  )
}

export default About