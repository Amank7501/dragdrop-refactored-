import React, { useState } from 'react'
import { data } from './data'
import Card from './Card';


const Test = () => {
    const jsonData = data;
    console.log(jsonData);
    
  return (
    <div className='row w-100  d-flex gap-4 justify-content-around mt-4'>
        {jsonData.map((item,i)=>{
            // setCount((prev)=> prev-1);
            return <div className='col-3 border'>
                
               {<Card  title={item.title} description={item.description} id={i}/>}
            </div>
        })}
       
        

    </div>
  )
}

export default Test