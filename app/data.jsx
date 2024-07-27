


async function  dataFecth(){
    
    const  response = await fetch("http://localhost:4000/", { cache: 'no-store' });
    if(!response.ok){
        throw new Error ("failed to fetch the data")
    }
    return response.json();
  }

export default async function Data(){
    
    const result = await dataFecth();
    // console.log(result[0].cont)
    

    // console.log(result)
    return(
        <>
        {/* {JSON.stringify(result)} */}
        {result.map(item=>(<div key={item.id}><p>{item.cont}</p></div>))}
        </>
    )
}