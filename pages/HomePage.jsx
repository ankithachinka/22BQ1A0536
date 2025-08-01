import React from 'react';
import { Container } from '@mui/material';
import UrlShortenerForm from '../components/UrlShortenerForm';
import UrlList from '../components/UrlList';

const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <UrlShortenerForm />
      <UrlList />
    </Container>
  );
};

export default HomePage;
