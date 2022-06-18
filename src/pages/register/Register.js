import './register.scss';
import {useState} from "react";
import {auth} from '../../firebase'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleRegister = e => {
        e.preventDefault();
        if (password1 !== password2) {
            setErrorMessage("passwords do not match!");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password1)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setErrorMessage(null);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Email has already been registered!");
            });
    }
    return (
        <div className="login">
            <form onSubmit={handleRegister}>
                <h3>Make Your Review Plan</h3>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password1}
                       onChange={e => setPassword1(e.target.value)}/>
                <input type="password" placeholder="confirm password" value={password2}
                       onChange={e => setPassword2(e.target.value)}/>
                <button type="submit">Register</button>
                {errorMessage && <span>{errorMessage}</span>}
            </form>
        </div>
    )
}


export default Register;