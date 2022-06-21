import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useContext} from "react";
import {DueTypeContext} from "../context/DueTypeContext";

const Selector = () => {
    const {currentDueType, dispatch} = useContext(DueTypeContext);

    const handleChange = async (event) => {
        await dispatch({type: "CHANGE", payload: event.target.value});
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Due Type</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value= {currentDueType}
                label="dueType"
                onChange={handleChange}
            >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"today"}>Today</MenuItem>
                <MenuItem value={"overDue"}>Overdue</MenuItem>
            </Select>
        </FormControl>
    );
}

export default Selector;