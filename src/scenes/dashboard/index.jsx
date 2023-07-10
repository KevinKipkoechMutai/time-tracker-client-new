/* eslint-disable react/prop-types */
import { Cell, Legend, Pie, PieChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Box, Typography, useTheme } from "@mui/material"
import { useMemo } from "react"

const Dashboard = ({ data }) => {
  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[500]]

  const pieChartData = useMemo(() => {
    const bugs = data.filter((item) => item.taskType === "bug").length;
    const stories = data.filter((item) => item.taskType === "story").length;
    // console.log(bugs)
    // console.log(stories)

    return [{ name: "bugs", value: bugs }, { name: "stories", value: stories }];
  }, [data])

  const lineChartData = useMemo(() => {
    const nameAndTimeSpent = data.map((item) => ({
      name: item.name,
      value: item.timeSpent
    }))
    return nameAndTimeSpent
  }, [data])

  
  return (
    <Box width="100%" height="100%" textAlign="center" >
      <Typography variant="h2" color={palette.primary[400]}>Some data-derived insights</Typography>
      <Box display="flex" alignItems="center" justifyContent="center" mb="1rem"> 
        <PieChart width={300} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={pieChartData}
            
            outerRadius={80}
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index]}/>
            ))}
          </Pie>
          <Legend verticalAlign="top" height={36}/>
        </PieChart>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
          <LineChart width={600} height={400} data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" label={{ value: "Tasks", position: "insideBottom" }}/>
            <YAxis label={{ value: "Days", angle: -90, position: "insideLeft" }}/>
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={palette.primary[400]} activeDot={{r: 8}}/>
          </LineChart>
      </Box>
    </Box>
  )
}

export default Dashboard