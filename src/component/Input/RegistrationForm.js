import React, { useEffect, useState } from "react";
import {Box,Typography,Card,CardContent,Button,TextField,Grid, Snackbar, Alert, CircularProgress} from "@mui/material";
import { useDispatch } from "react-redux";
import { addCustomer, getCustomer } from "../../actions/customer";
import SendIcon from "@mui/icons-material/Send";

const RegistrationForm = ({setOpen,setMessage}) => {

    const dispatch = useDispatch();
    //const [open, setOpen] = useState(false)
    //const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")

    const [accountNumber, setAccountNumber] = useState("");
    const [customerLastname, setCustomerLastname] = useState("");
    const [customerFirstname, setCustomerFirstname] = useState("");
    const [customerMiddlename, setCustomerMiddlename] = useState("");
    const [meterNumber, setMeterNumber] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [installationDate, setInstallationDate] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false);

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        // Function to update online status
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
            if (!navigator.onLine) {
                setMessage("You are not connected to the network.");
                setSeverity("error");
                setOpen(true);
            }
        };
    
        // Check on mount
        updateOnlineStatus();
    
        // Listen for online/offline events
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);
    
        return () => {
            // Cleanup event listeners
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, [customerFirstname]);

    const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
      return emailRegex.test(value);
    };
  
    const handleEmailChange = (e) => {
      const value = e.target.value;
      setEmail(value);
      setError(!validateEmail(value));
    };

    const handleSnackbar = () => {
        setOpen(false)
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!navigator.onLine) {
            setMessage("You are not connected to the network.");
            setSeverity("error");
            setOpen(true);
            return;
        }

        if (!accountNumber || !customerFirstname || !customerMiddlename || !contactNumber || !meterNumber || !address || !installationDate || !email) {
            setMessage("All fields must be filled out.")
            setSeverity("warning")
            setOpen(true)
            return;
        }
        try{
            setLoading(true)
            const result = await dispatch(addCustomer(accountNumber, customerFirstname, customerMiddlename, customerLastname, contactNumber, meterNumber, address, installationDate,email));
            const msg = result.message
            const isTrue = result.status
            if(isTrue){
                setLoading(false)
                setMessage(msg)
                setSeverity("success")
                setOpen(true)
                // setUpdate(true)
                // setOpenAddNew(false)
                return;
            }
            else{
                setLoading(false)
                setMessage(msg)
                setSeverity("error")
                setOpen(true)
                return;
            }
        }
        catch(error){
            console.log(error)
        }
    };

    return (
        <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",minWidth: "100%",backgroundColor: "transparent",padding: 1,}}>
            {/* <Snackbar sx={{ display: { xs: 'none', md: 'block' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={open} autoHideDuration={4000} onClose={handleSnackbar} >
                <Alert onClose={handleSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar sx={{ display: { xs: 'block', md: 'none' } }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={handleSnackbar} >
                <Alert onClose={handleSnackbar} severity={severity}>
                  {message}
                </Alert>
            </Snackbar> */}
            <Card sx={{
                p: 2,
                borderRadius: 2,
                borderWidth: '4px',
                background: "rgba(39, 141, 58, 0.15)",
                backdropFilter: "blur(10px)",
                color: "white"}}
                >
                <CardContent>
                    <Typography variant="h5" component="div" fontWeight="bold" textAlign="center" marginBottom={3} color={"white"}>
                        Customer Form
                    </Typography>
                    <Grid container rowGap={1}>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography>Account Number:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography>Last Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={customerLastname}
                                onChange={(e) => setCustomerLastname(e.target.value)}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography>First Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={customerFirstname}
                                onChange={(e) => setCustomerFirstname(e.target.value)}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                        <Typography>Middle Name:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={customerMiddlename}
                                onChange={(e) => setCustomerMiddlename(e.target.value)}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                        <Typography>Email Address:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type="email"
                                value={email}
                                error={error}
                                helperText={error ? "Please enter a valid email address" : ""}
                                onChange={handleEmailChange}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography>Meter Number:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={meterNumber}
                                onChange={(e) => setMeterNumber(e.target.value)}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography>Installation Date:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type="date"
                                value={installationDate}
                                onChange={(e) => setInstallationDate(e.target.value)}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography>Contact Number:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} sx={{display:'flex', flexDirection:'column'}}>
                            <Typography>Address:</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                InputProps={{style:{color:'white'}}}
                            />
                        </Grid>
                    </Grid>
                    {/* Save Button */}
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                padding: "10px 20px",
                                textTransform: "none",
                                fontWeight: "bold",
                            }}
                            onClick={handleSubmit}
                            startIcon={
                                loading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    <SendIcon />
                                )
                            }
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegistrationForm;
