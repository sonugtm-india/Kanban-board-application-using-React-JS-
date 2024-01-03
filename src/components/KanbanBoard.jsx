// components/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchTickets } from '../utils/api';
import Ticket from './Ticket';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, Paper, Select, MenuItem, Grid } from '@mui/material';

const priorityNames = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const KanbanBoard = () => {
  const { data: tickets, isLoading } = useQuery('tickets', fetchTickets);
  const [groupingOption, setGroupingOption] = useState('status');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const groupedTickets = groupTickets(tickets, groupingOption);

  return (
    <Container style={{ overflowX: 'auto' , marginTop:"20px"}}>

      <div>
        <label>
          Group By:
          <Select value={groupingOption} onChange={(e) => setGroupingOption(e.target.value)}>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="userId">User</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </label>
      </div>
    <div style={{ overflowX: 'auto' }}>
      <DragDropContext>
        <Grid container spacing={3} >
          {Object.entries(groupedTickets).map(([group, ticketsInGroup]) => (
            <Grid item key={group} xs={12} sm={6} md={4} lg={3}>
              <Droppable droppableId={group} direction="horizontal">
                {(provided) => (
                  <Paper {...provided.droppableProps} ref={provided.innerRef}>
                    <h2>{group}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {ticketsInGroup.map((ticket, index) => (
                        <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Ticket ticket={ticket} displayPriorityName={groupingOption === 'priority'} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
      </div>
    </Container>
  );
};

export default KanbanBoard;

const groupTickets = (tickets, groupingOption) => {
  const groupedTickets = {};

  tickets.forEach((ticket) => {
    const group = groupingOption === 'priority' ? priorityNames[ticket[groupingOption]] : ticket[groupingOption];
    if (!groupedTickets[group]) {
      groupedTickets[group] = [];
    }
    groupedTickets[group].push(ticket);
  });

  return groupedTickets;
};
