import { Box, Chip, DialogTitle, IconButton, Paper, Stack, Tab, Tabs } from "@mui/material"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import FavouriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavouriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import { useState } from "react"

import PokemonAbout from "./PokemonAbout"
import { usePokemonQuery } from '../graphql'
import { favouritesVar } from "../global/utils.apollo"
import PokemonStats from "./PokemonStats"

interface PokemonModalProps {
  id: number
  imageUrl: string
  onClose: () => void
}

enum ModalTab {
  About,
  Stats,
  Evolution,
  Moves
}

const IMAGE_HEIGHT = 350

const PokemonModal: React.FC<PokemonModalProps> = ({
  id,
  imageUrl,
  onClose
}) => {
  const [currentModalTab, setCurrentModalTab] = useState<ModalTab>(ModalTab.About)
  const { data, loading, error } = usePokemonQuery({
    variables: {
      id
    }
  })

  function handleModalTabChange(event: React.SyntheticEvent, newValue: ModalTab) {
    setCurrentModalTab(newValue)
  }

  if (!data) {
    return <div></div>
  }

  const pokemon = data.pokemon[0]

  function onToggleFavourite() {
    const favourites = favouritesVar()

    pokemon.isFavourite
      ? favourites.delete(id)
      : favourites.add(id)

    favouritesVar(new Set(favourites))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
      <Paper sx={{ borderRadius: '30px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            pt: 4
          }}
        >
          <IconButton onClick={onClose} color="inherit">
            <ArrowBackRoundedIcon />
          </IconButton>

          <IconButton onClick={onToggleFavourite} color="inherit">
            {pokemon.isFavourite
              ? <FavouriteRoundedIcon />
              : <FavouriteBorderRoundedIcon />
            }
          </IconButton>
        </Box>

        <Box
          sx={{
            backgroundImage: 'url("/pokeball.svg")',
            backgroundSize: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
          }}
        >
          <DialogTitle>{pokemon.name}</DialogTitle>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              px: 3
            }}
          >
            {pokemon.types.map((type) => (
              <Chip key={type.info?.name} label={type.info?.name} />
            ))}
          </Stack>

          <Box height={IMAGE_HEIGHT - 100} />
        </Box>

      </Paper>

      <Paper
        variant="white"
        sx={{
          flex: 1,
          borderRadius: '30px',
          position: 'relative',
          marginTop: '-2rem',
          minHeight: '5rem',
          pb: 2,
          px: 2,
          paddingTop: '75px',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          sx={{
            position: 'absolute',
            left: '50%',
            height: IMAGE_HEIGHT,
            marginTop: `${-IMAGE_HEIGHT}px`,
            transform: 'translateX(-50%)'
          }}
        />

        <Tabs
          value={currentModalTab}
          onChange={handleModalTabChange}
          variant="fullWidth"
        >
          <Tab value={ModalTab.About} label="About" />
          <Tab value={ModalTab.Stats} label="Base Stats" />
        </Tabs>

        <Box py={2}>
          {currentModalTab === ModalTab.About && <PokemonAbout
            experience={pokemon.experience || 0}
            height={pokemon.height || 0}
            weight={pokemon.weight || 0}
            abilities={pokemon.abilities.map((ability) => ability.info?.name || "")}
            description={pokemon.specy?.descriptions[0].text || ""}
          />}
          {currentModalTab === ModalTab.Stats && <PokemonStats
            id={id}
            hp={pokemon.hp}
            attack={pokemon.attack}
            defense={pokemon.defense}
            specialAttack={pokemon.specialAttack}
            specialDefense={pokemon.specialDefense}
            speed={pokemon.speed}
          />}
        </Box>
      </Paper>
    </Box>
  )
}

export default PokemonModal
