{/* 
Component details: 

1. Ability to create a project with team members
    1.1 a project can only be created if all team members have resource availability (max projects a person can take on is 5. if team members have less than 5 then they can be added to a new project)
    1.2 a project creation updates each individuals information to now hold access to that project ID and their # of projects should go up
2. Ability to view all projects currently active
3. Ability to expand project to view project details (opens ProjectDetails.jsx)


1. proj numb
proj name
value of project (how much money, how much time, some calculation )
description


*/}

// Projects.jsx
import React, { useState } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { projects as mockProjects } from '../assets/data'; // Import projects data
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const [projects, setProjects] = useState(mockProjects);
    const navigate = useNavigate();

    const handleViewMore = (projectId) => {
        // Implementation to view more details
        navigate(`/projects/${projectId}`)
    };
    return (
        <Container>
                  <div className="mb-3">
        <Typography variant="h4" component="h1" ><div className='font-bold mb-5'>My Projects</div></Typography>
      </div>
            <Grid container spacing={2}>
                
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.pid}>
                        <ProjectCard project={project} onViewMore={handleViewMore} />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Add New Project
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Projects;
