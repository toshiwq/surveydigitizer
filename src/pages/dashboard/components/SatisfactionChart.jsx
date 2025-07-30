import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SatisfactionChart = () => {
  const satisfactionData = [
    { category: 'Tiempo de Respuesta', excelente: 45, bueno: 32, regular: 15, malo: 8 },
    { category: 'Conocimiento Técnico', excelente: 52, bueno: 28, regular: 12, malo: 8 },
    { category: 'Presentación', excelente: 38, bueno: 35, regular: 18, malo: 9 },
    { category: 'Cortesía', excelente: 48, bueno: 30, regular: 14, malo: 8 },
    { category: 'Servicio General', excelente: 42, bueno: 33, regular: 16, malo: 9 }
  ];

  const overallSatisfaction = [
    { name: 'Excelente', value: 45, color: '#10B981' },
    { name: 'Bueno', value: 31, color: '#3B82F6' },
    { name: 'Regular', value: 15, color: '#F59E0B' },
    { name: 'Malo', value: 9, color: '#EF4444' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Análisis de Satisfacción</h3>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground">
            <option>Último Mes</option>
            <option>Últimos 3 Meses</option>
            <option>Último Año</option>
          </select>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Satisfacción por Categoría</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={satisfactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="excelente" stackId="a" fill="#10B981" />
                <Bar dataKey="bueno" stackId="a" fill="#3B82F6" />
                <Bar dataKey="regular" stackId="a" fill="#F59E0B" />
                <Bar dataKey="malo" stackId="a" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Satisfacción General</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallSatisfaction}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {overallSatisfaction.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Porcentaje']}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {overallSatisfaction.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm text-muted-foreground">({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">76%</div>
            <div className="text-sm text-muted-foreground">Satisfacción Positiva</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">4.2</div>
            <div className="text-sm text-muted-foreground">Puntuación Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <div className="text-sm text-muted-foreground">Encuestas Analizadas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionChart;