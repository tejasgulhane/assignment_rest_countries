import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Signup from './Component/Auth/Signup';
import Homescreen from './Component/HomeScreen/Homescreen';
// import Expenses from "./components/Expenses/Expenses";
// import NewExpense from './components/NewExpense/NewExpense';
import './style.css'


const App = () => {
 const [signup , updatesignup] = useState(false)
 const [checklogin , updatechecklogin] = useState(false)

 const signupstate =()=>{
  updatesignup(true);
 }
 useEffect(()=>{
    if(localStorage.getItem('user_login'))
    {
    updatechecklogin(true)
    }
    else{
    updatechecklogin(false)
    }
 },[checklogin])
 
 
  return (
    <>
        
        <Routes>
          <Route exact path='/details' element={ checklogin && <Homescreen />}/>
          <Route exact path='/' element={ <Signup onselect = {signupstate}/>}/>
        </Routes>
    </>
  );
}

export default App;