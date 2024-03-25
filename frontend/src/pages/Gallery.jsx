import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import htmlParse from 'html-react-parser'
import Modal from '../components/Gallery/Modal'

function Gallery() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    setItems([
      {
        ID: 1,
        Image: "https://picsum.photos/id/237/1920/1080",
        Text: `
          <h2 className='text-center mb-3 text-3xl'>Keresztátadó</h2>
          <p className='text-justify-center mb-20'>Ügyfelem komplett rendszerébe illeszthető berendezés tervezése volt a cél. A feladat a raklap kétirányű mozgatása, illetve orientáció változtatás nélküli átadása másik pályára.</p>
          <h4 className='mb-3'>Feladatok:</h4>
          <ul className='list-disc ml-5'>
            <li>EUR raklap szállítása, amely maximális tömege 1 tonna</li>
            <li>Keresztátadás az orientáció megtartásával</li>
            <li>Kompakt kialakítás, amely más projektbe történő gyors implementálást tesz lehetővé</li>
            <li>Logika és szernzorozás kiépítése</li>
          </ul>`, 
      },
      {
        ID: 2,
        Image: "https://picsum.photos/id/238/1920/1080",
        Text: `
          <h2 className='text-center mb-3 text-3xl'>Keresztátadó</h2>
          <p className='text-justify-center mb-20'>Ügyfelem komplett rendszerébe illeszthető berendezés tervezése volt a cél. A feladat a raklap kétirányű mozgatása, illetve orientáció változtatás nélküli átadása másik pályára.</p>
          <h4 className='mb-3'>Feladatok:</h4>
          <ul className='list-disc ml-5'>
            <li>EUR raklap szállítása, amely maximális tömege 1 tonna</li>
            <li>Keresztátadás az orientáció megtartásával</li>
            <li>Kompakt kialakítás, amely más projektbe történő gyors implementálást tesz lehetővé</li>
            <li>Logika és szernzorozás kiépítése</li>
          </ul>` 
      }
    ]);
  }, []);
  return (
    <div>
      <Header />
      {
        items.map((item) => (
        <div key={item.ID} className='flex flex-col lg:flex-row lg:items-center lg:space-x-6'>
          <img src={item.Image} alt="itemImage" className='m-7 rounded-3xl aspect-video object-cover lg:w-1/2'/>
          <div className='m-7'>
            <div className='mb-8'>
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