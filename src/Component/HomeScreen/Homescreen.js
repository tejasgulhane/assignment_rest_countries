import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Showinfo from '../Showinfo/Showinfo';
import './Homescrenn.css'

const Homescreen = () => {
    const [data ,setdata] = useState();
    const [showdata ,setshowdata] = useState();
    const [dcountry ,setdcountry] = useState(false);
    const [dcapital ,setdcapital] = useState(false);
    const [scapital ,setscapital] = useState();
    const countryref = useRef();

    useEffect(()=>{
        fetchdata();
    },[])

    const history = useNavigate();

    const fetchdata = ()=>{
        fetch('https://restcountries.com/v2/all').
        then(res => res.json()).
        then(data =>{
        setdata(data)
        setshowdata(data)
        console.log(data);
        })
    }

    const searchcountry =()=>{
        let query = countryref.current.value.toLowerCase()
        console.log(query);
        if(query.length==0){
            setdcountry(false)
            setdcapital(false)
        }
        else{
            let fdata = data.filter((post) => {
                if (post.name.toLowerCase().includes(query)) {
                    return post;
                }
            })
            setdcountry(true)
              setshowdata(fdata)
              console.log(fdata);
        }
        

    }

    const showcapital =(id)=>{
        setdcapital(true)
        setscapital(id)

        console.log(scapital);
    }

    const logout =()=>{
        localStorage.removeItem("user_login")
        history('/')
    }
  return (
    <>
    <div className='header'>
       <input type="text" name="SEARCH COUNTRIES ... " onChange={searchcountry} ref={countryref} className='searchinput' placeholder='SEARCH COUNTRIES ...'/>
       <button type="LOGOUT" className='logout_btn' onClick={logout}>Logout</button>
    </div>
        { dcapital && <Showinfo capital={scapital} />}
       { !dcountry && <table className='table'>
        <tr className='row'>
          <th>Name</th>
          <th>Capital</th>
          <th>Currency</th>
        </tr>
        {!dcountry && data && data.map((val, key) => {
          return (
            <tr key={key} className='row'>
              <td>{val.name}</td>
              <td>{val.capital}</td>
              {val.currencies ? <td>{val.currencies[0].name}</td> : <td>N.A</td>}
            </tr>
          )
        })}
        
      </table>}
      {
            dcountry && showdata && showdata.map((val, key) => {
                return (
                  <h4 key={key} className='row row2'>
                    <p onClick={()=>showcapital(val.capital)}>{val.name}</p>
                    {/* { dcapital && <h1>{val.name}</h1>} */}
                  </h4>
                )
              })

        }
    </>
  )
}

export default Homescreen