import "./create.scss";
import {collection, doc, addDoc} from "firebase/firestore";
import {db} from "../../firebase"
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Create = () => {
    const title = "New Problem"
    let data = {};
    let authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const uid = authContext.currentUser.uid;
    const inputs = [
        {
            id: "title",
            label: "Title",
            type: "text",
            placeholder: "twoSum",
        },
        {
            id: "problemLink",
            label: "Problem Link",
            type: "text",
            placeholder: "www.leetcode.com/twoSum",
        }
    ];

    const handleChange = (e) => {
        e.preventDefault();
        data[e.target.id] = e.target.value;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        data.isFinished = true;
        data.currentRound = 1;
        data.lastCompleteDate = new Date();
        console.log(data);
        await addDoc(collection(db, uid), data);
        navigate("/");
    }

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <div style={{width: "300px", textAlign: "center"}}>
                        <h1>{title}</h1>
                    </div>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} id={input.id} placeholder={input.placeholder}
                                           onChange={e => handleChange(e)}/>
                                </div>
                            ))}
                            <button type="submit" onClick={e => handleSubmit(e)}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
