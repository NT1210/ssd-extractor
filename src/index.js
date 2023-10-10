import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client';
import App from './App';
import { FileProvider } from './FileProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FileProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </FileProvider>
  </React.StrictMode>
);


