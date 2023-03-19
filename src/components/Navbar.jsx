import React, { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <h3>{currentUser.displayName}</h3>
      </div>
    </div>
  )
}

export default Navbar