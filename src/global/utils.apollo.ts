import { ApolloClient, gql, InMemoryCache, makeVar, NormalizedCacheObject } from "@apollo/client";

const typeDefs = gql`
  extend type Query {
    favourites: [ID!]!
  }
`

export const favouritesVar = makeVar<Set<number>>(new Set())

export function getApolloClient(): ApolloClient<NormalizedCacheObject> {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favourites: {
            read() {
              return favouritesVar()
            }
          }
        }
      },
      pokemon_v2_pokemon: {
        fields: {
          isFavourite: {
            read(_, { readField }) {
              const id = readField('id') as number
              return favouritesVar().has(id)
            }
          },
          name: {
            read(existing) {
              return existing?.split(' ')
                .map((word: string) => word.charAt(0) + word.substring(1))
                .join(' ')
            }
          },
          hp: {
            read(_, { readField }) {
              const stats = readField('pokemon_v2_pokemonstats') as any[]
              return stats?.find((stat) => stat.pokemon_v2_stat.name === 'hp')?.base_stat
            }
          },
          attack: {
            read(_, { readField }) {
              const stats = readField('pokemon_v2_pokemonstats') as any[]
              return stats?.find((stat) => stat.pokemon_v2_stat.name === 'attack')?.base_stat
            }
          },
          defense: {
            read(_, { readField }) {
              const stats = readField('pokemon_v2_pokemonstats') as any[]
              return stats?.find((stat) => stat.pokemon_v2_stat.name === 'defense')?.base_stat
            }
          },
          specialAttack: {
            read(_, { readField }) {
              const stats = readField('pokemon_v2_pokemonstats') as any[]
              return stats?.find((stat) => stat.pokemon_v2_stat.name === 'special-attack')?.base_stat
            }
          },
          specialDefense: {
            read(_, { readField }) {
              const stats = readField('pokemon_v2_pokemonstats') as any[]
              return stats?.find((stat) => stat.pokemon_v2_stat.name === 'special-defense')?.base_stat
            }
          },
          speed: {
            read(_, { readField }) {
              const stats = readField('pokemon_v2_pokemonstats') as any[]
              return stats?.find((stat) => stat.pokemon_v2_stat.name === 'speed')?.base_stat
            }
          }
        }
      }
    }
  })

  return new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    cache,
    connectToDevTools: true,
    typeDefs,
  })
}