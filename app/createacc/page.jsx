"use client"

import react,{useState} from "react";
import Link from "next/link";


export default function CreateAcc(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfrimPassword] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    // console.log(`username- ${userName} password-${password}, confirmpass-${confirmPassword}, email-${email}`)

    async function submit(){
        const res = await fetch("http://localhost:4000/createacc",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : userName,
                password : password,
                confirmpassword: confirmPassword,
                email:email
            }),
          });

          
          console.log(res.body)
          setStatus(res.status);
          
    }
    return(
        
        <>
        <div className=" text-3xl px-12 mb-4 font-bold">CREATE USER </div>
        <div className="px-12">
            <hr />
        </div>
        <div className=" grid justify-items-center w-full mt-12 ">
        <div className="border  border-[#161515] bg-[#161515] max-w-[600px]  min-w-[600px]    min-h-[500px] max-h-[500px]">
            <form className="mt-24  ml-24 mr-24 mb-4 ">
                <div className="">
                    <labal  >userName</labal>
                    <br/>
                    <input type="text" className=" outline-none  bg-[#161515] border-b-2 w-96" onChange={(e)=>(setUserName(e.target.value))}/>
                </div>
            {/* password */}
                <div className="mt-12 flex">
                    <div className="pr-1">
                        <labal>password</labal>
                        <br/>
                        <input type="text" className=" outline-none  bg-[#161515] border-b-2 w-48 " onChange={(e)=>(setPassword(e.target.value))}/> 
                    </div>
                    <div className="pl-1">
                        <labal>confirmpassword</labal>
                        <br/>
                        <input type="text" className=" outline-none  bg-[#161515] border-b-2 w-48 " onChange={(e)=>(setConfrimPassword(e.target.value))}/>
                    </div>       
                </div>

            {/* email */}
            <div className="mt-12">
                <labal  >Email</labal>
                <br/>
                <input type="email" className=" outline-none  bg-[#161515] border-b-2 w-96" onChange={(e)=>(setEmail(e.target.value))}/>
            </div>
            </form>

            <div className=" grid justify-items-center">
                <button className=" h-12 w-32  bg-[#EB0000]   " onClick={(e)=>submit()}> submit</button>
            </div>
            <div className="mt-2  grid justify-items-center ">
                <Link href="login" className=" text-s">Click here to login </Link>
            </div>
            <div>
                {status == 500 ? <P>internal server error</P> : status == 200 ? <p>user created</p> : status == 400 ? <p>email already exist</p>: null}
            </div>
                
            
        </div>
        </div>
        </>
    )
}