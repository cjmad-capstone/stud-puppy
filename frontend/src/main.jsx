import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from 'react-daisyui';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
