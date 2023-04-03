import React from 'react'
import loading from '../../assets/loader/load.gif'
// import './loadingStyle.css'

export default function Loading() {
  return (
    <div className='loading'><img src={loading} /></div>
  )
}
