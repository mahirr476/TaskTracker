import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const colors = ['#ffbab5', '#ffd1b5', '#d6ffb5', '#b5ffeb', '#c4b5ff', '#ffb5f5']; // Color options

const ProjectCard = ({ project, onViewMore }) => {
    const color = colors[Math.floor(Math.random() * colors.length)]; // Randomly pick a color

    return (
        <Card sx={{ maxWidth: 345, m: 2 }} className="transition-shadow shadow-md hover:shadow-lg">
            <CardActionArea onClick={() => onViewMore(project.pid)}>
                <div style={{ backgroundColor: color, height: '10px' }} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {project.projectName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {project.description}
                    </Typography>
                    <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        Due: {project.dueDate}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <PeopleIcon color="action" />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {project.teamMembers.length} Team Members
                        </Typography>
                        <FiberManualRecordIcon 
                            sx={{ ml: 2, fontSize: 14 }} 
                            color={project.isActive ? 'success' : 'error'}
                        />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {project.isActive ? 'Active' : 'Inactive'}
                        </Typography>
                    </Box>
                </CardContent>
                <div style={{ backgroundColor: color, height: '10px' }} />
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;
