import { useMemo, type JSX } from 'react';
import { XAxis, Bar, ResponsiveContainer, BarChart, Cell } from 'recharts';
import type { CustomizedLabelProps } from '../types/CustomizedLabelProps';

const MyChart = ({ thisWeekPoints }: { thisWeekPoints: number[] }) => {
  const data = [
    { name: '월', points: 0, color: '#C9E0FF' },
    { name: '화', points: 0, color: '#B7D6FF' },
    { name: '수', points: 0, color: '#A2CAFF' },
    { name: '목', points: 0, color: '#93C1FF' },
    { name: '금', points: 0, color: '#81B7FF' },
    { name: '토', points: 0, color: '#6DABFD' },
    { name: '일', points: 0, color: '#539DFF' },
  ];
  const chartData = useMemo(
    () =>
      data.map((item, idx) => {
        return {
          ...item,
          points: thisWeekPoints[idx] ?? 0,
        };
      }),
    [thisWeekPoints],
  );
  const renderCustomizedLabel = ({
    x = 0,
    y = 0,
    width = 0,
    value = '',
  }: CustomizedLabelProps): JSX.Element => (
    <text x={x + width / 2} y={y - 6} textAnchor="middle" fontSize={10} fill="#81B7FF">
      {value}
    </text>
  );

  return (
    <div
      style={{
        position: 'relative',
        width: 300,
        height: 270,
        marginTop: '15px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={6}
            tick={{ fill: '#81B7FF', fontSize: '12', fontWeight: '500' }}
          />
          <Bar dataKey="points" barSize={18} radius={2} label={renderCustomizedLabel}>
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
