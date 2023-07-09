import { useTheme, Typography, Box } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled"
import FlexBetween from "../../components/FlexBetween"

const Navbar = () => {
  const { palette } = useTheme()
  const [selected, setSelected] = useState("home")

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0" color={palette.grey[300]}>
      {/* Left End */}
      <FlexBetween gap="0.75rem">
        <AccessTimeFilledIcon sx={{ fontSize: "28px" }}/>
        <Typography variant="h4" fontSize="16px">Task-Timer</Typography>
      </FlexBetween>

      {/* RIGHT END */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("home")}
            style={{
              color: selected === "home" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
          >
            Home
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/dashboard"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
          >
            Dashboard
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar