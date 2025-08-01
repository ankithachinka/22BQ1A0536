import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { UrlContext } from '../context/UrlContext';
import { log } from '../middleware/logger';

const isValidUrl = (url) =>
  /^(https?:\/\/)[\w.-]+\.[a-z]{2,}.*$/i.test(url.trim());

const generateShortcode = () =>
  Math.random().toString(36).substring(2, 8);

const UrlShortenerForm = () => {
  const { urls, setUrls } = useContext(UrlContext);
  const [inputs, setInputs] = useState(
    Array(5).fill({ longUrl: '', shortcode: '', validity: '' })
  );
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleSubmit = () => {
    const newErrors = [];
    const newEntries = [];

    inputs.forEach((input, index) => {
      const { longUrl, shortcode, validity } = input;
      const errorObj = {};

      if (!longUrl.trim()) return;

      if (!isValidUrl(longUrl)) {
        errorObj.longUrl = 'Invalid URL format';
      }

      if (shortcode && !/^[a-zA-Z0-9]{4,10}$/.test(shortcode)) {
        errorObj.shortcode = 'Shortcode must be 4-10 alphanumeric chars';
      }

      if (
        shortcode &&
        urls.some((entry) => entry.shortCode === shortcode)
      ) {
        errorObj.shortcode = 'Shortcode already exists';
      }

      if (validity && (!Number.isInteger(+validity) || +validity <= 0)) {
        errorObj.validity = 'Validity must be a positive number';
      }

      if (Object.keys(errorObj).length > 0) {
        newErrors[index] = errorObj;
        return;
      }

      const now = new Date();
      const expiry = new Date(
        now.getTime() + (validity ? +validity : 30) * 60000
      );

      const finalShortcode = shortcode || generateShortcode();
      const newEntry = {
        longUrl: longUrl.trim(),
        shortCode: finalShortcode,
        createdAt: now.toISOString(),
        expiresAt: expiry.toISOString(),
        clickCount: 0,
        clicks: [],
      };

      log('CREATE_URL', 'Short URL created', { shortcode: finalShortcode });
      newEntries.push(newEntry);
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedUrls = [...urls, ...newEntries];
    setUrls(updatedUrls);
    setInputs(Array(5).fill({ longUrl: '', shortcode: '', validity: '' }));
    setErrors([]);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Shorten URLs (up to 5)
      </Typography>
      <Grid container spacing={2}>
        {inputs.map((input, index) => (
          <Grid item xs={12} key={index}>
            <Paper sx={{ padding: 2 }}>
              <TextField
                label="Long URL"
                fullWidth
                margin="normal"
                value={input.longUrl}
                onChange={(e) =>
                  handleChange(index, 'longUrl', e.target.value)
                }
                error={!!errors[index]?.longUrl}
                helperText={errors[index]?.longUrl}
              />
              <TextField
                label="Custom Shortcode (Optional)"
                fullWidth
                margin="normal"
                value={input.shortcode}
                onChange={(e) =>
                  handleChange(index, 'shortcode', e.target.value)
                }
                error={!!errors[index]?.shortcode}
                helperText={errors[index]?.shortcode}
              />
              <TextField
                label="Validity in Minutes (Optional)"
                fullWidth
                margin="normal"
                value={input.validity}
                onChange={(e) =>
                  handleChange(index, 'validity', e.target.value)
                }
                error={!!errors[index]?.validity}
                helperText={errors[index]?.validity}
              />
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Shorten
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UrlShortenerForm;
