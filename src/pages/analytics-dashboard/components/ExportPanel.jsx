import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportPanel = ({ onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'excel',
    includeCharts: true,
    includeRawData: true,
    includeSummary: true,
    dateRange: 'current_filters',
    sections: ['satisfaction', 'trends', 'performance']
  });

  const formatOptions = [
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' },
    { value: 'json', label: 'JSON' }
  ];

  const dateRangeOptions = [
    { value: 'current_filters', label: 'Filtros actuales' },
    { value: 'last_30_days', label: 'Últimos 30 días' },
    { value: 'last_90_days', label: 'Últimos 90 días' },
    { value: 'last_year', label: 'Último año' },
    { value: 'all_time', label: 'Todo el tiempo' }
  ];

  const sectionOptions = [
    { value: 'satisfaction', label: 'Análisis de satisfacción' },
    { value: 'trends', label: 'Tendencias temporales' },
    { value: 'performance', label: 'Rendimiento de ingenieros' },
    { value: 'comparative', label: 'Análisis comparativo' },
    { value: 'comments', label: 'Comentarios y feedback' }
  ];

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSectionToggle = (section) => {
    setExportConfig(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };

  const handleExport = () => {
    // Simulate export process
    const exportData = {
      ...exportConfig,
      timestamp: new Date().toISOString(),
      filename: `analytics_report_${new Date().toISOString().split('T')[0]}`
    };
    
    onExport(exportData);
  };

  const getEstimatedSize = () => {
    let size = 0;
    if (exportConfig.includeRawData) size += 2.5;
    if (exportConfig.includeCharts) size += 1.8;
    if (exportConfig.includeSummary) size += 0.3;
    size *= exportConfig.sections.length / 5;
    return size.toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Exportar informe</h3>
      </div>

      <div className="space-y-6">
        {/* Export Format */}
        <div>
          <Select
            label="Formato de exportación"
            options={formatOptions}
            value={exportConfig.format}
            onChange={(value) => handleConfigChange('format', value)}
          />
        </div>

        {/* Date Range */}
        <div>
          <Select
            label="Rango de fechas"
            options={dateRangeOptions}
            value={exportConfig.dateRange}
            onChange={(value) => handleConfigChange('dateRange', value)}
          />
        </div>

        {/* Content Options */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Contenido a incluir
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Incluir gráficos e imágenes"
              checked={exportConfig.includeCharts}
              onChange={(e) => handleConfigChange('includeCharts', e.target.checked)}
            />
            <Checkbox
              label="Incluir datos sin procesar"
              checked={exportConfig.includeRawData}
              onChange={(e) => handleConfigChange('includeRawData', e.target.checked)}
            />
            <Checkbox
              label="Incluir resumen ejecutivo"
              checked={exportConfig.includeSummary}
              onChange={(e) => handleConfigChange('includeSummary', e.target.checked)}
            />
          </div>
        </div>

        {/* Sections to Include */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Secciones del informe
          </label>
          <div className="space-y-2">
            {sectionOptions.map((section) => (
              <Checkbox
                key={section.value}
                label={section.label}
                checked={exportConfig.sections.includes(section.value)}
                onChange={() => handleSectionToggle(section.value)}
              />
            ))}
          </div>
        </div>

        {/* Export Summary */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Resumen de exportación</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Formato:</span>
              <span className="text-foreground font-medium">
                {formatOptions.find(f => f.value === exportConfig.format)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Secciones:</span>
              <span className="text-foreground font-medium">{exportConfig.sections.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tamaño estimado:</span>
              <span className="text-foreground font-medium">{getEstimatedSize()} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tiempo estimado:</span>
              <span className="text-foreground font-medium">2-5 minutos</span>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Generar informe
          </Button>
          <Button
            variant="outline"
            iconName="Eye"
            iconPosition="left"
          >
            Vista previa
          </Button>
        </div>

        {/* Recent Exports */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Exportaciones recientes</h4>
          <div className="space-y-2">
            {[
              { name: 'Informe_Analytics_2024-07-29.xlsx', date: '29/07/2024', size: '3.2 MB' },
              { name: 'Satisfaccion_Q2_2024.pdf', date: '25/07/2024', size: '1.8 MB' },
              { name: 'Datos_Completos_Julio.csv', date: '20/07/2024', size: '5.1 MB' }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.date} • {file.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="Download">
                  Descargar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;