import React, { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Box, Paper, Grid, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import mountain from "./images/mountain.jpeg";

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
        <Grid container height="100vh">
            <Grid
                item
                xs={6}
                style={{
                    backgroundImage: `url(${mountain})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    padding: "5vw 10vh",
                }}
            ></Grid>
            <Grid item xs={6} style={{ padding: "5vw 10vh" }}>
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-evenly"
                >
                    <Typography
                        variant="h2"
                        textAlign="left"
                        fontWeight="700"
                        lineHeight="4rem"
                    >
                        Experience nature <br></br>like you've never before
                    </Typography>
                    <Paper
                        sx={{
                            paddingX: "3rem",
                            paddingY: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            borderRadius: "28px",
                        }}
                        elevation={8}
                    >
                        <Typography
                            variant="h5"
                            textAlign="left"
                            fontWeight="700"
                        >
                            Book your escape today
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            textAlign="left"
                            fontWeight="400"
                            color="text.secondary"
                            marginBottom="1rem"
                            lineHeight="1.5rem"
                        >
                            You're just a few steps away from paradise on earth
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                // sx={{ height: "100px" }}
                                renderInput={(props) => (
                                    <TextField color="secondary" {...props} />
                                )}
                                label="Date"
                                value={date}
                                onChange={(newDate) => {
                                    setDate(newDate);
                                }}
                            />
                        </LocalizationProvider>
                        <TextField
                            id="outlined-basic"
                            label="Hours"
                            value={duration}
                            color="secondary"
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
                        <Button
                            variant="outlined"
                            endIcon={<ArrowForward />}
                            sx={{ height: "50px" }}
                            color="secondary"
                        >
                            Book now for only ${cost}
                        </Button>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    );
};

export default App;
