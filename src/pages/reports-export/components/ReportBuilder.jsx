import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportBuilder = ({ onPreviewUpdate, selectedTemplate, onTemplateChange }) => {
  const [reportConfig, setReportConfig] = useState({
    dateRange: 'last_30_days',
    startDate: '',
    endDate: '',
    units: [],
    engineers: [],
    metrics: ['response_time', 'technical_knowledge', 'presentation', 'overall_satisfaction'],
    includeComments: true,
    includeCharts: true,
    groupBy: 'unit'
  });

  const dateRangeOptions = [
    { value: 'last_7_days', label: 'Últimos 7 días' },
    { value: 'last_30_days', label: 'Últimos 30 días' },
    { value: 'last_90_days', label: 'Últimos 90 días' },
    { value: 'this_month', label: 'Este mes' },
    { value: 'last_month', label: 'Mes pasado' },
    { value: 'this_quarter', label: 'Este trimestre' },
    { value: 'custom', label: 'Rango personalizado' }
  ];

  const unitOptions = [
    { value: 'unit_001', label: 'Unidad Madrid Centro' },
    { value: 'unit_002', label: 'Unidad Barcelona Norte' },
    { value: 'unit_003', label: 'Unidad Valencia Sur' },
    { value: 'unit_004', label: 'Unidad Sevilla Este' },
    { value: 'unit_005', label: 'Unidad Bilbao Oeste' }
  ];

  const engineerOptions = [
    { value: 'eng_001', label: 'Carlos Rodríguez' },
    { value: 'eng_002', label: 'María González' },
    { value: 'eng_003', label: 'Antonio López' },
    { value: 'eng_004', label: 'Isabel Martín' },
    { value: 'eng_005', label: 'Francisco Sánchez' },
    { value: 'eng_006', label: 'Carmen Fernández' }
  ];

  const metricOptions = [
    { value: 'response_time', label: 'Tiempo de respuesta' },
    { value: 'technical_knowledge', label: 'Conocimiento técnico' },
    { value: 'presentation', label: 'Presentación y cortesía' },
    { value: 'overall_satisfaction', label: 'Satisfacción general' }
  ];

  const groupByOptions = [
    { value: 'unit', label: 'Por unidad' },
    { value: 'engineer', label: 'Por ingeniero' },
    { value: 'date', label: 'Por fecha' },
    { value: 'metric', label: 'Por métrica' }
  ];

  const templateOptions = [
    { value: 'monthly_summary', label: 'Resumen mensual de calidad' },
    { value: 'engineer_performance', label: 'Rendimiento de ingenieros' },
    { value: 'trend_analysis', label: 'Análisis de tendencias' },
    { value: 'unit_comparison', label: 'Comparación de unidades' },
    { value: 'custom', label: 'Informe personalizado' }
  ];

  const handleConfigChange = (field, value) => {
    const newConfig = { ...reportConfig, [field]: value };
    setReportConfig(newConfig);
    onPreviewUpdate(newConfig);
  };

  const handleMetricToggle = (metric, checked) => {
    const newMetrics = checked 
      ? [...reportConfig.metrics, metric]
      : reportConfig.metrics.filter(m => m !== metric);
    handleConfigChange('metrics', newMetrics);
  };

  const handleTemplateSelect = (template) => {
    onTemplateChange(template);
    
    // Auto-configure based on template
    const templateConfigs = {
      monthly_summary: {
        dateRange: 'this_month',
        metrics: ['response_time', 'technical_knowledge', 'presentation', 'overall_satisfaction'],
        groupBy: 'unit',
        includeCharts: true,
        includeComments: true
      },
      engineer_performance: {
        dateRange: 'last_30_days',
        metrics: ['technical_knowledge', 'presentation', 'overall_satisfaction'],
        groupBy: 'engineer',
        includeCharts: true,
        includeComments: false
      },
      trend_analysis: {
        dateRange: 'last_90_days',
        metrics: ['overall_satisfaction'],
        groupBy: 'date',
        includeCharts: true,
        includeComments: false
      }
    };

    if (templateConfigs[template]) {
      const newConfig = { ...reportConfig, ...templateConfigs[template] };
      setReportConfig(newConfig);
      onPreviewUpdate(newConfig);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Constructor de Informes</h3>
        <Button variant="outline" size="sm">
          <Icon name="Save" size={16} className="mr-2" />
          Guardar Plantilla
        </Button>
      </div>

      <div className="space-y-6">
        {/* Template Selection */}
        <div>
          <Select
            label="Plantilla de Informe"
            description="Selecciona una plantilla predefinida o crea un informe personalizado"
            options={templateOptions}
            value={selectedTemplate}
            onChange={handleTemplateSelect}
            className="mb-4"
          />
        </div>

        {/* Date Range Configuration */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Rango de Fechas</h4>
          <Select
            label="Período"
            options={dateRangeOptions}
            value={reportConfig.dateRange}
            onChange={(value) => handleConfigChange('dateRange', value)}
          />
          
          {reportConfig.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Fecha de inicio"
                type="date"
                value={reportConfig.startDate}
                onChange={(e) => handleConfigChange('startDate', e.target.value)}
              />
              <Input
                label="Fecha de fin"
                type="date"
                value={reportConfig.endDate}
                onChange={(e) => handleConfigChange('endDate', e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Unit Selection */}
        <div>
          <Select
            label="Unidades"
            description="Selecciona las unidades a incluir en el informe"
            options={unitOptions}
            value={reportConfig.units}
            onChange={(value) => handleConfigChange('units', value)}
            multiple
            searchable
            clearable
          />
        </div>

        {/* Engineer Selection */}
        <div>
          <Select
            label="Ingenieros"
            description="Filtra por ingenieros específicos (opcional)"
            options={engineerOptions}
            value={reportConfig.engineers}
            onChange={(value) => handleConfigChange('engineers', value)}
            multiple
            searchable
            clearable
          />
        </div>

        {/* Metrics Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Métricas de Satisfacción</h4>
          <div className="space-y-2">
            {metricOptions.map((metric) => (
              <Checkbox
                key={metric.value}
                label={metric.label}
                checked={reportConfig.metrics.includes(metric.value)}
                onChange={(e) => handleMetricToggle(metric.value, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Opciones Adicionales</h4>
          <div className="space-y-2">
            <Checkbox
              label="Incluir comentarios de clientes"
              checked={reportConfig.includeComments}
              onChange={(e) => handleConfigChange('includeComments', e.target.checked)}
            />
            <Checkbox
              label="Incluir gráficos y visualizaciones"
              checked={reportConfig.includeCharts}
              onChange={(e) => handleConfigChange('includeCharts', e.target.checked)}
            />
          </div>
        </div>

        {/* Grouping Options */}
        <div>
          <Select
            label="Agrupar por"
            description="Selecciona cómo agrupar los datos en el informe"
            options={groupByOptions}
            value={reportConfig.groupBy}
            onChange={(value) => handleConfigChange('groupBy', value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-4 border-t border-border">
          <Button variant="outline" size="sm">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Restablecer
          </Button>
          <Button variant="default" size="sm">
            <Icon name="Eye" size={16} className="mr-2" />
            Vista Previa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;