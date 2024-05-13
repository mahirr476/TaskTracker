// Projects.jsx
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { projects as mockProjects } from '../assets/data'; // Import projects data
import { useNavigate } from 'react-router-dom';
// import { IoAddCircle } from "react-icons/io5";
import Title from '../components/Title';

const Projects = () => {
    const [projects, setProjects] = useState(mockProjects);
    const navigate = useNavigate();

    const handleViewMore = (projectId) => {
        // Implementation to view more details
        navigate(`/projects/${projectId}`)
    };
    return (
        <div className='w-full md:px-1 px-0 my-6'>
            <div className='flex items-center justify-between mb-8'>
                <Title title={ "My Projects"} />
                {/* <button><IoAddCircle size={50}/></button> */}
            </div>
            <Grid container spacing={2}>
              
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.pid}>
                        <ProjectCard project={project} onViewMore={handleViewMore} />
                    </Grid>
                ))}
               
            </Grid>
        </div>
    );
};

export default Projects;
