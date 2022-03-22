import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Dialog, Fade, Skeleton, ThemeProvider } from "@mui/material"
import { useState } from "react"
import { getTheme, PokemonType } from "../theme"
import PokemonModal from "./PokemonModal"

interface PokemonCardProps {
  name: string
  id: number
  type: string
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
  type
}) => {
  const [theme] = useState(() => getTheme(type as PokemonType))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  function handleCardClick() {
    setIsDialogOpen(true)
  }

  function handleCloseDialog() {
    setIsDialogOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardActionArea onClick={handleCardClick}>
          <CardHeader title={name} />

          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'url("/pokeball.svg")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '15rem',
                  width: '75%'
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={imageUrl}
                />
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        open={isDialogOpen}
        fullWidth={true}
        maxWidth="sm"
        scroll="body"
        onBackdropClick={handleCloseDialog}
        onClose={handleCloseDialog}
      >
        <PokemonModal
          id={id}
          imageUrl={imageUrl}
          onClose={handleCloseDialog}
        />
      </Dialog>
    </ThemeProvider>
  )
}

export default PokemonCard