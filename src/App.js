import { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import React from "react";

const App = () => {
    const [date, setDate] = useState(null);
    const [duration, setDuration] = useState(null);
    const [cost, setCost] = useState(0);
    useEffect(() => {
        let totalCost = 0; // 100 on weekdays, 150 on weekends
        let currentDate = new Date(date); // convert to JS Date object
        for (let hours = duration; hours > 0; hours--) {
            const day = currentDate.getDay(); // 0-6 for sunday-saturday
            if (day === 0 || day === 6) {
                totalCost += 150; // weekend
            } else {
                totalCost += 100; // weekday
            }
            currentDate.setHours(currentDate.getHours() + 1); // add 1 hour each time
        }
        setCost(totalCost);
    }, [date, duration]);
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
                        // max 9999 hours ~ 416 days
                        // using Math.min forces 0 in the input even when input is empty, not good
                        if (newDuration.target.value > 9999) {
                            setDuration(9999);
                        } else {
                            setDuration(newDuration.target.value);
                        }
                    }}
                    variant="outlined"
                    type="number"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Date and Time"
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                        }}
                    />
                </LocalizationProvider>
            </Box>
        </Box>
    );
};

export default App;
