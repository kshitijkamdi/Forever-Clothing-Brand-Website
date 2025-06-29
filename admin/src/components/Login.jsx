import React, { useState } from 'react'
import { backendUrl } from '../App';
import axios from "axios"
import { toast } from 'react-toastify';
//import { response } from 'express';

const Login = ({setToken}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault();
            //console.log(email, password);
            
            const response= await axios.post(backendUrl + "/api/user/admin", {email, password}) ;
            console.log(response);

            if(response.data.success){
              setToken(response.data.token)
            }
            else{
              console.log(error)
              toast.error(error.response.data.message)
            }

        } catch (error) {
          console.log(error)
          toast.error(response.data.message)
            
        }
    }

  return (
    <div className='items-center justify-center px-8 py-8 min-h-screen flex w-full'>
      <div className=' shadow-md border border-gray-500 rounded-l min-w-md py-4 px-4'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
        <hr/>

        <form onSubmit={onSubmitHandler}>
            <div>
                <p className='text-small font-medium mx-3 py-3 px-2'>Email: </p>
                <input onChange={(e)=> setEmail(e.target.value)} value={email} className='w-full px-3 py-2 mb-4 border border-gray-300' type='email' placeholder='your@email.com' required/>
            </div>

            <div>
                <p className='text-small font-medium mx-3 py-3 px-2'>Password: </p>
                <input onChange={(e)=> setPassword(e.target.value)} value={password} className='w-full px-3  py-2 mb-4 border border-gray-300' type='password' placeholder='your@email.com' required/>
            </div>

            <button className="bg-black text-white w-full rounded-md py-3 cursor-pointer active:bg-gray-700" type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
