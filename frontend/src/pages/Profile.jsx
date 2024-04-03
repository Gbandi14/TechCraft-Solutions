import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProfilePic from '../img/Profilepic.png'
import axios from 'axios'

function Profile(props) {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [username, setUsername] = useState('')
    // const [profilePicture, setProfilePicture] = useState('')

    function updateProfile() {
        if (!window.confirm("A rendszer ki fog jelentkeztetni, biztos folytatod?")) return

        axios.post("http://localhost:8000/userupdate", {username, companyname: companyName, firstname: fullname.split(" ")[0], lastname: fullname.split(" ")[1], phone: phoneNumber, email}, {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
            alert('Sikeres profil módosítás!')
            logout()
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    function logout() {
        sessionStorage.removeItem("token")
        window.location.reload()
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")){
            axios.get("http://localhost:8000/userdata", {headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}}).then((res) => {
                setFullname(res.data.Firstname + " " + res.data.Lastname)
                setEmail(res.data.Email)
                setPhoneNumber(res.data.PhoneNumber)
                setCompanyName(res.data.CompanyName)
                setUsername(res.data.Username)
                // setProfilePicture(res.data.ProfilePicture)
            })
        } else {
            props.history("/")
        }
    }, [props])

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
                        <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" name='fullname' id='fullname'/>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name='email' id='email'/>
                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" name='phone' id='phone'/>
                        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="text" name='companyname' id='companyname'/>
                    </div>
                </div>
                <div className='flex h-max w-full'>
                    <div className='flex flex-col gap-2 justify-evenly pr-6'>
                        <label htmlFor="username">Felhasználónév:</label>
                        {/* <label htmlFor="profilpic">Profilkép:</label> */}
                        <label>&#8203;</label>
                        <label>&#8203;</label>
                    </div>
                    <div className='flex flex-col gap-2 justify-evenly *:bg-[#0F1035]/50 *:rounded-md *:outline-none *:px-2.5 *:py-0.5'>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name='username' id='username'/>
                        {/* <input value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} type="file" name='profilepic' id='profilepic'/> */}
                        <button onClick={updateProfile} className='!bg-[#3887BE]/50 hover:!bg-[#3887BE]/100 transition-colors'>Adatok módosítása</button>
                        <button onClick={logout} className='!bg-[#FF0000]/50 hover:!bg-[#FF0000]/75 transition-colors'>Kijelentkezés</button>
                    </div>
                </div>
            </div>              
        </div>
    )
}

export default Profile