import React, { useState } from 'react'
import './App.css'
import List from './List'

export default function App() {
  
  const [inputList,setInputList] = useState("");
  const [items,setItems] = useState([]);

  const itemEvent = (event)=>{
    setInputList(event.target.value);
  }
  
  const listOfItems = ()=>{
    if(inputList.length > 0){
      setItems((oldItems)=>{
        return [...oldItems,inputList];
      })
      setInputList("");
    }
  }
  
  const deleteItems = (id)=>{
    setItems((oldItems)=>{
      return oldItems.filter((ele,idx)=>{
        return idx !== id;
      })
    })
  }
  return (
    <>
      <div className='mainDiv'>
        <div className='centerDiv'>
           <br/>
           <h1>Note Taking App</h1>
           <br/>
           <input type='text' placeholder='Create New Note' 
            onChange={itemEvent}  value={inputList}/>
            
           <button className='btn btn-secondary mx-2 rounded-pill' onClick={listOfItems}>➕</button>
           <ol>
             {items.map((itemValue,index)=>{
              return <List itemVal={itemValue} key={index} id={index} onSelect={deleteItems}/>
             })}
           </ol>
        </div>
      </div>
    </>
  )
}
