import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import Icon from '../AppIcon';

// Centralized CustomTooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color || entry.fill }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Chart = ({
  type = 'line',
  data,
  title,
  xAxisDataKey,
  yAxisDataKey,
  series,
  ...props
}) => {
  const renderChart = () => {
    switch (type) {
      case 'pie':
        return (
          <PieChart {...props}>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        );
      case 'bar':
        return (
          <BarChart data={data} {...props}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey={xAxisDataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {series.map((s, index) => (
              <Bar key={index} dataKey={s.dataKey} fill={s.color} name={s.name} />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data} {...props}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey={xAxisDataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {series.map((s, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color}
                strokeWidth={s.strokeWidth || 2}
                name={s.name}
                dot={{ fill: s.color, strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data} {...props}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey={xAxisDataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {series.map((s, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={s.dataKey}
                stackId={s.stackId || '1'}
                stroke={s.color}
                fill={s.color}
                fillOpacity={0.3}
                name={s.name}
                connectNulls={false}
              />
            ))}
          </AreaChart>
        );
      case 'radar':
        return (
          <RadarChart data={data} {...props}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis dataKey={xAxisDataKey} tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {series.map((s, index) => (
              <Radar
                key={index}
                name={s.name}
                dataKey={s.dataKey}
                stroke={s.color}
                fill={s.color}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            ))}
          </RadarChart>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="AlertCircle" size={24} className="mx-auto mb-2" />
              <p>Invalid chart type specified.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}
      <ResponsiveContainer width="100%" height={400}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
