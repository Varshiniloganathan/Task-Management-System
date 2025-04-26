import React,{useState} from "react";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
const InputData=({InputDiv,setInputDiv})=>{
    const [Data, setData ]= useState({title:"",desc:""});
    const headers = {
      id:  localStorage.getItem("id") ,
      authorization: `Bearer ${localStorage.getItem("token")}`,
  };
    const change = (e) => {
      const { name,value } = e.target;
      setData({...Data,[name]:value});
    };
    const submitData = async() => {
      if (Data.title === "" || Data.desc === "") {
        alert("All fields are required");
      } else {
        setData(prevData => ({
          ...prevData,
          title: Data.title,
          desc: Data.desc
        }));
    
        try {
          const response = await axios.post("http://localhost:2000/api/v2/create-task", Data, { headers });
          alert("Task created successfully");
          console.log("Response:", response.data); // Log response for debugging
          setData({ title: "", desc: "" }); // Clear the form after successful submission
          setInputDiv("hidden"); // Hide the input form
        } catch (error) {
          console.error("Error creating task:", error);
          alert("Failed to create task. Please try again.");
        }
      }

    };
    return (
    <>
       <div 
          className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
       ></div>
       <div 
          className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
        >
          <div className="w-2/6 bg-gray-900 p-4 rouded ">
            <div className="flex justify-end">
              <button className="text-2xl" onClick={()=>setInputDiv("hidden")}>
                <RxCrossCircled />
              </button>
            </div>
             <input 
               type="text" 
               placeholder="Title" 
               name="title" 
               className="px-3 py-2 rounded w-full bg-gray-700 my-3"
               value={Data.title}
               onChange={change}
             />
            <textarea 
              name="desc" 
              cols="30" 
              rows="10"  
              placeholder="Description"
              className="px-3 py-2 rounded w-full bg-gray-700 my-3"
              value={Data.desc}
              onChange={change}
            ></textarea>
            <button 
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
            onClick={submitData}
            >
              Submit 
            </button>
           </div>
        </div>

    </>
   );
    
  };
  export default InputData;
