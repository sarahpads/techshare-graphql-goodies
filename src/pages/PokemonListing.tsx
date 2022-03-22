import { Container, Grid } from '@mui/material'
import React from 'react'

import PokemonCard from '../components/PokemonCard'
import { usePokemonListQuery } from '../graphql'

const PokemonListing: React.FC = () => {
  const { data, loading, error } = usePokemonListQuery()

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {data?.pokemon.map((pokemon) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={pokemon.name}
          >
            <PokemonCard
              name={pokemon.name}
              id={pokemon.id}
              type={pokemon.types && pokemon.types[0].info?.name || ""}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default PokemonListing
