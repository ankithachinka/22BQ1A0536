import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">URL Shortener</Typography>
          <div>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ marginRight: 2 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/stats"
            >
              Statistics
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
