import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [kLogged, setKLogged] = useState(false)
  function loginClick() {
    alert(email + "," + password + "," + kLogged)
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col bg-[#0F1035] rounded-2xl p-12'>
        <h1 className='text-2xl text-center'>Bejelentkezés</h1>
        <label htmlFor="email" className='text-sm mt-6 ml-1'>Email</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' id='email' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Email'/>
        <label htmlFor="passwd" className='text-sm mt-4 ml-1'>Jelszó</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} name='passwd' id='passwd' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Jelszó'/>
        <div className='flex items-center gap-2 mt-4' onClick={() => {setKLogged(!kLogged)}}>
          <span className={`flex items-center justify-center w-6 h-6 border-2 border-[#3887BE] ${kLogged ? 'bg-[#3887BE]' : 'bg-[#0F1035]'} rounded-md transition-colors`}>
            <FontAwesomeIcon icon={faCheck} className='text-[#0F1035]' />
          </span>
          Maradj bejelentkezve
        </div>
        <button onClick={loginClick} className='px-7 py-2 rounded-lg bg-[#3887BE]/100 hover:bg-[#3887BE]/75 transition-colors mt-5 self-center'>Bejelentkezés</button>
        <Link to={'/register'} className='text-center mt-1.5'>Regisztráció</Link>
      </div>
    </div>
  )
}

export default Login