import React from 'react'
import './showinfo.css'

const Showinfo = (props) => {
    console.log(props.capital);
  return (
    <>
        <h1  className='capital'>{props.capital}</h1>
    </>
  )
}

export default Showinfo