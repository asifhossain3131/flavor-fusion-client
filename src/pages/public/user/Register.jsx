import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import registration from "../../../../public/112454-form-registration.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  FaUndoAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";


const Register = () => {
  const { createUser, profileUpdate, googleLogin} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const[isDisabled,setDisabled]=useState(true)
  const randomNumber=Math.floor(1000+Math.random(10)*9000)
  const [captcha,setCaptcha]=useState(randomNumber)
  const navigate=useNavigate()
  const location=useLocation()
 const target=location?.state?.from||'/shop'

  const handleRegister = (data) => {
    setError('')
    setSuccess('')
   const {name,email,photo,password,confirm}=data
       if(password!==confirm){
        return setError('passowrd not matched')
       }
       createUser(email,password)
       .then(res=>{
          profileUpdate(name,photo)
          .then(()=>{
            const newUser={name:name, email:email}
            fetch('https://flavor-fusion-server-six.vercel.app/users',{
              method:'POST',
              headers:{
                'content-type': 'application/json'
              },
              body:JSON.stringify(newUser)
            })
            .then(res=>res.json())
            .then(data=>{
              if(data.insertedId){
               reset()
               toast.success('Registration has been successful')
              }
              navigate(target,{replace:true})
            })
          })
       })
       .catch(err=>{
         setError('Something went wrong. Please try again!')
       })
  };

  const handleCaptcha=e=>{
    if(e.target.value==captcha){
      setDisabled(false)
    }
    else{
      setDisabled(true)
    }
  }

  const handleGoogleSign=()=>{
   googleLogin()
   .then(res=>{
    const loggedUser=res.user
    const userInfo={name:loggedUser.displayName, email: loggedUser.email}
    fetch('https://flavor-fusion-server-six.vercel.app/users',{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(userInfo)
    })
    .then(res=>res.json())
    .then(()=>{
      navigate(target,{replace:true})
    })
   })
   
  }
  return (
    <div className="mx-12 flex flex-col lg:flex-row items-center justify-center">
      <div className="lg:w-1/2">
        <Lottie animationData={registration} loop={true} />
      </div>

      <div className="card  lg:w-1/2 shadow-xl bg-gray-100">
        <div className="card-body">
          <div className="my-4 space-y-2">
            <h1 className="font-bold text-3xl">Welcome</h1>
            <p className="font-semibold text-gray-600 text-xl">
              Register to explore!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                {...register("photo")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control" >
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                className="input input-bordered"
              />
              <span className="text-gray-500"><small>Password should contain at least 6 characters with at least one capital, one small and one special character</small></span>
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                {...register("confirm")}
                className="input input-bordered"
                required
              />
            </div>
             <p className="text-center mt-4 mb-2 text-2xl font-bold">{captcha}</p>
             <div className="form-control w-9/12">
              <label className="label">
                <span className="label-text">Captcha</span>
              </label>
              <input
              onChange={handleCaptcha}
                type="number"
                placeholder="Write the code here"
              
                className="input input-bordered"
                required
              /> <span onClick={()=>setCaptcha(randomNumber)} className="m-3 flex cursor-pointer gap-4 items-center"> <FaUndoAlt></FaUndoAlt> Reload captcha</span>
            </div>
            <span className="text-red-500">{error}</span>
            <span className="text-green-500">{success}</span>
            <div className="form-control mt-6">
              <input
              disabled={isDisabled}
                type="submit"
                value="Create an account"
                className="btn border-none bg-yellow-500 hover:bg-yellow-400 font-semibold"
              />
            </div>
          </form>
          <span className="text-gray-700 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </span>
          <div className="space-y-4">
          <div className="divider">OR</div>
          <p className="text-center font-semibold">Continue sign up with</p>
          <button onClick={handleGoogleSign} className="btn border-none bg-gray-300 text-black hover:bg-opacity-10 w-full"> Continue with Gmail</button>
          <button className="btn border-none bg-blue-600 hover:bg-blue-500 w-full">Continue with Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
