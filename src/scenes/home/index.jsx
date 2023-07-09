/* eslint-disable react/prop-types */
import { Box, Button, Typography, useTheme, Modal } from "@mui/material"
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
};


const Home = ({ data }) => {
  const { palette } = useTheme()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [taskList, setTaskList] = useState([])

  // get tasks
  const tasks = useMemo(() => {
    return (
      taskList.map(({ id, name, timeSpent, taskType, startDate}, index) => {
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
          <Button variant="contained" onClick={() => setModalIsOpen(!modalIsOpen)}>+ Create Task</Button>
        </FlexBetween>
        <Modal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </Box>
      <TaskContainer width="100%" p="1.5rem" display="flex" flexDirection="column" gap="0.3rem">
        {tasks ? tasks : <div><h1>Loading...</h1></div>}
      </TaskContainer>
    </Box>
  ) 
}

export default Home