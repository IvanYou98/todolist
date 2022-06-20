import "./edit.scss";
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebase"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate, useSearchParams} from "react-router-dom";

const Edit = () => {
    const title = "Edit Problem";
    const [data, setData] = useState({title: "", problemLink: ""});
    let authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const uid = authContext.currentUser.uid;
    const inputs = [
        {
            id: "title",
            label: "Title",
            type: "text"
        },
        {
            id: "problemLink",
            label: "Problem Link",
            type: "text"
        },
        {
            id: "currentRound",
            label: "Current Review Round",
            type: "text"
        },
        {
            id: "lastCompleteDate",
            label: "Last Complete Date",
            type: "date"
        }
    ];
    const [searchParams, setSearchParams] = useSearchParams();
    const problemId = searchParams.get("problemId");
    const convertDateFormat = (date) => {
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const year = date.getFullYear();
        return year + "-" + month + "-" + day;
    }
    useEffect(() =>  {
        const fetchData = async () => {
            const docRef = doc(db, uid, problemId);
            const docSnap = await getDoc(docRef);
            let problem = docSnap.data();
            // problem.lastCompleteDate = convertDateFormat(new Date(problem.lastCompleteDate.seconds * 1000));
            problem.lastCompleteDate = convertDateFormat(new Date(problem.lastCompleteDate.seconds * 1000));
            console.log(problem);
            setData(problem);
        }
        fetchData();
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        data[e.target.id] = e.target.value;
        setData(data);
        console.log(data)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(data);
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
                                    <h4>{input.label}</h4>
                                    <input type={input.type} id={input.id}
                                           defaultValue={data[input.id]}
                                           onChange={e => handleChange(e)}/>
                                </div>
                            ))}
                            <button type="submit" onClick={e => handleSubmit(e)}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
