import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";
import './App.css';
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoutes/>}>
          <Route index
            element={<Login />}>
          </Route>
          <Route path="/register" element={<Register />}>
        
          

          </Route>
        </Route>

        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
         
          
        </Route>

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;