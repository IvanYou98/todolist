import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Selector from "../../components/Selector";
import {collection, getDocs, setDoc, doc} from "firebase/firestore";
import {db} from "../../firebase"
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {DueTypeContext} from "../../context/DueTypeContext";

const ReviewList = () => {
    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 250,
            renderCell: cell =>
                <h4>{cell.row.title}</h4>
            ,
            editable: false
        },
        {
            field: 'problemLink',
            headerName: 'Link to Problem',
            renderCell: cell =>
                <Button variant="contained" target="_blank" href={cell.row.problemLink}
                        style={{height: '25px', background: 'green'}}>Practice</Button>,
            width: 250,
            type: 'string',
        },
        {
            field: 'lastCompleteDate',
            headerName: 'Last Complete Date',
            type: 'date',
            width: 210,
        },
        {
            field: 'currentRound',
            headerName: 'Round',
            type: 'string',
        },
        {
            field: 'edit',
            headerName: 'Edit',
            renderCell: cell =>
                <Button variant="contained" href={"/edit?problemId=" + cell.row.id} style={{height: '25px'}}>Edit</Button>

        },
        {   field: 'complete',
            headerName: 'Complete',
            width: 120,
            renderCell: cell =>
                <Button variant="contained" onClick={e => handleComplete(cell.row)}
                        style={{height: '25px', background: 'orange', width: '120px'}}>Complete</Button>

        }
    ];

    const [data, setData] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {currentDueType} = useContext(DueTypeContext);
    const navigate = useNavigate();
    const handleComplete = async (problem) => {
        problem.currentRound = parseInt(problem.currentRound) + 1;
        problem.lastCompleteDate = new Date();
        await setDoc(doc(db, currentUser.uid, problem.id), problem);
        window.location.reload(false);
    }

    const handleCreate = e => {
        navigate('/create');
    }
    useEffect(() => {
        const period = [2, 4, 7];
        const fetchData = async () => {
            const uid = currentUser.uid;
            const querySnapshot = await getDocs(collection(db, uid));
            let list = [];
            const today = new Date();
            querySnapshot.forEach((doc) => {
                let problem = doc.data();
                problem.id = doc.id;
                problem.lastCompleteDate = new Date(problem.lastCompleteDate.seconds * 1000);
                let dueDate = new Date(problem.lastCompleteDate);
                dueDate.setDate(problem.lastCompleteDate.getDate() + period[problem.currentRound - 1]);
                if (currentDueType === "all") {
                    list.push(problem);
                } else if (currentDueType === "today"
                    && today.getFullYear() === dueDate.getFullYear()
                    && today.getMonth() === dueDate.getMonth()
                    && today.getDate() === dueDate.getDate()) {
                    list.push(problem);
                } else if (currentDueType === "overDue" &&
                    (problem.currentRound !== 3) &&
                    (today.getFullYear() > dueDate.getFullYear() ||
                        today.getMonth() > dueDate.getMonth() ||
                        today.getDate() > dueDate.getDate())
                ) {
                    list.push(problem);
                }
            })
            setData(list);
        };
        fetchData();
    }, [currentDueType, currentUser.uid])


    return (
        <div style={{height: 700, width: '80%', marginTop: '50px'}}>
            <div className="createBtn">
                <Selector style={{float: 'left'}}/>
                <Button variant="contained" style={{float: 'right', marginTop: "10px"}}
                        onClick={handleCreate}>Create</Button>
            </div>
            <DataGrid
                rows={data}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default ReviewList;
