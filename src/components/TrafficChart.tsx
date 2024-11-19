import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrafficData {
  time: string;
  inbound: number;
  outbound: number;
}

interface TrafficChartProps {
  data: TrafficData[];
}

export const TrafficChart: React.FC<TrafficChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="inbound"
            stackId="1"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="outbound"
            stackId="1"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};