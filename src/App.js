import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import Topbar from "./scenes/Topbar";
import './App.css';
import { Routes ,Route} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Form from "./components/Form";
import UpdateForm from "./components/UpdateForm";
import Course from "./components/Course";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  

  const user= useSelector((state)=>state.user.currentUser) || null;
 return (
    <ColorModeContext.Provider value={colorMode}>
      
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
         {user ?  <Sidebar isSidebar={isSidebar} />: <></> }  
          <main className="content">
          {user ?  <Topbar setIsSidebar={setIsSidebar} /> : <></> } 
          
          <Routes>
         
            {user ? <> <Route path="/" element={<Course />} />
    <Route path="/course" element={user?<Course />:<Register />} />
    <Route path="/form" element={<Form />} />
    <Route path="/form/:id" element={<UpdateForm />} />
    <Route path="/form" element={<Form />} /> 
  
    </> : <> 
   
    <Route path="/login" element={ <Login/>} />
    <Route path="" element={<Register />} />
  </>}
   
   
  </Routes>
           
            </main>
        </div>

        </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
