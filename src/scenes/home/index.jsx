/* eslint-disable react/prop-types */
import { Box, Button, Typography, useTheme } from "@mui/material"
import HomeHero from "../../components/HomeHero"
import TaskContainer from "../../components/TaskContainer"
import TaskCard from "../../components/TaskCard"
import FlexBetween from "../../components/FlexBetween"

import { useMemo } from "react"


const Home = ({ data }) => {
  const { palette } = useTheme()


  const tasks = useMemo(() => {
    return (
      data &&
      data.map(({ id, name, timeSpent, taskType, startDate}, index) => {
        const formattedStartDate = startDate.toLocaleString()

        return (
        <TaskCard 
          key={`Task-${index}`}
          name={name}
          id={id}
          timeSpent={timeSpent}
          taskType={taskType}
          startDate={formattedStartDate}
        />
        )
      })
    )
  }, [data])

  return (
    <Box width="100%" height="100%">
      <HomeHero />
      <Box width="40%" margin="auto" mt="2rem" mb="1rem">
        <FlexBetween gap="2rem">
          <Typography variant="h1" color={palette.grey[700]}>My Tasks</Typography>
          <Button variant="contained">+ Create Task</Button>
        </FlexBetween>
      </Box>
      <TaskContainer width="100%" p="1.5rem" display="flex" flexDirection="column" gap="0.3rem">
        {tasks}
      </TaskContainer>
    </Box>
  ) 
}

export default Home