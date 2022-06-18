import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Selector from "../../components/Selector";

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
        type: 'link',
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
        type: 'digit',
        width: 100,
        editable: true
    }
];

const rows = [
];

const ReviewList = () => {
    return (
        <div style={{ height: 700, width: '80%' }}>
            <Selector/>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default ReviewList;
