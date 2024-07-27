import Link from "next/link";

export default function About(){
    return(
        <>
        <div className=" text-3xl px-12 mb-4 font-bold">ABOUT ME</div>
        <div className="px-12">
            <hr />
        </div>
        <div className="flex mt-24 mx-24 mb-12">
            <img src="/About.jpg" alt="no " width="500" height="600"/>
            <div className="w-[32rem] mx-auto mt-12 mr-24">
                <h1 className="text-6xl mb-4">Hi! I’m Jane</h1>
                <h2 className="text-2xl mb-12">I am a movie blogger</h2>
                <p className="text-justify">
                    I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.</p>
                <p className="text-justify mt-8">This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are. </p>
                <button className=" h-12 w-32  bg-[#EB0000] mt-12"><Link href="/">My Blog</Link></button>
            </div>
        </div>
        </>
    )
}