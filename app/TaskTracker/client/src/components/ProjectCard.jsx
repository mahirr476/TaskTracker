import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

const ProjectCard = ({ project, onViewMore }) => {
    return (
        <Card className="transition-shadow shadow-md hover:shadow-lg rounded bg-white">
            <CardContent>
                <Typography variant="h5" component="div" className="text-gray-800">
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
            <div className="p-3">
                <Button size="small" variant="contained" color="primary" onClick={() => onViewMore(project.pid)}>
                    View More
                </Button>
            </div>
        </Card>
    );
};

export default ProjectCard;
