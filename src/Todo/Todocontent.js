import React, { useEffect, useState } from 'react'
import './Todocontent.css'

function Tcontent() {
  const [allTodos,setallTodos] = useState([])
  const [title,settitle] = useState('');
  const [description,setdescription] = useState('');
  const [completearr,setcompletearr] = useState([]);
  const [isCompletedScreen,setIsCompleteScreen] = useState('')

  const handelClick=()=>{
    let newTodoItem = {
      newtitle : title,
    newdescription : description
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setallTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handeldelete =(index) => {
    let deletetolist = [...allTodos];
    deletetolist.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(deletetolist));
    setallTodos(deletetolist);
  }

  

  const handelcomplete = (index) =>{
  
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ms = now.getMilliseconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + "-" + h + " " +  m +" "+ s + " " + ms + " ";
    
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }
    let completetodos = [...completearr];
    
    completetodos.push(filteredItem);
    localStorage.setItem('compltodolist',JSON.stringify(completetodos));
    setcompletearr(completetodos);

  }


  const handelcomdelete =(index) => {
    let deletetoclist = [...completearr];
    deletetoclist.splice(index,1);
    localStorage.setItem('completedtodolist',JSON.stringify(deletetoclist));
    setcompletearr(deletetoclist);
  }

  // local storage 
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodo){
      setallTodos(savedTodo);
    }
    let completodo = JSON.parse(localStorage.getItem('complettodolist'));
    if(completodo){
      setcompletearr(completodo);
    }
  })
  return (<>
  
  <div className="heading">Your ===>>> TO-DO</div>
    <div className="todocontent1">
        <div className="titlecontent">
        <p>Title:</p>
        <input type="text" value={title} onChange={(e)=>settitle(e.target.value)} placeholder="what's the title of your TO-Do?"></input>
        </div>
        {/* {title} */}
        <div className="desccontent">
        <p>Description:</p>
        <input type="text" value={description} onChange={(e)=>setdescription(e.target.value)} placeholder="what's the description of your TO-Do?"></input>
        </div>
        <div className="addbtn">
            <button type="submit" onClick={handelClick}> Add</button>
        </div>
    </div>

    
    <div className="finalcontent">
    <div className="todobtn">
      <button className={`secondaryBtn ${isCompletedScreen == false && 'active'}`}
      onClick={()=> setIsCompleteScreen(false)}
      type="submit"> To Do</button>
    </div>
    <div className="completebtn">
            <button className={`secondaryBtn ${isCompletedScreen == false && 'active'}`}
            onClick={()=>setIsCompleteScreen(true)}
      type="submit" onChange={completearr}>Completed</button>
    </div>
    </div>

    <div className="todo-list">
     {isCompletedScreen==false && allTodos.map((item,index)=>{
      return (
        <div className="todo-listitem">
        <h1>{item.newtitle}</h1>
        <p>{item.newdescription}</p>
        <div className='delcombtm'>
        <div className='delbtn' onClick={()=>handeldelete(index)}>del</div>
        <div className='compbtn' onClick={()=>handelcomplete(index)}>Com</div>

        </div>
      </div>
      )
     })}
     {isCompletedScreen==true && completearr.map((item,index)=>{
      return (
        <div className="todo-listitem">
        <h1>{item.newtitle}</h1>
        <p>{item.newdescription}</p>
        <p>completed On : {item.completedOn}</p>
        <div className='delcombtm'>
        <div className='delbtn' onClick={()=>handelcomdelete(index)} >del</div>
        

        </div>
      </div>
      )
     })}
      
    </div>
  </>
    
  )
}

export default Tcontent;