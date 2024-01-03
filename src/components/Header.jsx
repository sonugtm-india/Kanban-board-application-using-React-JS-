// components/NavigationBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Kanban Board
          </Typography>
          {/* Add more navigation items or components here */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
