import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UrlContext } from '../context/UrlContext';
import { log } from '../middleware/logger';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const { urls, setUrls } = useContext(UrlContext);

  useEffect(() => {
    const entryIndex = urls.findIndex((u) => u.shortCode === shortcode);
    if (entryIndex === -1) {
      log('REDIRECT_ERROR', 'Shortcode not found', { shortcode });
      return;
    }

    const entry = urls[entryIndex];
    const now = new Date();

    if (new Date(entry.expiresAt) < now) {
      log('REDIRECT_EXPIRED', 'Short URL expired', { shortcode });
      return;
    }

    const newClick = {
      timestamp: now.toISOString(),
      referrer: document.referrer || 'Direct',
      location: 'Unknown (Frontend only)',
    };

    const updatedEntry = {
      ...entry,
      clickCount: entry.clickCount + 1,
      clicks: [...entry.clicks, newClick],
    };

    const newUrls = [...urls];
    newUrls[entryIndex] = updatedEntry;
    setUrls(newUrls);

    log('REDIRECT_SUCCESS', 'Redirected successfully', { shortcode });
    setTimeout(() => {
      window.location.href = entry.longUrl;
    }, 1000);
  }, [shortcode]);

  return (
    <div style={{ padding: '2rem' }}>
      <h3>Redirecting...</h3>
    </div>
  );
};

export default RedirectPage;
