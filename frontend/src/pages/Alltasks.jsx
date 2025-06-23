import React from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';
import { IoMdAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import { useState,useEffect } from 'react';

const Alltasks=()=>{
  const [InputDiv, setInputDiv]=useState("hidden");
  const [Data, setData] = useState();
  const [updatedData, setUpdatedData] = useState({});
  const headers = {
    id:  localStorage.getItem("id") ,
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
  useEffect(() => {
    const fetch = async () => {
      try{
        const response = await axios.get(
          "http://localhost:2000/api/v2/get-all-tasks",
          {
            headers,
          }
        );
        if (response.data && response.data.data && Array.isArray(response.data.data.tasks)) {
          setData(response.data.data.tasks);
        } else {
          console.error('Expected an array of tasks:', response.data);
          setData([]);
       }
        
      } catch (error) {
       console.error('Error fetching tasks:', error);
        setData([]);
     }
   };
    fetch();
 },[]);
  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2 '>
          <button onClick={()=>setInputDiv("fixed")}>
            <IoMdAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300"/>
          </button>
      </div>
      {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data} setData={setData}
      setUpdatedData={setUpdatedData} />}
    </div>
    <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} />
    </>
 );
  
};
export default Alltasks;