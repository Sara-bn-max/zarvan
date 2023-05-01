import React from 'react'
import loading from '../../assets/loader/load.gif'
import './loadingStyle.css'

export default function Loading() {
  return (
    <div className=' w-100'><img className='loading' src={loading} /></div>
  )
}
