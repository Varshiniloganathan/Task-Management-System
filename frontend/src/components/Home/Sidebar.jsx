import React from "react";
import { CgNotes } from "react-icons/cg";
import { MdOutlineNotes } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useEffect,useState } from "react";
import axios from "axios";
const Sidebar=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data=[
        {
            title:"All tasks",
            icon: <CgNotes />,
            link: "/"
        },
        {
            title:"Important tasks",
            icon: <MdOutlineNotes />,
            link: "/importanttasks",
        },
        {
            title:"Completed tasks",
            icon: <FaNoteSticky />,
            link: "/completedtasks",
        },
        {
            title:"Incompleted tasks",
            icon: <MdOutlineSpeakerNotesOff />,
            link: "/incompletetasks",
        },

    ];
    const [Data, setData] = useState();
    const logout = () => {
        
        localStorage.clear("id");
        localStorage.clear("token");
        dispatch(authActions.logout());
        navigate("/signup");
    };
    const headers = {
        id:  localStorage.getItem("id") ,
        authorization: `Bearer ${ localStorage.getItem("token")}`,
    };
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
              "http://localhost:2000/api/v2/get-all-tasks",
              {
                headers,
              }
            );
            setData(response.data.data);
        };
        fetch();

    },[]);
  return(
<>
     {Data && (
        <div>
            <h2 className="text-xl font-semibold">{Data.username}</h2>
            <h4 className="mb-1 text-gray-400">{Data.email}</h4>
            <hr />
        </div>
     )}
        <div>
    
            {data.map((items, i) => (
                <Link 
                  to={items.link}
                  key={i}
                   className="my-2 flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300 ">
                    {items.icon} {items.title}
                </Link>
            ))}
        </div>
        <div>
            <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
                Log Out
            </button>
        </div>
</>
   );
};
export default Sidebar;