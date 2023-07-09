import { Box } from "@mui/material"
import { styled } from "@mui/system"


const TaskContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    borderRadius: "1rem"
}))

export default TaskContainer