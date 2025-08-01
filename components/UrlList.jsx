import React, { useContext } from 'react';
import {
  Typography,
  Paper,
  Box,
  Link,
  Grid,
} from '@mui/material';
import { UrlContext } from '../context/UrlContext';

const UrlList = () => {
  const { urls } = useContext(UrlContext);

  if (urls.length === 0) return null;

  return (
    <Box mt={4}>
      <Typography variant="h6">Shortened URLs</Typography>
      <Grid container spacing={2} mt={1}>
        {urls.slice(-5).reverse().map((url) => (
          <Grid item xs={12} md={6} key={url.shortCode}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Original URL:
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Link href={url.longUrl} target="_blank" rel="noopener">
                  {url.longUrl}
                </Link>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Short URL:
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Link
                  href={`http://localhost:3000/${url.shortCode}`}
                  target="_blank"
                  rel="noopener"
                >
                  http://localhost:3000/{url.shortCode}
                </Link>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Expires At:
              </Typography>
              <Typography variant="body2">
                {new Date(url.expiresAt).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UrlList;
