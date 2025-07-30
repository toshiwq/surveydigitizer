import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ reportConfig, onExport }) => {
  const [exportSettings, setExportSettings] = useState({
    format: 'excel',
    fileName: `informe_calidad_${new Date().toISOString().split('T')[0]}`,
    includeRawData: true,
    includeCharts: true,
    includeComments: true,
    emailDelivery: false,
    emailRecipients: '',
    compressionLevel: 'medium'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const formatOptions = [
    { value: 'excel', label: 'Excel (.xlsx)', description: 'Hoja de cálculo con datos y gráficos' },
    { value: 'pdf', label: 'PDF (.pdf)', description: 'Documento con formato profesional' },
    { value: 'csv', label: 'CSV (.csv)', description: 'Datos sin formato para análisis' },
    { value: 'json', label: 'JSON (.json)', description: 'Datos estructurados para APIs' }
  ];

  const compressionOptions = [
    { value: 'low', label: 'Baja (mejor calidad)' },
    { value: 'medium', label: 'Media (equilibrada)' },
    { value: 'high', label: 'Alta (menor tamaño)' }
  ];

  const handleExportSettingChange = (field, value) => {
    setExportSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          onExport(exportSettings);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getFormatIcon = (format) => {
    const icons = {
      excel: 'FileSpreadsheet',
      pdf: 'FileText',
      csv: 'Database',
      json: 'Code'
    };
    return icons[format] || 'File';
  };

  const getEstimatedSize = () => {
    const baseSizes = {
      excel: 2.5,
      pdf: 1.8,
      csv: 0.5,
      json: 0.8
    };
    
    let size = baseSizes[exportSettings.format] || 1;
    if (exportSettings.includeCharts) size += 0.5;
    if (exportSettings.includeComments) size += 0.3;
    if (exportSettings.includeRawData) size += 1.2;
    
    return size.toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Opciones de Exportación</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Tamaño estimado: {getEstimatedSize()} MB</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <Select
            label="Formato de Exportación"
            description="Selecciona el formato de archivo para la exportación"
            options={formatOptions}
            value={exportSettings.format}
            onChange={(value) => handleExportSettingChange('format', value)}
          />
        </div>

        {/* File Name */}
        <div>
          <Input
            label="Nombre del Archivo"
            description="El nombre del archivo sin extensión"
            value={exportSettings.fileName}
            onChange={(e) => handleExportSettingChange('fileName', e.target.value)}
            placeholder="informe_calidad_2025"
          />
        </div>

        {/* Content Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Contenido a Incluir</h4>
          <div className="space-y-2">
            <Checkbox
              label="Datos sin procesar"
              description="Incluir todos los datos originales de las encuestas"
              checked={exportSettings.includeRawData}
              onChange={(e) => handleExportSettingChange('includeRawData', e.target.checked)}
            />
            <Checkbox
              label="Gráficos y visualizaciones"
              description="Incluir gráficos generados en el informe"
              checked={exportSettings.includeCharts}
              onChange={(e) => handleExportSettingChange('includeCharts', e.target.checked)}
              disabled={exportSettings.format === 'csv' || exportSettings.format === 'json'}
            />
            <Checkbox
              label="Comentarios de clientes"
              description="Incluir todos los comentarios textuales"
              checked={exportSettings.includeComments}
              onChange={(e) => handleExportSettingChange('includeComments', e.target.checked)}
            />
          </div>
        </div>

        {/* Compression Settings */}
        {(exportSettings.format === 'excel' || exportSettings.format === 'pdf') && (
          <div>
            <Select
              label="Nivel de Compresión"
              description="Ajusta el balance entre calidad y tamaño del archivo"
              options={compressionOptions}
              value={exportSettings.compressionLevel}
              onChange={(value) => handleExportSettingChange('compressionLevel', value)}
            />
          </div>
        )}

        {/* Email Delivery */}
        <div className="space-y-3">
          <Checkbox
            label="Envío por correo electrónico"
            description="Enviar el informe automáticamente por email"
            checked={exportSettings.emailDelivery}
            onChange={(e) => handleExportSettingChange('emailDelivery', e.target.checked)}
          />
          
          {exportSettings.emailDelivery && (
            <Input
              label="Destinatarios"
              description="Direcciones de email separadas por comas"
              value={exportSettings.emailRecipients}
              onChange={(e) => handleExportSettingChange('emailRecipients', e.target.value)}
              placeholder="manager@empresa.com, director@empresa.com"
              type="email"
            />
          )}
        </div>

        {/* Export Progress */}
        {isExporting && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Exportando informe...</span>
              <span className="text-sm text-muted-foreground">{exportProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Procesando datos y generando archivo...
            </p>
          </div>
        )}

        {/* Export Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name={getFormatIcon(exportSettings.format)} size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {formatOptions.find(f => f.value === exportSettings.format)?.label}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" disabled={isExporting}>
              <Icon name="Eye" size={16} className="mr-2" />
              Vista Previa
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleExport}
              disabled={isExporting}
              loading={isExporting}
            >
              <Icon name="Download" size={16} className="mr-2" />
              {isExporting ? 'Exportando...' : 'Exportar Informe'}
            </Button>
          </div>
        </div>

        {/* Quick Export Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="justify-start">
            <Icon name="FileSpreadsheet" size={16} className="mr-2" />
            Exportación Rápida Excel
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <Icon name="FileText" size={16} className="mr-2" />
            Exportación Rápida PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;