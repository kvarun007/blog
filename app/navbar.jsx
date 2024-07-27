import Link from "next/link";



export default function Navbar(){
    return (
        <>
        <div className="border border-black h-24  w-full">
        <div className=" float-right my-12 mr-6 ">
            <Link href="/" className="pr-8 text-2xl">My Blog</Link>
            <Link href="about" className="pr-8 text-2xl">About</Link>
            <Link href="contact" className="pr-8 text-2xl">Contact</Link>
            <Link href="login" className="pr-8 text-2xl">Login</Link>
        </div>
        </div>
        
        </>
    )
}