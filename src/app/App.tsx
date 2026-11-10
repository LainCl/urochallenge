import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './providers';
import { AppRouter } from './router';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
