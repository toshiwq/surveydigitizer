import React, { useState, useMemo } from 'react';
import Chart from '../../../components/ui/Chart';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendChart = ({ title }) => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  const trendData = [
    { month: 'Ene', satisfaccion: 82, respuestas: 145, promedio: 4.1 },
    { month: 'Feb', satisfaccion: 85, respuestas: 167, promedio: 4.2 },
    { month: 'Mar', satisfaccion: 78, respuestas: 189, promedio: 3.9 },
    { month: 'Abr', satisfaccion: 88, respuestas: 201, promedio: 4.4 },
    { month: 'May', satisfaccion: 91, respuestas: 178, promedio: 4.5 },
    { month: 'Jun', satisfaccion: 87, respuestas: 156, promedio: 4.3 }
  ];

  const yearlyData = [
    { period: '2021', satisfaccion: 79, respuestas: 1456, promedio: 3.95 },
    { period: '2022', satisfaccion: 83, respuestas: 1789, promedio: 4.15 },
    { period: '2023', satisfaccion: 86, respuestas: 2134, promedio: 4.3 },
    { period: '2024', satisfaccion: 89, respuestas: 1234, promedio: 4.45 }
  ];

  const processedData = useMemo(() => {
    const rawData = timeRange === 'yearly' ? yearlyData : trendData;
    if (!Array.isArray(rawData) || rawData.length === 0) {
      return [];
    }
    return rawData;
  }, [timeRange]);

  const lineSeries = [
    { name: '% Satisfacción', dataKey: 'satisfaccion', color: '#2563EB', strokeWidth: 3 },
    { name: 'Puntuación promedio', dataKey: 'promedio', color: '#10B981' }
  ];

  const areaSeries = [
    { name: '% Satisfacción', dataKey: 'satisfaccion', color: '#2563EB', stackId: '1' },
    { name: 'Número de respuestas', dataKey: 'respuestas', color: '#059669', stackId: '2' }
  ];

  const xAxisDataKey = timeRange === 'yearly' ? 'period' : 'month';

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title || 'Gráfico de tendencias'}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === '6months' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('6months')}
          >
            6 meses
          </Button>
          <Button
            variant={timeRange === 'yearly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('yearly')}
          >
            Anual
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('line')}
            iconName="TrendingUp"
          >
            Línea
          </Button>
          <Button
            variant={chartType === 'area' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('area')}
            iconName="Activity"
          >
            Área
          </Button>
        </div>
      </div>

      <div className="w-full">
        <Chart
          type={chartType}
          data={processedData}
          xAxisDataKey={xAxisDataKey}
          series={chartType === 'line' ? lineSeries : areaSeries}
          height={400}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Tendencia</span>
          </div>
          <p className="text-lg font-bold text-success">+5.2%</p>
          <p className="text-xs text-muted-foreground">vs período anterior</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Objetivo</span>
          </div>
          <p className="text-lg font-bold text-foreground">85%</p>
          <p className="text-xs text-muted-foreground">Meta de satisfacción</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Award" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Mejor mes</span>
          </div>
          <p className="text-lg font-bold text-foreground">Mayo</p>
          <p className="text-xs text-muted-foreground">91% satisfacción</p>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;