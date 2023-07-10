/* eslint-disable react/prop-types */
import { Box, Button, Typography, useTheme, Modal, TextField, InputLabel, Select, MenuItem } from "@mui/material"
//import { useToasts } from "react-toast-notifications"
import FlexBetween from "./FlexBetween"
import DeleteIcon from "@mui/icons-material/Delete"
import { useState, useEffect } from "react"

const TaskCard = ({ 
    id, name, taskType, timeSpent, startDate, data, setData, style
}) => {
    const { palette } = useTheme()
    //const { addToast } = useToasts()
    const [modalOpen, setModalOpen] = useState(false)

    const [updateName, setUpdateName] = useState(name)
    const [updateTimeSpent, setUpdateTimeSpent] = useState(timeSpent)
    const [updateTaskType, setUpdateTaskType] = useState(taskType)
    const [updateStartDate, setUpdateStartDate] = useState(startDate)

    useEffect(() => {
        setUpdateName(name);
        setUpdateTimeSpent(timeSpent);
        setUpdateTaskType(taskType);
        setUpdateStartDate(startDate);
      }, [name, timeSpent, taskType, startDate])

    //delete task
  const deleteTask = async (id) => {
    const deleteTaskRequest = await fetch(`https://time-tracker-8j3a.onrender.com/task/tasks/${id}`, {
      method: 'DELETE',
    })

    if (deleteTaskRequest.status === 200) {
        const newTaskList = data.filter((task) => task.id !== id)
        setData(newTaskList)
        console.log('Task deleted successfully')
        //addToast('Task deleted successfully', { appearance: 'success' })
        alert("Task deleted successfully.")
    } else {
      console.log('Error deleting the task')
     // addToast('Sorry. Could not delete task.', { appearance: 'error' })
     alert("Sorry. Could not delete task.")
    }
  }

  // update task
  const handleUpdate = async (e) => {
    e.preventDefault()
    const updatedTask = {
      id: id,
      name: updateName,
      taskType: updateTaskType,
      timeSpent: updateTimeSpent,
      startDate: updateStartDate,
    };
  
    try {
      const updateTaskRequest = await fetch(`https://time-tracker-8j3a.onrender.com/task/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (updateTaskRequest.status === 200) {
        console.log('Task updated successfully');
        // addToast('Task updated successfully', { appearance: 'success' });
        alert("Task updated successfully.")
        setModalOpen(false)
        setData(data.map((task) => {
          if (task.id === id) {
            task = updatedTask;
          }
          return task;
        }))
      } else {
        console.log('Error updating the task');
        // addToast('Sorry. Could not update task.', { appearance: 'error' });
        alert("Sorry. Could not update task.")
        console.log(updatedTask)
        console.log(updateTaskRequest.status)
      }
    } catch (error) {
      console.error(error);
    }
  }
    return (
        <Box 
        width="25rem" 
        m="auto" 
        mb="1rem"
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
            <Button variant="contained" onClick={() => setModalOpen(!modalOpen)}>Edit Task</Button>
            <Button 
                variant="contained" 
                startIcon={<DeleteIcon/>} 
                sx={{ backgroundColor: "red" }}
                onClick={() => deleteTask(id)}
                
            >Delete</Button>
        </FlexBetween>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="0.3rem">
            <Typography variant="h3" color={palette.grey[700]}>Update Task</Typography>
            <br />
            <form onSubmit={handleUpdate}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="0.5rem">
                 
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={updateTaskType}
                    label="Type"
                    onChange={(e) => setUpdateTaskType(e.target.value)}
                    fullWidth
                    required
                  >
                    <MenuItem value="story">Story</MenuItem>
                    <MenuItem value="bug">Bug</MenuItem>
                  </Select>

                  <TextField 
                    label="Name"
                    variant="outlined"
                    autoComplete="new-name"
                    fullWidth
                    type="text"
                    name="name"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    required
                  />

                  <TextField 
                    label="Days Spent"
                    variant="outlined"
                    fullWidth
                    type="text"
                    required
                    name="timeSpent"
                    value={updateTimeSpent}
                    onChange={(e) => setUpdateTimeSpent(e.target.value)}
                  />

                  <TextField 
                    
                    variant="outlined"
                    fullWidth
                    type="date"
                    required
                    name="timeSpent"
                    value={updateStartDate}
                    onChange={(e) => setUpdateStartDate(e.target.value)}
                  />

                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker 
                        label="Start Date" 
                        value={startDate} 
                        onChange={(newVal) => setStartDate(newVal)}/>
                    </DemoContainer>
                  </LocalizationProvider> */}

                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="submit"
                  >Update</Button>
                </Box>
            </form>
          </Box>
        </Modal>
    </Box>
    )
}

export default TaskCard