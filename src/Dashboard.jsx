import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
 const [tickets, setTickets] = useState([]);
 const [groupBy, setGroupBy] = useState('status');
 const [sortBy, setSortBy] = useState('priority');
 const [error, setError] = useState(null);

 const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => a.priority - b.priority);
    }
    // Handle other sorting options here
 };

 const filterTickets = (tickets) => {
    if (groupBy === 'status') {
      return tickets.filter((ticket) => ticket.status === groupBy);
    }
    // Handle other grouping options here
 };

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        console.log(response.data);
        setTickets(sortTickets(filterTickets(response.data.tickets)));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
 }, [groupBy, sortBy]);

 return (
    <div>
        Hello world!ß
      {/* Render dropdown menu and sorting buttons here */}
      {/* Render the Kanban board component here */}
    </div>
 );
};

export default App;