import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

import Button from '../../../components/ui/Button';

const SatisfactionChart = ({ data, title, type = 'pie' }) => {
  const [chartType, setChartType] = useState(type);

  const pieData = [
    { name: 'Muy satisfecho', value: 45, color: '#10B981' },
    { name: 'Satisfecho', value: 32, color: '#059669' },
    { name: 'Neutral', value: 15, color: '#F59E0B' },
    { name: 'Insatisfecho', value: 6, color: '#EF4444' },
    { name: 'Muy insatisfecho', value: 2, color: '#DC2626' }
  ];

  const barData = [
    { dimension: 'Tiempo de respuesta', satisfecho: 85, insatisfecho: 15 },
    { dimension: 'Conocimiento técnico', satisfecho: 92, insatisfecho: 8 },
    { dimension: 'Presentación', satisfecho: 78, insatisfecho: 22 },
    { dimension: 'Cortesía', satisfecho: 88, insatisfecho: 12 },
    { dimension: 'Servicio general', satisfecho: 83, insatisfecho: 17 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{chartType === 'pie' ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="dimension" 
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="satisfecho" fill="#10B981" name="Satisfecho" />
        <Bar dataKey="insatisfecho" fill="#EF4444" name="Insatisfecho" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'pie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('pie')}
            iconName="PieChart"
          >
            Circular
          </Button>
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
            iconName="BarChart3"
          >
            Barras
          </Button>
        </div>
      </div>

      <div className="w-full">
        {chartType === 'pie' ? renderPieChart() : renderBarChart()}
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <div>
              <p className="text-xs text-muted-foreground">{item.name}</p>
              <p className="text-sm font-medium text-foreground">{item.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SatisfactionChart;