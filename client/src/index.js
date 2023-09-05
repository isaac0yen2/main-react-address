import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client'

let client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache(),
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>
);
