/* eslint-disable react/prop-types */
import { Box, Button, Typography, useTheme, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
// import dayjs from "dayjs"
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import HomeHero from "../../components/HomeHero"
import TaskContainer from "../../components/TaskContainer"
import TaskCard from "../../components/TaskCard"
import FlexBetween from "../../components/FlexBetween"
import { useMemo, useState } from "react"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Home = ({ data, setData }) => {
  const { palette } = useTheme()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const [formData, setFormData] = useState({
  //   name: "",
  //   taskType: "",
  //   timeSpent: "",
  //   startDate: ""
  // })
  const [name, setName] = useState("")
  const [taskType, setTaskType] = useState("")
  const [timeSpent, setTimeSpent] = useState("")
  const [startDate, setStartDate] = useState("")



    // configuring date picker
    // function convertDateToString(date) {
    //   let day = date.getDate()
    //   let month = date.getMonth()
    //   let year = date.getFullYear()
  
    //   if (day < 10) {
    //     day = "0" + day
    //   }
    //   if (month < 10) {
    //     month = "0" + month
    //   }
    //   return `${month}/${day}/${year}`
    // }
    
    //const currentDate = convertDateToString(new Date())
    //console.log(currentDate)

  // get tasks
  const tasks = useMemo(() => {
    return (
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
          setData={setData}
          data={data}
        />
        )
      })
    )
  }, [data, setData])
  

  // post a task
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      name: name,
      taskType: taskType,
      timeSpent: parseInt(timeSpent),
      startDate: startDate,
    };
    console.log(formData)
  
    const response = await fetch('http://localhost:1337/task/tasks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (response.status === 201) {
      const tasks = await fetch("http://localhost:1337/task/tasks", {
      method: "GET",
      })
      const taskList = await tasks.json()
      setData(taskList)
      setModalIsOpen(false)
      alert("Task created successfully!")
    } else {
      alert("Sorry. Something went wrong.")
      console.log(response.status)
      console.error("Error:", response.statusText)
      setModalIsOpen(false)
    }
  }  

  return (
    <Box width="100%" height="100%">
      <HomeHero />
      <Box width="40%" margin="auto" mt="2rem" mb="1rem">
        <FlexBetween gap="2rem">
          <Typography variant="h1" color={palette.grey[700]}>My Tasks</Typography>
          <Button variant="contained" onClick={() => setModalIsOpen(!modalIsOpen)}>+ Create Task</Button>
        </FlexBetween>
        <Modal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="0.3rem">
            <Typography variant="h3" color={palette.grey[700]}>Create Task</Typography>
            <br />
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="0.5rem">
                 
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={taskType}
                    label="Type"
                    onChange={(e) => setTaskType(e.target.value)}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <TextField 
                    label="Days Spent"
                    variant="outlined"
                    fullWidth
                    type="text"
                    required
                    name="timeSpent"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(e.target.value)}
                  />

                  <TextField 
                    
                    variant="outlined"
                    fullWidth
                    type="date"
                    required
                    name="timeSpent"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
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
                  >Post</Button>
                </Box>
            </form>
          </Box>
        </Modal>
      </Box>
      <TaskContainer width="100%" p="1.5rem" display="flex" gap="0.1rem" flexWrap="wrap" justifyContent="center" alignItems="center">
        {tasks}
      </TaskContainer>
    </Box>
  ) 
}

export default Home