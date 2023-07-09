/* eslint-disable react/prop-types */
import { Box, Button, Typography, useTheme, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
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
  const [formData, setFormData] = useState({
    name: "",
    taskType: "",
    timeSpent: "",
    startDate: ""
  })

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

  //handle form-area changes
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData, [name] : value
    }))
  }

  //handle numeric form area change
  function handleChangeNum(e) {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData, [name] : parseInt(value)
    }))
  }

  // post a task
  const handleSubmit = async () => {

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
            <FormControl onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="0.5rem">
                 
                  <InputLabel id="type-select">Type</InputLabel>
                  <Select
                    labelId="type-select"
                    id="task-type-select"
                    value={formData.taskType}
                    label="Type"
                    onChange={handleChange}
                    fullWidth
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
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <TextField 
                    label="Time Spent"
                    variant="outlined"
                    autoComplete="time"
                    fullWidth
                    type="number"
                    name="timeSpent"
                    value={formData.timeSpent}
                    onChange={handleChangeNum}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="submit"
                  >Post</Button>
                </Box>
            </FormControl>
          </Box>
        </Modal>
      </Box>
      <TaskContainer width="100%" p="1.5rem" display="flex" flexDirection="column" gap="0.3rem">
        {tasks}
      </TaskContainer>
    </Box>
  ) 
}

export default Home