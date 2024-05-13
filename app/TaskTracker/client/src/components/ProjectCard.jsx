import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography, Button } from '@mui/material';

const colors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800', '#9c27b0']; // Color options

const ProjectCard = ({ project, onViewMore }) => {
    const color = colors[Math.floor(Math.random() * colors.length)]; // Randomly pick a color

    return (
        <Card sx={{ maxWidth: 345, m: 2 }} className="transition-shadow shadow-md hover:shadow-lg">
            <CardActionArea>
                <div style={{ backgroundColor: color, height: '25px' }} />
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
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onViewMore(project.pid)}>
                    View More
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProjectCard;
