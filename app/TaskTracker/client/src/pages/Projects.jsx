// Projects.jsx
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { projects as mockProjects } from '../assets/data'; // Import projects data
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import Button from '../components/Button';
import Title from '../components/Title';
import AddProj from '../components/projects/AddProj';
import { useSelector } from 'react-redux'; // Import to access Redux store


const Projects = () => {
    const [projects, setProjects] = useState(mockProjects);
    const navigate = useNavigate();
    const [openAddProj, setOpenAddProj] = useState(false);
    const [selectedProj, setSelectedProj] = useState(null);
    const user = useSelector(state => state.auth.user); // Access the logged in user from Redux state

     // Effect to filter projects based on the logged-in user
     useEffect(() => {
        if (user) {
            const userProjects = mockProjects.filter(project => project.teamMembers.includes(user._id));
            setProjects(userProjects);
        } else {
            setProjects([]); // Clear projects or handle guest users
        }
    }, [user]);

    const addProjHandler = () => {
        setSelectedProj(null);  // Reset selected user
        setOpenAddProj(true);
      };

    const handleViewMore = (projectId) => {
        // Implementation to view more details
        navigate(`/projects/${projectId}`)
    };
    return (
        <div className='w-full md:px-1 px-0 my-6'>
            <div className='flex items-center justify-between mb-8'>
                <Title title={ "My Projects"} />
                <Button 
                    label="Add Project" 
                    icon={<IoMdAdd />}
                    className='bg-blue-500 hover:bg-blue-600 rounded-full flex flex-row-reverse justify-center items-center gap-2 text-white  py-2 px-4'
                    onClick={addProjHandler}
                />

            </div>
            <Grid container spacing={2}>
              
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.pid}>
                        <ProjectCard project={project} onViewMore={handleViewMore} />
                    </Grid>
                ))}
               
            </Grid>
            <AddProj
            open={openAddProj}
            setOpen={setOpenAddProj}
            userData={selectedProj}
            key={selectedProj ? selectedProj.pid : 'new'}
          />
        </div>
    );
};

export default Projects;
