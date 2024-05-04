import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'

const Signup = () => {
  const[formData,setFormData]=useState({})
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(false)
  const navigate = useNavigate();


  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})

  }

  // console.log(formData)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)  
      setError(false);

        const res = await fetch("/api/auth/signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(formData)
          });
          
      const data=await res.json()
      setLoading(false)
      
      
      if(data.success===false){
         setError(true)
         return
        }

         setError(false);
         navigate('/signin')
    
      }
    catch(err){
      setLoading(false)
      setError(true)
   }
  

  }



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' placeholder='username' id='username' className='bg-slate-100 p-3 rounded-lg'/>
        <input onChange={handleChange} type='email' placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg'/>
        <input onChange={handleChange} type='password' placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg'/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading ? 'Loading' : 'sign-up'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/signin'>
        <span className='text-blue-700'>Sign-in</span> 
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went Wrong!'}</p>


    </div>
  );
}

export default Signup
