import { createTheme } from "@mui/material/styles"
import { useEffect, useMemo, useState } from "react"
import { themeSettings } from "./theme"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
//import { ToastProvider } from "react-toast-notifications"
import Navbar from "./scenes/Navbar"
import Dashboard from "./scenes/dashboard"
import Home from "./scenes/home"

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  const [data, setData] = useState([])
  

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("https://time-tracker-8j3a.onrender.com/task/tasks")
      if (response.status === 200) {
        const tasks = await response.json()
        //console.log(tasks)
        setData(tasks)
      } else {
        throw new Error(response.statusText)
      }
    }
    fetchTasks()
  }, [])

  //console.log(data)


  return (
    <div className='app'>
     
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home data={data} setData={setData}/>}/>
                <Route path="/dashboard" element={<Dashboard data={data} setData={setData}/>}/>
              </Routes>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
     
    </div>
  )
}

export default App
