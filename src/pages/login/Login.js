import './login.scss';
import {useContext, useEffect, useState} from "react";
import {auth} from '../../firebase'
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {dispatch} = useContext(AuthContext);


    const handleLogin = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                dispatch({type: "LOGIN", payload: user});
                setError(false);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }
    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <h3>Make Your Review Plan</h3>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <span>Do not have account? <a href={'/register'}>Register</a> </span>
                {error && <span>Wrong email and password!</span>}
            </form>
        </div>
    )
}


export default Login;