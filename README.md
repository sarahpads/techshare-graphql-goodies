# App Setup
- `src/global/utils.apollo.ts` creates and configures the ApolloClient
- all graphql queries are stored in `src/graphql`
- graphql-codegen is used to generate custom React hooks for each query (https://www.graphql-code-generator.com/)
- uses the PokeAPI GraphQL API (https://pokeapi.co/docs/graphql)

# GraphQL Goodies
1. Apollo devtools
    - https://www.apollographql.com/docs/react/development-testing/developer-tooling/#apollo-client-devtools)
    - *NOTE:* This extension conflicts with react devtools; you will need to disable that extension in order for this one to display reliably

2. `keyFields` and `cacheIds`
    - Apollo identifies the distinct objects within a query response
    - It will then generate a cache id for each
    - By default, this is type:id
    - If Apollo isn't able to generate a cache id, that object it stored on the parent
    - https://www.apollographql.com/docs/react/caching/overview/#1-identify-objects
    - https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-cache-ids

3. Client-side fields
    - Allows you to customize how a particular field is read from the cache
    - You can massage an existing value that already exists in the cache (like capitalizing a name)
    - You can create brand new fields that don't exist in the schema, but you will need to add the @client directive to the gql field so that it isn't sent to the server (like isFavourite)
    - https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies

4. Reactive variables
    - Allows you to represent local data outside of the cache
    - They aren't beholden to schemas, so can store data of any type or structure
    - Modifying a reactive variable triggers an update of any active query that depends on that variable
    - https://www.apollographql.com/docs/react/local-state/reactive-variables
    - *NOTE:* Hot reloading buggers them up