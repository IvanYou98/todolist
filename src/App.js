import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ReviewList from "./pages/reviewList/ReviewList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Create from "./pages/create/Create";

function App() {

    const {currentUser} = useContext(AuthContext);
    const RequireAuth = ({children}) => {
        return currentUser ? children : <Navigate to={"/login/"}/>;
    }
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RequireAuth><ReviewList/></RequireAuth>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/create' element={<Create/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
