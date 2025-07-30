import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReportPreview = ({ reportConfig, selectedTemplate }) => {
  const mockSatisfactionData = [
    { unit: 'Madrid Centro', response_time: 4.2, technical_knowledge: 4.5, presentation: 4.3, overall_satisfaction: 4.4 },
    { unit: 'Barcelona Norte', response_time: 4.0, technical_knowledge: 4.2, presentation: 4.1, overall_satisfaction: 4.1 },
    { unit: 'Valencia Sur', response_time: 4.3, technical_knowledge: 4.4, presentation: 4.2, overall_satisfaction: 4.3 },
    { unit: 'Sevilla Este', response_time: 3.9, technical_knowledge: 4.1, presentation: 4.0, overall_satisfaction: 4.0 },
    { unit: 'Bilbao Oeste', response_time: 4.1, technical_knowledge: 4.3, presentation: 4.2, overall_satisfaction: 4.2 }
  ];

  const mockPieData = [
    { name: 'Muy Satisfecho', value: 45, color: '#10B981' },
    { name: 'Satisfecho', value: 35, color: '#3B82F6' },
    { name: 'Neutral', value: 15, color: '#F59E0B' },
    { name: 'Insatisfecho', value: 5, color: '#EF4444' }
  ];

  const mockComments = [
    {
      id: 1,
      unit: 'Madrid Centro',
      engineer: 'Carlos Rodríguez',
      comment: `Excelente servicio técnico. El ingeniero llegó puntual y resolvió el problema de manera eficiente.\nMuy profesional en su presentación y explicación del trabajo realizado.`,
      rating: 5,
      date: '28/07/2025'
    },
    {
      id: 2,
      unit: 'Barcelona Norte',
      engineer: 'María González',
      comment: `Buen servicio en general, aunque el tiempo de respuesta podría mejorar.\nLa técnica demostró conocimiento sólido del equipo.`,
      rating: 4,
      date: '27/07/2025'
    },
    {
      id: 3,
      unit: 'Valencia Sur',
      engineer: 'Antonio López',
      comment: `Servicio satisfactorio. El ingeniero fue cortés y explicó claramente los procedimientos.\nSe completó el trabajo según lo programado.`,
      rating: 4,
      date: '26/07/2025'
    }
  ];

  const getTemplateTitle = () => {
    const titles = {
      monthly_summary: 'Resumen Mensual de Calidad - Julio 2025',
      engineer_performance: 'Informe de Rendimiento de Ingenieros - Últimos 30 días',
      trend_analysis: 'Análisis de Tendencias de Satisfacción - Últimos 90 días',
      unit_comparison: 'Comparación de Unidades - Período Seleccionado',
      custom: 'Informe Personalizado'
    };
    return titles[selectedTemplate] || 'Vista Previa del Informe';
  };

  const formatMetricName = (metric) => {
    const names = {
      response_time: 'Tiempo de Respuesta',
      technical_knowledge: 'Conocimiento Técnico',
      presentation: 'Presentación',
      overall_satisfaction: 'Satisfacción General'
    };
    return names[metric] || metric;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{getTemplateTitle()}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Generado el {new Date().toLocaleDateString('es-ES')} • {mockSatisfactionData.length} unidades incluidas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Maximize2" size={16} className="mr-2" />
            Pantalla Completa
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6 space-y-8 max-h-[600px] overflow-y-auto">
        {/* Executive Summary */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-md font-medium text-foreground mb-3">Resumen Ejecutivo</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.2</div>
              <div className="text-sm text-muted-foreground">Satisfacción Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">847</div>
              <div className="text-sm text-muted-foreground">Encuestas Procesadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">12</div>
              <div className="text-sm text-muted-foreground">Ingenieros Evaluados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">5</div>
              <div className="text-sm text-muted-foreground">Unidades Analizadas</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {reportConfig.includeCharts && (
          <div className="space-y-6">
            {/* Bar Chart */}
            <div>
              <h4 className="text-md font-medium text-foreground mb-4">Métricas de Satisfacción por Unidad</h4>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockSatisfactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="unit" 
                      stroke="#64748B"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#64748B" fontSize={12} domain={[0, 5]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px'
                      }}
                    />
                    {reportConfig.metrics.map((metric, index) => (
                      <Bar 
                        key={metric}
                        dataKey={metric} 
                        fill={['#2563EB', '#10B981', '#F59E0B', '#EF4444'][index % 4]}
                        name={formatMetricName(metric)}
                        radius={[2, 2, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div>
              <h4 className="text-md font-medium text-foreground mb-4">Distribución de Satisfacción General</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockPieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">Datos Detallados</h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-foreground border-b border-border">Unidad</th>
                  {reportConfig.metrics.map((metric) => (
                    <th key={metric} className="text-center p-3 text-sm font-medium text-foreground border-b border-border">
                      {formatMetricName(metric)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockSatisfactionData.map((row, index) => (
                  <tr key={index} className="hover:bg-muted/30">
                    <td className="p-3 text-sm text-foreground border-b border-border">{row.unit}</td>
                    {reportConfig.metrics.map((metric) => (
                      <td key={metric} className="text-center p-3 text-sm text-foreground border-b border-border">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          row[metric] >= 4.5 ? 'bg-success/10 text-success' :
                          row[metric] >= 4.0 ? 'bg-primary/10 text-primary' :
                          row[metric] >= 3.5 ? 'bg-warning/10 text-warning': 'bg-destructive/10 text-destructive'
                        }`}>
                          {row[metric].toFixed(1)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comments Section */}
        {reportConfig.includeComments && (
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Comentarios de Clientes</h4>
            <div className="space-y-4">
              {mockComments.map((comment) => (
                <div key={comment.id} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-sm text-foreground">{comment.unit}</div>
                      <div className="text-xs text-muted-foreground">Ingeniero: {comment.engineer}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < comment.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-line">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPreview;