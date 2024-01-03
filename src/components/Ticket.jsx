// components/Ticket.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const priorityNames = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const getRandomImage = () => {
  const randomImageNumber = Math.floor(Math.random() * 10) + 1; // Adjust the range based on the number of placeholder images
  return `https://placekitten.com/10/10?image=${randomImageNumber}`;
};

const Ticket = ({ ticket }) => {
  const priorityName = priorityNames[ticket.priority];
  const userImage = ticket.userImage || getRandomImage();

  return (
    <Card className={`ticket-card priority-${ticket.priority}`} style={{ marginBottom: '10px' }}>
      <CardMedia
        component="img"
        alt={`User: ${ticket.userId}`}
        height="3%"
        width="3%"
        image={userImage}
        style={{ objectFit: 'cover', borderRadius: '50%', width:"9%", marginLeft: '90%', marginTop: '10px' }}
      />
      <CardContent>
        <Typography variant="h6">{ticket.title}</Typography>
        <Typography>Status: {ticket.status}</Typography>
        <Typography>User: {ticket.userId}</Typography>
        <Typography>Priority: {priorityName}</Typography>
      </CardContent>
    </Card>
  );
};

export default Ticket;
