import React, { useEffect, useState } from 'react'

const Test2 = () => {
    const [data,setData] = useState(0);

    // var myArr = [];
    const [myArr,setMyArr] = useState([])
    const handleClick =() =>{
        
        if(data>=0){
            // myArr.push(data);
            setMyArr(prev =>[...prev,data])
            console.log("object",data);

        }
        else{
            var ele = -1 * data;
            console.log("ele",ele);
            const removeIndex = myArr.indexOf(`${ele}`);
            console.log("index to remove", removeIndex);
            if(removeIndex>-1){
                myArr.splice(removeIndex,1);
            }

        }
    }

    const handleChange = (e) => {
        myArr.sort();
        setData(e.target.value)
        console.log('changed');

    }

    useEffect(()=>{
        console.log("Data",data);
        console.log("My arr",myArr);
    },[myArr])



    
  return (
    <div>
        <input type="number" name='myinput' onChange={handleChange}/>
        <button onClick={handleClick}> Submit</button>

        <div>
            {myArr.map((num,i)=>{
                return <div>{num}</div>
            })}
        </div>


    </div>
  )
}

export default Test2