import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ReviewList from "./pages/reviewList/ReviewList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ReviewList/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App
