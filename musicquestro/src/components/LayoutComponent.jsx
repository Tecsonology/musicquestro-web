import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function LayoutComponent() {
  return (
    <div className='fpage flex fdc aic jc-c'>
      <h1>LAyout</h1>
      <Link to={'child-layout'}>dasdas</Link>
      <Outlet />
    </div>
  )
}

export default LayoutComponent
