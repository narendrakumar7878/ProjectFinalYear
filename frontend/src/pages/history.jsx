import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Box,
    CardContent,
    CardActions,
    Button,
    Typography,
    IconButton,
    Snackbar,
    Alert,
    Container,
    Grid,
    CircularProgress,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
                setLoading(false);
            } catch (error) {
                setSnackbarMessage("Error fetching history!");
                setOpenSnackbar(true);
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <Container maxWidth="lg" sx={{ padding: 4 }}>
            {/* Home Icon */}
            <IconButton
                onClick={() => routeTo("/home")}
                sx={{
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    backgroundColor: '#1e88e5', // Solid background color
                    color: '#ffffff', // White icon color
                    borderRadius: '50%', // Circular shape
                    padding: '12px', // Larger click area
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Subtle shadow
                    '&:hover': {
                        backgroundColor: '#1565c0', // Darker shade on hover
                        transform: 'scale(1.1)', // Slightly enlarge on hover
                        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
                    },
                    transition: 'all 0.3s ease', // Smooth transition
                }}
            >
                <HomeIcon fontSize="medium" />
            </IconButton>

            {/* Snackbar for error */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Page Title */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    color: '#1e88e5', // Matching navbar color
                    textAlign: 'center',
                    marginBottom: 4,
                    marginTop: 4, // Added margin for better spacing
                }}
            >
                Meeting History
            </Typography>

            {/* Loading State */}
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '50vh',
                    }}
                >
                    <CircularProgress size={60} thickness={4} sx={{ color: '#1e88e5' }} />
                </Box>
            ) : (
                /* Meeting Cards */
                <Grid container spacing={3}>
                    {meetings.length !== 0 ? (
                        meetings.map((e, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <Card
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#1e88e5', // Matching navbar color
                                                marginBottom: 1,
                                            }}
                                        >
                                            Meeting Code: {e.meetingCode}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            Date: {formatDate(e.date)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => routeTo(`/${e.meetingCode}`)}
                                            sx={{
                                                color: '#1e88e5', // Matching navbar color
                                                fontWeight: '500',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(30, 136, 229, 0.1)',
                                                },
                                            }}
                                        >
                                            Join Again
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        /* No History Found */
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                minHeight: '50vh',
                            }}
                        >
                            <Typography variant="h6" color="text.secondary">
                                No history found.
                            </Typography>
                        </Box>
                    )}
                </Grid>
            )}
        </Container>
    );
}