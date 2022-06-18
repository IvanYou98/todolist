import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Selector = () => {
    const [isToday, setIsToday] = React.useState(false);

    const handleChange = (event) => {
        setIsToday(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Due Type</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value= {isToday}
                label="dueType"
                onChange={handleChange}
            >
                <MenuItem value={true}>Today</MenuItem>
                <MenuItem value={false}>Overdue</MenuItem>
            </Select>
        </FormControl>
    );
}

export default Selector;