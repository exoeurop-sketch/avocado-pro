import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

// Clé Clerk publique — safe à mettre dans le code
const PUBLISHABLE_KEY = "pk_live_Y2xlcmsuYXZvY2Fkby1wcm8ucGFnZXMuZGV2JA";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
);
