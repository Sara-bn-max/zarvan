import React from 'react'
import loading from '../../assets/loader/load.gif'
// import './loadingStyle.css'

export default function Loading() {
  return (
    <div className='loading w-100'><img className='w-100' src={loading} /></div>
  )
}
