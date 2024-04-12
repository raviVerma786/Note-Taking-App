import React from 'react'

export default function List(props) {

  return (
    <>
    <div className='todo_style'>
        <i className='fa fa-times' aria-hidden="true" onClick={()=>{
          return props.onSelect();
        }}/>
        <div id = "note">{props.itemVal}</div>
    </div>
    </>
  );
}
