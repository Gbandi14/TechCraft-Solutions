import React from 'react'
import { Link } from 'react-router-dom'

function NavItem(props) {
  return (
    <Link to={props.pathname} className={`${window.location.pathname.startsWith(props.pathname) ? 'text-[#3887BE]/60 font-bold' : 'hover:opacity-60 transition-opacity'}`}>{props.text}</Link>
  )
}

export default NavItem