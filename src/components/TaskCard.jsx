/* eslint-disable react/prop-types */
import { Box, Button, Typography, useTheme } from "@mui/material"
import FlexBetween from "./FlexBetween"
import DeleteIcon from "@mui/icons-material/Delete"

const TaskCard = ({ id, name, taskType, timeSpent, startDate }) => {
    const { palette } = useTheme()

    //delete task
  const deleteTask = async (id) => {
    const deleteTaskRequest = await fetch(`http://localhost:1337/task/tasks/${id}`, {
      method: 'DELETE',
    })

    console.log(id)

    if (deleteTaskRequest.status === 200) {
      console.log('Task deleted successfully')
    } else {
      console.log('Error deleting the task')
    }
  }

    return (
        <Box 
        minWidth="20rem" 
        m="auto" 
        display="flex" 
        flexDirection="column" 
        gap="1rem" 
        sx={{ 
            backgroundColor: palette.grey[800],
            padding: "0.5rem",
            borderRadius: "0.2rem"
              }}>
        <FlexBetween display="flex" flexDirection="row" gap="0.2rem">
            <Typography variant="h4">Name:</Typography>
            <Typography variant="h5">{name}</Typography>
        </FlexBetween>
        <FlexBetween display="flex" flexDirection="row" gap="0.2rem">
            <Typography variant="h4">Type:</Typography>
            <Typography variant="h5">{taskType}</Typography>
        </FlexBetween>
        <FlexBetween display="flex" flexDirection="row" gap="0.2rem">
            <Typography variant="h4">Started:</Typography>
            <Typography variant="h5">{startDate ? startDate : new Date().getDate()}</Typography>
        </FlexBetween>
        <FlexBetween display="flex" flexDirection="row" gap="0.2rem">
            <Typography variant="h4">Number of days:</Typography>
            <Typography variant="h5">{timeSpent}</Typography>
        </FlexBetween>
        <FlexBetween display="flex" flexDirection="row" gap="0.3rem">
            <Button variant="contained">Edit Task</Button>
            <Button 
                variant="contained" 
                startIcon={<DeleteIcon/>} 
                sx={{ backgroundColor: "red" }}
                onClick={() => deleteTask(id)}
                
            >Delete</Button>
        </FlexBetween>
    </Box>
    )
}

export default TaskCard