import './App.css';
import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Messages from './components/Messages';

const link = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  link,
  cache: new InMemoryCache()
});


function App() {
  return (
    <div className="App">
      <p>Comment will load in below</p>
      <Messages />
    </div>
  );
}

export default () => (
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
)