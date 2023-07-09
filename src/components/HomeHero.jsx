import { Box, Typography, useTheme } from "@mui/material"

const HomeHero = () => {
    const { palette } = useTheme()
  return (
    <Box width="100%" textAlign="center" padding="1rem 5rem" sx={{ backgroundColor: palette.grey[500] }}>
        <Typography variant="h2">
        The most popular free time tracker for developers and designers. See how much time you spend working on projects and improve productivity.
        </Typography>
    </Box>
  )
}

export default HomeHero