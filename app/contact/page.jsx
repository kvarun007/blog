"use client"

import react,{useState} from "react";
// import { useState } from "react/cjs/react.development";
export default function Contact(){
    const [firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[comment,setComment] = useState("");
    const[upload,setUpload] = useState(null);

    async function submit(){
        if(firstName != "" && lastName != "" && email != "" && comment != ""){
            const response = await fetch(`http://localhost:4000/comment?firstnames=${firstName}&lastnames=${lastName}&emails=${email}&comments=${comment}`)
            if(!response.ok){
                throw new Error ("failed to add comments ")
            }else{
                //console.log("doooooooooo")
            setUpload("done")
            return 
            }
        }else{
            setUpload("Invaild data")
        }
        
        
    }
    return(
        <>
        <div className=" text-3xl px-12 mb-4 font-bold">Contact</div>
        <div className="px-12">
            <hr />
        </div>
        <div className="flex pt-12 px-12 w-full">
            <div className="border border-[#EB0000] bg-[#EB0000] font-bold min-w-64 max-w-[500px] h-[32rem] text-center px-4 text-4xl py-40 float-left">HAVE I MISSED ANYTHING GOOD LATELY?
            LET ME KNOW
            </div>
            <div className="border  border-[#161515] bg-[#161515] max-w-[800px]  min-w-[800px] ml-12  float-right">
                <form className="mt-12 mb-8 ml-24 mr-24">
                    <div className="flex">
                        <div className="flex-1">
                            <labal>First Name</labal>
                            <br/>
                            <input type="text" className=" outline-none  bg-[#161515] border-b-2 w-64" onChange={(e)=>(setFirstName(e.target.value))}/>
                        </div>
                        <div className="flex-1">
                            <labal>Last Name</labal>
                            <br/>
                            <input type="text" className=" outline-none  bg-[#161515] border-b-2 w-64" onChange={(e)=>(setLastName(e.target.value))}/>
                        </div>
                    </div>
                    <div className="mt-12">
                        <label>Email</label>
                        <br/>
                        <input type="email"  className=" outline-none  bg-[#161515] border-b-2 w-[35rem] " onChange={(e)=>(setEmail(e.target.value))}/>
                        <br/>
                        <div className="mt-12">
                            <label>Leave us a message...</label>
                            <br/>
                            <textarea type="text" cols="10" rows="3" className=" outline-none  bg-[#161515] border-b-2  w-[35rem] h-24 " onChange={(e)=>(setComment(e.target.value))}></textarea>
                        </div>
                        
                    </div>
                    
                </form>
                <button className=" h-12 w-32  bg-[#EB0000]  ml-24 " onClick={(e)=>submit()}> submit</button>
                <div className=" ml-24 mt-4">
                {/* {upload != null ? <p className="text-[#04AA6D]">Thanks for the submittion</p> :null} */}
                {upload != null ? upload != "done" ? <p className = "text-[#FF0000]">Please fill all the fields </p>: <p className="text-[#04AA6D]">Thanks for the submittion</p> :null}
                </div>
                
            </div>
        </div> 
        </>
    )
}