import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Auth.css'

const Signup = (props) => {
    const [signup,setsignup] = useState(false);
    const emailref = useRef()
    const fnameref = useRef()
    const lnameref = useRef()
    const passwordref = useRef()
    const cpasswordref = useRef()

    const history = useNavigate()
    const gotosignin = ()=>{
        setsignup(true)
    }

    const [inpval, setInpval] = useState({
        email: "",
        fname: "",
        lname:"",
        password: ""
    })


    const [data,setData] = useState([]);
   
    const Signuphandler = () => {
     
        console.log(
            emailref.current.value,
            fnameref.current.value,
            lnameref.current.value,
            passwordref.current.value

        )
        let formdata = JSON.parse(localStorage.getItem("user")) || []

        formdata.push({
            email:emailref.current.value,
            fname:fnameref.current.value,
            lname:lnameref.current.value,
            password:passwordref.current.value
        })
        setInpval({
            email:emailref.current.value,
            fname:fnameref.current.value,
            lname:lnameref.current.value,
            password:passwordref.current.value
        })
        const { fname, email, password } = inpval;

        if (fname === "") {
            alert(' first name field is requred!')
        } else if (email === "") {
            alert(' E-Mail  field is requred!')
        } else if (!email.includes("@")) {
            alert(' Please enter valid Email address')
        } else if (password === "") {
             alert("Password is required !")
        } else if (password.length < 5) {
            alert("Password length must be greater than 5 ")
        } else {
            console.log("data added succesfully");
            history("/login")
            setsignup(true)
            localStorage.setItem("user",JSON.stringify(formdata));

        }

    }


    const Signinhandler = () =>{
        let signindata = {
            email:emailref.current.value,
            password:passwordref.current.value
        }

        let userdata = JSON.parse(localStorage.getItem("user"))
        console.log(userdata);

        const userlogin = userdata.filter((el, k) => {
            return el.email === emailref.current.value && el.password === passwordref.current.value
        });

        if (userlogin.length === 0) {
            alert("invalid details")
        } else {
            console.log("user login succesfulyy");
            props.onselect();
            localStorage.setItem("user_login", JSON.stringify(userlogin))
            history('/details')
        }
    }

  return (
        <>
        {
            !signup ? <>
            <div className='authbox'>
                <div className='authbox_container'>
                <h1>Create Account</h1>
                <p>Already had an account ? <a onClick={gotosignin} className="signinlink"> Sign In</a></p>

                <input type="email" name="E-Mail"  ref={emailref} placeholder="Email"/>
                <input type="text" name="First Name"  ref={fnameref} placeholder="First Name"/>
                <input type="text" name="Last Name"  ref={lnameref} placeholder="Last Name"/>
                <input type="password" name="Password"  ref={passwordref} placeholder="Password"/>
                <input type="password" name="New Pssword"  ref={cpasswordref} placeholder="Confirm Password"/>
                <button onClick={Signuphandler}>Signup</button>
                </div>
            </div>
                </> 
                :
                <>
                <div className='authbox'>
                    <div className='authbox_container'>
                        
                    <h1>Welcome</h1>
        
                    <input type="email" name="E-Mail"  ref={emailref} placeholder="Email"/>
                    <input type="password" name="Password"  ref={passwordref} placeholder="Password"/>
                    
                    <button onClick={Signinhandler}>SigIn</button>
                    </div>
                
                </div>
                 </>
        }

    </>
  )
}

export default Signup;