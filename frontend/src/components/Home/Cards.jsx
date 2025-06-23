import React from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const Cards=({home,setInputDiv,data,setData,setUpdatedData })=> {
  const headers = {
    id:  localStorage.getItem("id") ,
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
  const handleCompleteTask = async (id) => {
    try {
       await axios.put(
      `http://localhost:2000/api/v2/update-complete-tasks/${id}`,
      {},
      { headers }
    );
    // Optimistically update the task's complete status in state
    setData((prevData) =>
      prevData.map((task) =>
        task._id === id ? { ...task, complete: !task.complete } : task
      )
    );
    alert("Task completion status updated!");
    //alert(response.data.message);
    } catch(error) {
      alert("Failed to update task status.");
      console.log(error);
    }
  };
  const handleImportant = async (id) => {
    try {
      const response =  await axios.put(
      `http://localhost:2000/api/v2/update-imp-tasks/${id}`,
      {},
      { headers }
    );
    // Optimistically update the task's important status in state
    setData((prevData) =>
      prevData.map((task) =>
        task._id === id ? { ...task, important: !task.important } : task
      )
    );
    alert("Task importance status updated!");
    // alert(response.data.message);
    } catch(error) {
      alert("Failed to update task importance.");
      console.log(error);
    }
  };
  const handleUpdate = (id,title,desc) => {
    setInputDiv("fixed");
    setUpdatedData({id:id, title:title,desc:desc});
  }
  const deleteTask = async (id) => {
    try {
      const response =  await axios.delete(
      `http://localhost:2000/api/v2/delete-tasks/${id}`,
      //{},
      { headers }
      
    );
    console.log(response.data.message);
    // Update the state to remove the deleted task
    setData((prevData) => prevData.filter((task) => task._id !== id));
    console.log(response.data.message);
    } catch(error) {
      console.log(error);
    }
  };
   return(
    <div className="grid grid-cols-3 gap-4 p-4">
      {data && 
        data.map((items, i)=> (
            <div className="flex flex-col justify-between bg-gray-800 rounded p-4">
          <div >
            <h3 className="text-xl font-semibold">{items.title}</h3>  
            <p className="text-gray-300 my-2">{items.desc}</p> 
            
        </div>
        <div className="mt-4 w-full flex items-center">
           <button 
             className={` ${
                 items.complete === false ? "bg-red-400" : "bg-green-700" } p-2 rounded w-3/6`}
              onClick = {()=>handleCompleteTask(items._id)}

            >
              {items.complete === true ? "Completed" : "Incompleted"}
            </button>
           <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
            <button onClick={()=>handleImportant(items._id)}>
              {items.important === false ? (<CiHeart />) : (<FaHeart className="text-red-500"/>) }
              
            </button>
            {home !== "false" && <button onClick={()=>handleUpdate(items._id)}><FaEdit /></button>} 
            <button onClick={()=> deleteTask(items._id)}><MdDeleteSweep />
            </button>
          </div>
        </div>
        </div>
        ))}
      {home === "true" &&  (
        <button 
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300" 
          onClick={()=>setInputDiv("fixed")}>
         <IoMdAddCircle className="text-5xl" />
        <h2 className="text-2xl mt-4">Add Task</h2>
        </button>)}
      
    </div>
  );
};
export default Cards;