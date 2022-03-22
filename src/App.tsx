import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from './global/utils.apollo';

import PokemonListing from './pages/PokemonListing';

function App() {
  const [client] = useState(() => getApolloClient())

  return (
    <ApolloProvider client={client}>
      <PokemonListing />
    </ApolloProvider>
  );
}

export default App;
