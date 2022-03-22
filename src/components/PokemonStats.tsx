import { Grid, LinearProgress, Typography } from "@mui/material"

import { usePokemonStatsQuery } from '../graphql'

interface PokemonStatsProps {
  id: number
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

const PokemonStats: React.FC<PokemonStatsProps> = ({
  id,
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed
}) => {
  // this is available immediately because all data requested in this query
  // is already available in cache
  const { data, loading, error } = usePokemonStatsQuery({
    variables: {
      id
    }
  })

  return (
    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
      <Stat label="HP" value={hp} percentage={hp / 150 * 100} />
      <Stat label="Attack" value={attack} percentage={attack / 150 * 100} />
      <Stat label="Defense" value={defense} percentage={defense / 150 * 100} />
      <Stat label="Sp. Attack" value={specialAttack} percentage={specialAttack / 200 * 100} />
      <Stat label="Sp. Defense" value={specialDefense} percentage={specialDefense / 150 * 100} />
      <Stat label="Speed" value={speed} percentage={speed / 150 * 100} />
    </Grid>
  )
}

interface StatProps {
  label: string
  value: number
  percentage: number
}

const Stat: React.FC<StatProps> = ({
  label,
  value,
  percentage
}) => {
  return (
    <>
      <Grid item sm={3}><Typography variant="caption">{label}</Typography></Grid>
      <Grid item sm={2}><Typography>{value}</Typography></Grid>
      <Grid item sm={7}><LinearProgress variant="determinate" value={percentage} /></Grid>
    </>
  )
}

export default PokemonStats