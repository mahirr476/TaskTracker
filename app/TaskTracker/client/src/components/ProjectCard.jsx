// ProjectCard.jsx
import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

const ProjectCard = ({ project, onViewMore }) => {
    return (
        <Card sx={{ minWidth: 275, margin: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {project.projectName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Due: {project.dueDate}
                </Typography>
                <Typography variant="body2">
                    Team Members: {project.teamMembers.length}
                    <br />
                    Tasks: {project.numberOfTasks}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onViewMore(project.pid)}>View More</Button>
            </CardActions>
        </Card>
    );
};

export default ProjectCard;
