import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Selector from "../../components/Selector";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase"
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const columns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
        editable: true,
    },
    {
        field: 'problemLink',
        headerName: 'Link to Problem',
        width: 450,
        type: 'string',
        editable: true,
    },
    {
        field: 'lastCompleteDate',
        headerName: 'Last Complete Date',
        type: 'date',
        width: 210,
        editable: true,
    },
    {
        field: 'currentRound',
        headerName: 'Round',
        type: 'string',
        width: 100,
        editable: true
    }
];

const ReviewList = () => {
    const [data, setData] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleCreate = e => {
        navigate('/create');
    }
    useEffect( () => {
        const fetchData =  async () => {
            const uid = currentUser.uid;
            const querySnapshot = await getDocs(collection(db, uid));
            let list = [];
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            })
            setData(list);
            console.log(data);
        };
        fetchData();
    }, [])
    return (
        <div style={{ height: 700, width: '80%', marginTop: '50px'}}>
            <div className="createBtn">
                <Selector style={{float: 'left'}} />
                <Button variant="contained" style={{float: 'right', marginTop: "10px"}} onClick={handleCreate}>Create</Button>
            </div>
            <DataGrid
                getRowId={(r) => r.problemLink}
                rows={data}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default ReviewList;
