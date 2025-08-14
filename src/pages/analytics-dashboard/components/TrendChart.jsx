import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendChart = ({ title }) => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  // Static data with proper validation
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

  // Simplified and more robust data processing
  const processedData = useMemo(() => {
    const rawData = timeRange === 'yearly' ? yearlyData : trendData;
    
    // Ensure we always return a valid array
    if (!rawData || !Array.isArray(rawData) || rawData?.length === 0) {
      return [];
    }
    
    // Return data as-is since it's already properly formatted
    // This eliminates the complex processing that might cause reduce errors
    return rawData?.filter(item => item && typeof item === 'object');
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !Array.isArray(payload) || payload?.length === 0) {
      return null;
    }

    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload?.map((entry, index) => {
          if (!entry || typeof entry?.value !== 'number') {
            return null;
          }
          
          const value = entry?.value;
          const name = entry?.name || 'Unknown';
          const color = entry?.color || '#000';
          const dataKey = entry?.dataKey || '';
          
          let suffix = '';
          if (dataKey === 'satisfaccion') suffix = '%';
          else if (dataKey === 'promedio') suffix = '/5';
          
          return (
            <p key={index} className="text-sm" style={{ color }}>
              {name}: {value}{suffix}
            </p>
          );
        })}
      </div>
    );
  };

  const renderLineChart = () => {
    if (!processedData || processedData?.length === 0) {
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Icon name="Database" size={24} className="mx-auto mb-2" />
            <p>No hay datos disponibles</p>
          </div>
        </div>
      );
    }

    const xAxisDataKey = timeRange === 'yearly' ? 'period' : 'month';

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey={xAxisDataKey}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="satisfaccion" 
            stroke="#2563EB" 
            strokeWidth={3}
            name="% Satisfacción"
            dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="promedio" 
            stroke="#10B981" 
            strokeWidth={2}
            name="Puntuación promedio"
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderAreaChart = () => {
    if (!processedData || processedData?.length === 0) {
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Icon name="Database" size={24} className="mx-auto mb-2" />
            <p>No hay datos disponibles</p>
          </div>
        </div>
      );
    }

    const xAxisDataKey = timeRange === 'yearly' ? 'period' : 'month';

    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey={xAxisDataKey}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="satisfaccion"
            stackId="1"
            stroke="#2563EB"
            fill="#2563EB"
            fillOpacity={0.3}
            name="% Satisfacción"
          />
          <Area
            type="monotone"
            dataKey="respuestas"
            stackId="2"
            stroke="#059669"
            fill="#059669"
            fillOpacity={0.3}
            name="Número de respuestas"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

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
        {chartType === 'line' ? renderLineChart() : renderAreaChart()}
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