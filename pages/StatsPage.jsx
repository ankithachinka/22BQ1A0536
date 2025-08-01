import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Link,
  Divider,
} from '@mui/material';
import { UrlContext } from '../context/UrlContext';

const StatsPage = () => {
  const { urls } = useContext(UrlContext);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Shortened URL Statistics
      </Typography>

      {urls.length === 0 ? (
        <Typography>No data available.</Typography>
      ) : (
        urls.map((url) => (
          <Paper key={url.shortCode} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Shortcode:
            </Typography>
            <Link
              href={`http://localhost:3000/${url.shortCode}`}
              target="_blank"
            >
              http://localhost:3000/{url.shortCode}
            </Link>

            <Typography variant="body2" mt={1}>
              Created: {new Date(url.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Expires: {new Date(url.expiresAt).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Total Clicks: {url.clickCount}
            </Typography>

            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" fontWeight="bold">
              Click Details:
            </Typography>
            {url.clicks.length === 0 ? (
              <Typography>No clicks yet.</Typography>
            ) : (
              url.clicks.map((click, idx) => (
                <Box key={idx} sx={{ ml: 2, mt: 1 }}>
                  <Typography variant="body2">
                    {idx + 1}. Time: {new Date(click.timestamp).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">Source: {click.referrer}</Typography>
                  <Typography variant="body2">Location: {click.location}</Typography>
                </Box>
              ))
            )}
          </Paper>
        ))
      )}
    </Container>
  );
};

export default StatsPage;
