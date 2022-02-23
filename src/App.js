import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import React from "react";

const App = () => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [cost, setCost] = useState(0);
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            paddingY="10vh"
            paddingX="10vw"
        >
            <Typography variant="h1" textAlign="center">
                Book your next escape
            </Typography>
            <Typography variant="h3" textAlign="center">
                for just ${cost}
            </Typography>
            <Box marginY="5rem">
                <TextField
                    id="outlined-basic"
                    label="Number of Hours"
                    value={duration}
                    onChange={(newDuration) => {
                        setDuration(newDuration.target.value);
                    }}
                    variant="outlined"
                    type="number"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date of Booking"
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                            console.log(date);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="Time of Booking"
                        value={time}
                        onChange={(newTime) => {
                            setTime(newTime);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
        </Box>
    );
};

export default App;
