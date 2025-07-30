import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
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

  // Memoize data processing to prevent re-computation during render
  const processedData = useMemo(() => {
    try {
      const rawData = timeRange === 'yearly' ? yearlyData : trendData;
      
      // More robust data validation
      if (!Array.isArray(rawData) || rawData.length === 0) {
        return [];
      }
      
      return rawData.map(item => {
        // Ensure all values are valid numbers
        const processedItem = {};
        
        // Handle the key field (month or period)
        const keyField = timeRange === 'yearly' ? 'period' : 'month';
        processedItem[keyField] = item?.[keyField] || 'N/A';
        
        // Process numeric values with fallbacks
        processedItem.satisfaccion = typeof item?.satisfaccion === 'number' && !isNaN(item.satisfaccion) ? item.satisfaccion : 0;
        processedItem.respuestas = typeof item?.respuestas === 'number' && !isNaN(item.respuestas) ? item.respuestas : 0;
        processedItem.promedio = typeof item?.promedio === 'number' && !isNaN(item.promedio) ? item.promedio : 0;
        
        return processedItem;
      }).filter(item => {
        // Filter out items with invalid key fields
        const keyField = timeRange === 'yearly' ? 'period' : 'month';
        return item[keyField] && item[keyField] !== 'N/A';
      });
    } catch (error) {
      console.error('Error processing chart data:', error);
      return [];
    }
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    // Add null checks and early returns
    if (!active || !payload || !Array.isArray(payload) || payload.length === 0 || !label) {
      return null;
    }

    try {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{String(label)}</p>
          {payload.map((entry, index) => {
            if (!entry || typeof entry !== 'object' || typeof entry.value !== 'number') {
              return null;
            }
            
            const value = entry.value;
            const name = entry.name || 'Unknown';
            const color = entry.color || '#000';
            const dataKey = entry.dataKey || '';
            
            let suffix = '';
            if (dataKey === 'satisfaccion') suffix = '%';
            else if (dataKey === 'promedio') suffix = '/5';
            
            return (
              <p key={`tooltip-${index}-${name}`} className="text-sm" style={{ color }}>
                {name}: {value}{suffix}
              </p>
            );
          })}
        </div>
      );
    } catch (error) {
      console.error('Error in CustomTooltip:', error);
      return null;
    }
  };

  const renderLineChart = () => {
    try {
      if (!processedData || processedData.length === 0) {
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
          <LineChart 
            data={processedData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey={xAxisDataKey}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
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
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="promedio" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Puntuación promedio"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              yAxisId="right"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } catch (error) {
      console.error('Error rendering line chart:', error);
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Icon name="AlertCircle" size={24} className="mx-auto mb-2" />
            <p>Error al cargar el gráfico de líneas</p>
          </div>
        </div>
      );
    }
  };

  const renderAreaChart = () => {
    try {
      if (!processedData || processedData.length === 0) {
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
          <AreaChart 
            data={processedData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey={xAxisDataKey}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
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
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="respuestas"
              stackId="2"
              stroke="#059669"
              fill="#059669"
              fillOpacity={0.3}
              name="Número de respuestas"
              yAxisId="right"
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    } catch (error) {
      console.error('Error rendering area chart:', error);
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Icon name="AlertCircle" size={24} className="mx-auto mb-2" />
            <p>Error al cargar el gráfico de área</p>
          </div>
        </div>
      );
    }
  };

  // Enhanced error boundary wrapper for the entire component
  const renderChart = () => {
    try {
      if (chartType === 'line') {
        return renderLineChart();
      } else if (chartType === 'area') {
        return renderAreaChart();
      } else {
        // Fallback for unknown chart types
        console.warn('Unknown chart type:', chartType);
        return renderLineChart();
      }
    } catch (error) {
      console.error('Error rendering chart:', error);
      return (
        <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Icon name="AlertCircle" size={24} className="mx-auto mb-2" />
            <p>Error al cargar el gráfico</p>
            <p className="text-xs mt-1">Por favor, recarga la página</p>
          </div>
        </div>
      );
    }
  };

  // Enhanced safe state handlers with validation
  const handleChartTypeChange = (newType) => {
    try {
      if (typeof newType === 'string' && ['line', 'area'].includes(newType)) {
        setChartType(newType);
      }
    } catch (error) {
      console.error('Error changing chart type:', error);
    }
  };

  const handleTimeRangeChange = (newRange) => {
    try {
      if (typeof newRange === 'string' && ['6months', 'yearly'].includes(newRange)) {
        setTimeRange(newRange);
      }
    } catch (error) {
      console.error('Error changing time range:', error);
    }
  };

  // Add a try-catch around the entire render
  try {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">{title || 'Gráfico de tendencias'}</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={timeRange === '6months' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange('6months')}
            >
              6 meses
            </Button>
            <Button
              variant={timeRange === 'yearly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange('yearly')}
            >
              Anual
            </Button>
            <div className="w-px h-6 bg-border mx-2" />
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleChartTypeChange('line')}
              iconName="TrendingUp"
            >
              Línea
            </Button>
            <Button
              variant={chartType === 'area' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleChartTypeChange('area')}
              iconName="Activity"
            >
              Área
            </Button>
          </div>
        </div>

        <div className="w-full">
          {renderChart()}
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
  } catch (error) {
    console.error('Critical error in TrendChart component:', error);
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Icon name="AlertCircle" size={24} className="mx-auto mb-2" />
            <p>Error crítico en el componente</p>
            <p className="text-xs mt-1">Por favor, recarga la página</p>
          </div>
        </div>
      </div>
    );
  }
};

export default TrendChart;