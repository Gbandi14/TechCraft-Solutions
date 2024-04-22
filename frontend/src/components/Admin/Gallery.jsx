import React, { useEffect, useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import axios from 'axios'

function Gallery(props) {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const editorRef = useRef(null)
  const [reference, setReference] = useState(null)
  const [references, setReferences] = useState([])
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [id, setId] = useState(null)
  const [text, setText] = useState('')

  useEffect(() => {
    function mouseMove(e) {
      setX(e.pageX)
      setY(e.pageY)
    }
    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios.get("http://localhost:8000/references").then((res) => {
        setReferences(res.data)
        if (res.data.length > 0){
          setReference(res.data[0].ID)
          setId(res.data[0].ID)
          setTitle(res.data[0].Title)
          setImage(res.data[0].Image)
          setText(res.data[0].Text)
        } else {
          setReference(0)
        }

      })   
    } else {
      props.history('/')
    }
  }, [props])

  useEffect(() => {
    if (reference === 0) {
      setId(0)
      setTitle('')
      setImage('')
      setText('')
    }

    if (!reference || !references) return
    const r = references.find(x => x.ID === Number(reference))
    setId(r.ID)
    setTitle(r.Title)
    setImage(r.Image)
    setText(r.Text)
  }, [reference, references])

  function update() {
    if (reference === 0) {
      axios.post("http://localhost:8000/reference", { image, title, text }, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
        alert(res.data)
        window.location.reload()
      }).catch((err) => {
        alert(err.response.data)
      })
    } else {
      axios.patch("http://localhost:8000/reference", { image, title, text, id }, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
        alert(res.data)
      }).catch((err) => {
        alert(err.response.data)
      })
    }
  }

  function remove() {
    axios.delete("http://localhost:8000/reference/" + id, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
      alert(res.data)
      window.location.reload()
    }).catch((err) => {
      alert(err.response.data)
    })
  }

  return (
    <div className='flex m-20 mb-0 pb-20'>
      <div className='relative w-96 bg-[#0F1035] p-7 rounded-s-xl'>
        <h1 className='text-center text-lg'>Galéria</h1>

        <div className='flex flex-col gap-2 mt-4 *:rounded-md *:outline-none *:px-3 *:py-1 *:text-lg justify-center min-h-0 grow'>
          {references.map((r) => 
            <button className='bg-[#3887BE]/50 hover:bg-[#3887BE]/100' key={r.ID} onClick={()=>{setReference(r.ID)}}>{r.Title}</button>
          )}
          <button className='bg-[#008000]/50 hover:bg-[#008000]/100' onClick={()=>{setReference(0)}}>Új referencia</button>
        </div>
      </div>
      <div className='w-full bg-[#0F1035]/40 rounded-e-xl p-7'>
        <h1 className='text-center text-lg'>{reference === 0 ? 'Új adat' : 'Módosítás'}</h1>

        <div className='flex flex-col w-4/5 mx-auto my-8'>
          <label htmlFor="title" className='ml-1'>Cím</label>
          <input value={title} onChange={(e) => {setTitle(e.target.value)}} type="text" name="title" id="title" className='rounded-lg mt-1 text-black px-2 py-1 outline-none' />

          <div className='flex flex-col group'>
            <label htmlFor="image" className='mt-4 ml-1'>Kép</label>
            <input value={image} onChange={(e) => {setImage(e.target.value)}} type="text" name="image" id="image" className='rounded-lg mt-1 text-black px-2 py-1 outline-none' />
            <img src={image} alt="Linkelj be egy képet!" className='absolute left-0 top-0 group-hover:left-[--x] group-hover:top-[--y] h-40 rounded-lg z-10 opacity-0 group-hover:opacity-100 pointer-events-none' style={{"--x": x + "px", "--y": y + "px"}} />
          </div>

          <label className='mt-4 ml-1'>Leírás</label>
          <Editor
            apiKey='9u0zx15z13tbkzj1sgxxt9js3g58iba7sf5urpi9rej4cw6k'
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              resize: false
            }}
            value={text}
            onEditorChange={(content) => {setText(content)}}
          />
        </div>

        <div className='flex gap-3 *:rounded-md *:outline-none *:px-3 *:py-1 *:text-lg justify-center'>
          <button onClick={update} className='!bg-[#3887BE]/50 hover:!bg-[#3887BE]/100 transition-colors'>{reference === 0 ? 'Adat felvétele' : 'Adatok módosítása'}</button>
          {reference !== 0 ? <button onClick={remove} className='!bg-[#FF0000]/50 hover:!bg-[#FF0000]/100 transition-colors'>Törlés</button> : <></>}
          <button onClick={() => window.location.reload()} className='!bg-[#FF0000]/50 hover:!bg-[#FF0000]/75 transition-colors'>Mégsem</button>
        </div>
      </div>
    </div>
  )
}

export default Gallery