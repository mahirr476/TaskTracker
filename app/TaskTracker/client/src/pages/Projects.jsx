{/* 
Component details: 

1. Ability to create a project with team members
    1.1 a project can only be created if all team members have resource availability (max projects a person can take on is 5. if team members have less than 5 then they can be added to a new project)
    1.2 a project creation updates each individuals information to now hold access to that project ID and their # of projects should go up
2. Ability to view all projects currently active
3. Ability to expand project to view project details (opens ProjectDetails.jsx)



*/}

// Projects.jsx
import React, { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { projects as mockProjects } from '../assets/data'; // Import projects data

const Projects = () => {
    const [projects, setProjects] = useState(mockProjects);

    const handleViewMore = (projectId) => {
        // Implementation to view more details
        console.log("View details for:", projectId);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Add New Project
                    </Button>
                </Grid>
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <ProjectCard project={project} onViewMore={handleViewMore} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Projects;
