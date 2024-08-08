import React, { useState } from 'react'

const Nav = () => {

  const [navItems,setNavItems] = useState(['Darshboard']);

  return (
    <div>
      <ul className='nav'>
        {navItems.map((item)=>{
          return <li className='nav-items'>{item}</li>
        })}

      </ul>
    </div>
  )
}

export default Nav