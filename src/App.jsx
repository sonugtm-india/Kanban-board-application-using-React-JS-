// App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import KanbanBoard from './components/KanbanBoard';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
       <Header></Header>
        <KanbanBoard />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
