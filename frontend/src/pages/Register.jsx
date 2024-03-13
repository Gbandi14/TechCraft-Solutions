import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col bg-[#0F1035] rounded-2xl p-12'>
        <h1 className='text-2xl text-center'>Regisztráció</h1>
        <div className='flex gap-10'>
          <div className='flex flex-col w-1/2'>
            <label htmlFor="username" className='text-sm mt-6 ml-1'>Felhasználónév</label>
            <input type='text' name='username' id='username' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Felhasználónév'/>
            <label htmlFor="companyname" className='text-sm mt-6 ml-1'>Cégnév</label>
            <input type='text' name='companyname' id='companyname' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Cégnév'/>
            <div className='flex gap-2 w-full'>
              <div className='flex flex-col w-[calc(50%-0.25rem)]'>
                <label htmlFor="firstname" className='text-sm mt-6 ml-1'>Vezetéknév <span className='text-[#FF004D]'>*</span></label>
                <input type='text' name='firstname' id='firstname' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Vezetéknév'/>
              </div>
              <div className='flex flex-col w-[calc(50%-0.25rem)]'>
                <label htmlFor="lastname" className='text-sm mt-6 ml-1'>Keresztnév <span className='text-[#FF004D]'>*</span></label>
                <input type='text' name='lastname' id='lastname' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Keresztnév'/>
              </div>
            </div>   
            <label htmlFor="phonenumber" className='text-sm mt-6 ml-1'>Telefonszám</label>
            <input type='text' name='phonenumber' id='phonenumber' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Telefonszám'/>
          </div>
          <div className='flex flex-col w-1/2'>
            <label htmlFor="email" className='text-sm mt-6 ml-1'>Email <span className='text-[#FF004D]'>*</span></label>
            <input type='email' name='email' id='email' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Email'/>
            <label htmlFor="passwd" className='text-sm mt-6 ml-1'>Jelszó <span className='text-[#FF004D]'>*</span></label>
            <input type='password' name='passwd' id='passwd' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Jelszó'/>
            <label htmlFor="repasswd" className='text-sm mt-6 ml-1'>Jelszó újra <span className='text-[#FF004D]'>*</span></label>
            <input type='password' name='repasswd' id='repasswd' className='px-4 py-2 rounded-lg bg-white outline-none text-black' placeholder='Jelszó újra'/>
          </div>          
        </div>   

        <button className='px-7 py-2 rounded-lg bg-[#3887BE]/100 hover:bg-[#3887BE]/75 transition-colors mt-8 self-center'>Regisztráció</button>
        <Link to={'/login'} className='text-center mt-1.5'>Bejelentkezés</Link>
      </div>
    </div>
  )
}

export default Register