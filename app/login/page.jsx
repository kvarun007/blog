"use client"

import react,{useState} from "react";
import Link from "next/link";


export default function Login(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    console.log(userName,password)

    async function submit(){
        const res = await fetch("http://localhost:4000/login",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : userName,
                password : password,
                
            }),
        })
        const result =  res.status;
        setStatus(res.status);

    }
    return (
        <>
        <div className=" text-3xl px-12 mb-4 font-bold">LOGIN</div>
        <div className="px-12">
            <hr />
        </div>
        <div className=" grid justify-items-center w-full mt-12 ">
        <div className="border  border-[#161515] bg-[#161515] max-w-[600px]  min-w-[600px] ml-12   min-h-[400px]">
            <form className="mt-24 mb-2 ml-24 mr-24">
                <div>
                    <labal>userName</labal>
                    <br/>
                    <input type="text" className=" outline-none  bg-[#161515] border-b-2 w-96" onChange={(e)=>(setUserName(e.target.value))}/>
                </div>

                <div className="mt-12">
                    <labal>password</labal>
                    <br/>
                    <input type="text" className=" outline-none  bg-[#161515] border-b-2 w-96 " onChange={(e)=>(setPassword(e.target.value))}/>
                </div>
            </form>
                <div className=" grid justify-items-center">
                    <button className=" h-12 w-32  bg-[#EB0000]   mt-6" onClick={(e)=>submit()}> login</button>
                </div>
                <div className="mt-2  grid justify-items-center ">
                    <Link href="createacc" className=" text-s">Click here to create a new acc </Link>
                </div>
                {status == "" ? null : status == 400 ? <p>Invaild user name and password</p> : status == 200? <p>login success</p> : null}
                
            
        </div>
        </div>
        
        
        </>
    )
}