import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Box, Typography, Container, AppBar, Toolbar } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <>
            {/* Navbar */}
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#1e88e5', // Updated primary color
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
                }}
            >
                <Toolbar>
                    {/* Home Icon */}
                    <IconButton
                        color="inherit"
                        onClick={() => navigate("/")} // Redirect to home page
                        sx={{
                            marginRight: 2, // Spacing between icon and title
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Hover effect
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Hover shadow
                            },
                            transition: 'all 0.3s ease', // Smooth transition
                        }}
                    >
                        <HomeIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            color: '#ffffff', // White text for contrast
                        }}
                    >
                        Apna Video Call
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* History Button */}
                        <Button
                            color="inherit"
                            onClick={() => navigate("/history")}
                            startIcon={<RestoreIcon />}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
                                color: '#ffffff', // White text
                                fontWeight: '500', // Medium font weight
                                padding: '8px 16px', // Padding for better click area
                                borderRadius: '4px', // Rounded corners
                                textTransform: 'none', // Prevents uppercase transformation
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Hover effect
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Hover shadow
                                },
                                transition: 'all 0.3s ease', // Smooth transition
                            }}
                        >
                            History
                        </Button>

                        {/* Logout Button */}
                        <Button
                            color="inherit"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/auth");
                            }}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
                                color: '#ffffff', // White text
                                fontWeight: '500', // Medium font weight
                                padding: '8px 16px', // Padding for better click area
                                borderRadius: '4px', // Rounded corners
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Hover effect
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Hover shadow
                                },
                                transition: 'all 0.3s ease', // Smooth transition
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '80vh',
                    padding: 4,
                }}
            >
                {/* Left Panel */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: { xs: 'center', md: 'left' },
                        marginBottom: { xs: 4, md: 0 },
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1e88e5', // Matching navbar color
                            marginBottom: 3,
                        }}
                    >
                        Providing Quality Video Call Just Like Quality Education
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            fullWidth
                            onChange={(e) => setMeetingCode(e.target.value)}
                            id="outlined-basic"
                            label="Meeting Code"
                            variant="outlined"
                            sx={{ maxWidth: '400px' }}
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#1e88e5', // Matching navbar color
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#1565c0', // Darker shade on hover
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Hover shadow
                                },
                                transition: 'all 0.3s ease', // Smooth transition
                            }}
                        >
                            Join
                        </Button>
                    </Box>
                </Box>

                {/* Right Panel */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        srcSet="/logo3.png"
                        alt="Apna Video Call"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </Box>
            </Container>
        </>
    );
}

export default withAuth(HomeComponent);