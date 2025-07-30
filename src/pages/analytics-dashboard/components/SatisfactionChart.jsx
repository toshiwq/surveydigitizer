import React, { useState } from 'react';
import Chart from '../../../components/ui/Chart';
import Button from '../../../components/ui/Button';

const SatisfactionChart = ({ title, type = 'pie' }) => {
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

  const barSeries = [
    { name: 'Satisfecho', dataKey: 'satisfecho', color: '#10B981' },
    { name: 'Insatisfecho', dataKey: 'insatisfecho', color: '#EF4444' }
  ];

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
        {chartType === 'pie' ? (
          <Chart type="pie" data={pieData} />
        ) : (
          <Chart type="bar" data={barData} xAxisDataKey="dimension" series={barSeries} />
        )}
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