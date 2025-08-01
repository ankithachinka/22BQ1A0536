import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UrlProvider } from './context/UrlContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UrlProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UrlProvider>
  </React.StrictMode>
);
