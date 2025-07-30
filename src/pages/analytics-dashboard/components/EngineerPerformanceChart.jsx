import React, { useState } from 'react';
import Chart from '../../../components/ui/Chart';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EngineerPerformanceChart = ({ title }) => {
  const [chartType, setChartType] = useState('bar');

  const performanceData = [
    {
      engineer: 'Carlos R.',
      satisfaccion: 92,
      tiempoRespuesta: 88,
      conocimientoTecnico: 95,
      cortesia: 90,
      totalEncuestas: 45
    },
    {
      engineer: 'María G.',
      satisfaccion: 89,
      tiempoRespuesta: 91,
      conocimientoTecnico: 87,
      cortesia: 93,
      totalEncuestas: 52
    },
    {
      engineer: 'Antonio L.',
      satisfaccion: 85,
      tiempoRespuesta: 82,
      conocimientoTecnico: 89,
      cortesia: 86,
      totalEncuestas: 38
    },
    {
      engineer: 'Isabel M.',
      satisfaccion: 94,
      tiempoRespuesta: 96,
      conocimientoTecnico: 92,
      cortesia: 95,
      totalEncuestas: 41
    },
    {
      engineer: 'Francisco S.',
      satisfaccion: 87,
      tiempoRespuesta: 85,
      conocimientoTecnico: 91,
      cortesia: 88,
      totalEncuestas: 47
    }
  ];

  const radarData = [
    { dimension: 'Tiempo de respuesta', value: 88, fullMark: 100 },
    { dimension: 'Conocimiento técnico', value: 91, fullMark: 100 },
    { dimension: 'Presentación', value: 85, fullMark: 100 },
    { dimension: 'Cortesía', value: 92, fullMark: 100 },
    { dimension: 'Satisfacción general', value: 89, fullMark: 100 }
  ];

  const barSeries = [
    { name: 'Satisfacción general', dataKey: 'satisfaccion', color: '#2563EB' },
    { name: 'Tiempo de respuesta', dataKey: 'tiempoRespuesta', color: '#10B981' },
    { name: 'Conocimiento técnico', dataKey: 'conocimientoTecnico', color: '#F59E0B' },
    { name: 'Cortesía', dataKey: 'cortesia', color: '#8B5CF6' }
  ];

  const radarSeries = [
    { name: 'Rendimiento promedio', dataKey: 'value', color: '#2563EB' }
  ];

  const getTopPerformer = () => {
    return performanceData.reduce((prev, current) =>
      (prev.satisfaccion > current.satisfaccion) ? prev : current
    );
  };

  const getAverageScore = () => {
    const total = performanceData.reduce((sum, engineer) => sum + engineer.satisfaccion, 0);
    return (total / performanceData.length).toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
            iconName="BarChart3"
          >
            Barras
          </Button>
          <Button
            variant={chartType === 'radar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('radar')}
            iconName="Target"
          >
            Radar
          </Button>
        </div>
      </div>

      <div className="w-full">
        {chartType === 'bar' ? (
          <Chart
            type="bar"
            data={performanceData}
            xAxisDataKey="engineer"
            series={barSeries}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          />
        ) : (
          <Chart
            type="radar"
            data={radarData}
            xAxisDataKey="dimension"
            series={radarSeries}
            margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
          />
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Award" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Mejor ingeniero</span>
          </div>
          <p className="text-lg font-bold text-foreground">{getTopPerformer().engineer}</p>
          <p className="text-xs text-muted-foreground">{getTopPerformer().satisfaccion}% satisfacción</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Promedio equipo</span>
          </div>
          <p className="text-lg font-bold text-foreground">{getAverageScore()}%</p>
          <p className="text-xs text-muted-foreground">Satisfacción general</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Total ingenieros</span>
          </div>
          <p className="text-lg font-bold text-foreground">{performanceData.length}</p>
          <p className="text-xs text-muted-foreground">Activos este período</p>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Total encuestas</span>
          </div>
          <p className="text-lg font-bold text-foreground">
            {performanceData.reduce((sum, eng) => sum + eng.totalEncuestas, 0)}
          </p>
          <p className="text-xs text-muted-foreground">Procesadas</p>
        </div>
      </div>

      {/* Engineer Rankings */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Ranking de rendimiento</h4>
        <div className="space-y-3">
          {performanceData
            .sort((a, b) => b.satisfaccion - a.satisfaccion)
            .map((engineer, index) => (
              <div key={engineer.engineer} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-warning text-warning-foreground' :
                    index === 1 ? 'bg-muted-foreground text-white' :
                    index === 2 ? 'bg-accent text-accent-foreground': 'bg-secondary text-secondary-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{engineer.engineer}</p>
                    <p className="text-sm text-muted-foreground">{engineer.totalEncuestas} encuestas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{engineer.satisfaccion}%</p>
                  <p className="text-xs text-muted-foreground">Satisfacción</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EngineerPerformanceChart;