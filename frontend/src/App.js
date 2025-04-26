import React, { useEffect } from 'react';
import Home from './pages/Home';
import Alltasks from './pages/Alltasks';
import Importanttasks from './pages/Importanttasks';
import Completedtasks from './pages/Completedtasks';
import Incompletetasks from './pages/Incompletetasks';
import { Routes,Route, useNavigate,useLocation } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useSelector,useDispatch } from "react-redux";
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
     if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
     }else if(isLoggedIn === false) {
      navigate("/signup");
     }
  }, []);//isLoggedIn,location.pathname,navigate
  return (
  <div className='bg-gray-900 text-white h-screen p-2 relative'>
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="/importanttasks" element={<Importanttasks />} />
          <Route path="/completedtasks" element={<Completedtasks />} />
          <Route path="/incompletetasks" element={<Incompletetasks />} />
        </Route>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
  </div>
  );
  
};
export default App;