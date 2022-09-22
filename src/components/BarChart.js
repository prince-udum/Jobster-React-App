import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarChartComponent = ({data}) => {
  return (
    
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{top: 50}}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar type='monotone' dataKey='count' barSize={75} fill='#3b82f6' />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent