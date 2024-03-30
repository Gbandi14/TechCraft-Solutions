import React from 'react'
import Header from '../components/Header'
import ProfilePic from '../img/Profilepic.png'

function Profile() {
  return (
    <div>
        <Header/>
        <h1 className='text-2xl my-6 mx-16 font-semibold'>Profil</h1>   
        <div className='flex flex-col md:flex-row text-lg'>
            <img src={ProfilePic} alt="profilepic" className='mx-14'/>
            <div className='flex h-max w-full'>
                <div className='flex flex-col gap-2 justify-evenly pr-6'>
                    <label htmlFor="fullname">Tejlesnév:</label>
                    <label htmlFor="email">Email:</label>
                    <label htmlFor="phone">Telefonszám:</label>
                    <label htmlFor="companyname">Cégnév:</label>
                </div>
                <div className='flex flex-col gap-2 justify-evenly *:bg-[#0F1035]/50 *:rounded-md *:outline-none *:px-2.5 *:py-0.5'>
                    <input type="text" name='fullname' id='fullname'/>
                    <input type="text" name='email' id='email'/>
                    <input type="text" name='phone' id='phone'/>
                    <input type="text" name='companyname' id='companyname'/>
                </div>
            </div>
            <div className='flex h-max w-full'>
                <div className='flex flex-col gap-2 justify-evenly pr-6'>
                    <label htmlFor="username">Felhasználónév:</label>
                    <label htmlFor="profilpic">Profilkép:</label>
                    <label>&#8203;</label>
                    <label>&#8203;</label>
                </div>
                <div className='flex flex-col gap-2 justify-evenly *:bg-[#0F1035]/50 *:rounded-md *:outline-none *:px-2.5 *:py-0.5'>
                    <input type="text" name='username' id='username'/>
                    <input type="file" name='profilepic' id='profilepic'/>
                    <button className='!bg-[#3887BE]/50 hover:!bg-[#3887BE]/100 transition-colors'>Adatok módosítása</button>
                    <button className='!bg-[#FF0000]/50 hover:!bg-[#FF0000]/75 transition-colors'>Kijelentkezés</button>
                </div>
            </div>
        </div>              
    </div>
  )
}

export default Profile