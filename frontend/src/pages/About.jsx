import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { GitHub, Instagram, LinkedIn, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

// Dummy data for 5 members (updated with your content)
const teamMembers = [
    {
        id: 1,
        name: 'Narendra Kumar',
        role: 'Team Leader & Full Stack Developer',
        image: '/NB.png',
        description:
            'Narendra is the backbone of this project, handling both backend and frontend development. He has worked extensively on server-side logic, database management, API integration, WebRTC setup for video calls, real-time chat functionality, user authentication, and overall system architecture. From designing the logic to deploying the application, Narendra has ensured that the platform runs seamlessly.',
        socialMedia: {
            github: 'https://github.com/narendrakumar7878',
            instagram: 'https://www.instagram.com/n_b_parmar_6677/',
            linkedin: 'https://www.linkedin.com/in/narendrakumar-174116313/',
        },
    },
    {
        id: 2,
        name: 'Mahendra Kumar',
        role: 'Frontend Developer – Home Page',
        image: '/MR.jpg',
        description:
            'Mahendra focused on designing and developing the Home Page using React.js, Material-UI, and CSS. He worked on creating a visually appealing and user-friendly landing experience, making sure users get a great first impression of the platform.',
        socialMedia: {
            github: 'https://github.com/MahendraKumar9610',
            instagram: 'https://www.instagram.com/mahendra_rathore9610?igsh=MTIxN2Jjb3l0NDVvOA==',
            linkedin: 'https://www.linkedin.com/in/mahendra-kumar-55370a313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ',
        },
    },
    {
        id: 3,
        name: 'Lalit Kumar',
        role: 'Frontend Developer – Dashboard Page',
        image: '/LP.jpg',
        description:
            'Lalit developed the Dashboard Page, which users see after logging in. His work involved structuring the page layout and designing an intuitive interface, ensuring easy access to chat and video call functionalities.',
        socialMedia: {
            github: 'https://github.com/Lalpathbhai',
            instagram: 'https://www.instagram.com/lalit_prajapat001/',
            linkedin: 'https://www.linkedin.com/in/lalit-prajapat-64170b313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ',
        },
    },
    {
        id: 4,
        name: 'Lokesh Kumar',
        role: 'Frontend Developer – Login & Signup Pages',
        image: 'LK.jpg',
        description:
            'Lokesh was responsible for creating the Login and Signup Pages using React.js, Material-UI, and CSS. He ensured that users have a seamless and responsive experience while registering or logging into the platform.',
        socialMedia: {
            github: 'https://github.com/Lokesh-Darji',
            instagram: 'https://www.instagram.com/lokeshh29_?igsh=MTltYWg5cHhrYmZkbQ==',
            linkedin: 'https://www.linkedin.com/in/lokesh-darji-302666344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ',
        },
    },
    {
        id: 5,
        name: 'Parmeshwer Jangid',
        role: 'Frontend Developer – History Page',
        image: 'PJ.jpg',
        description:
            'Parmeshwer developed the History Page, which allows users to track their past calls and messages. His work focused on presenting the data in a clean and structured format, ensuring easy navigation and readability.',
        socialMedia: {
            github: 'https://github.com',
            instagram: 'https://instagram.com',
            linkedin: 'https://linkedin.com/in/',
        },
    },
];

// MemberCard Component
const MemberCard = ({ member, index }) => {
    const controls = useAnimation();
    const cardRef = React.useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start('visible');
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [controls]);

    const variants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
        hidden: { opacity: 0, y: 50 },
    };

    return (
        <motion.div
            ref={cardRef}
            initial="hidden"
            animate={controls}
            variants={variants}
            style={{
                display: 'flex',
                alignItems: 'center',
                margin: '80px 0',
                gap: '60px',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                padding: '20px',
                borderRadius: '20px',
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            }}
            className="member-section" // Added class for media queries
        >
            {/* Image Section */}
            <div
                style={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    maxWidth: '400px',
                    height: '300px',
                }}
                className="image-section" // Added class for media queries
            >
                <img
                    src={member.image}
                    alt={member.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                {/* Social Media Icons */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '10px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <IconButton
                        color="primary"
                        aria-label="GitHub"
                        onClick={() => window.open(member.socialMedia.github, '_blank')}
                    >
                        <GitHub />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="Instagram"
                        onClick={() => window.open(member.socialMedia.instagram, '_blank')}
                    >
                        <Instagram />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="LinkedIn"
                        onClick={() => window.open(member.socialMedia.linkedin, '_blank')}
                    >
                        <LinkedIn />
                    </IconButton>
                </div>
            </div>

            {/* Content Section */}
            <div style={{ flex: 2 }} className="content-section">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>{member.name}</h2>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#555' }}>{member.role}</h3>
                <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.8' }}>{member.description}</p>
            </div>
        </motion.div>
    );
};

// Main About Component
const About = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}
        >
            {/* Home Button */}
            <IconButton
                color="primary"
                aria-label="Home"
                onClick={() => navigate('/')}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000,
                    background: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '50%',
                    padding: '10px',
                }}
            >
                <Home style={{ fontSize: '2rem' }} />
            </IconButton>

            {/* About Us Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '80px', textAlign: 'center' }}
            >
                <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: '#333' }}>About Us</h1>
                <p style={{ fontSize: '1.4rem', color: '#555', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
                    Welcome to our Video Call and Chat Platform, a project developed for our college. Our team has worked
                    together to bring this idea to life, ensuring a smooth and engaging experience for users. Each team
                    member has contributed to different parts of the project, with a focus on both frontend and backend
                    development.
                </p>
            </motion.div>

            {/* Meet Our Team Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ marginBottom: '80px', textAlign: 'center' }}
            >
                <h2 style={{ fontSize: '3rem', marginBottom: '40px', color: '#333' }}>Meet Our Team</h2>
            </motion.div>

            {/* Team Members Section */}
            {teamMembers.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
            ))}
        </motion.div>
    );
};

export default About;

// Add this CSS for responsiveness
const styles = `
    @media (max-width: 768px) {
        .member-section {
            flex-direction: column !important;
            gap: 20px !important;
            margin: 40px 0 !important;
            padding: 15px !important;
        }

        .image-section {
            max-width: 100% !important;
            height: 250px !important;
        }

        .content-section h2 {
            font-size: 2rem !important;
        }

        .content-section h3 {
            font-size: 1.5rem !important;
        }

        .content-section p {
            font-size: 1rem !important;
        }

        .about-container h1 {
            font-size: 3rem !important;
        }

        .about-container p {
            font-size: 1.2rem !important;
        }
    }

    @media (max-width: 480px) {
        .member-section {
            margin: 20px 0 !important;
        }

        .image-section {
            height: 200px !important;
        }

        .content-section h2 {
            font-size: 1.8rem !important;
        }

        .content-section h3 {
            font-size: 1.3rem !important;
        }

        .content-section p {
            font-size: 0.9rem !important;
        }

        .about-container h1 {
            font-size: 2.5rem !important;
        }

        .about-container p {
            font-size: 1rem !important;
        }
    }
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);