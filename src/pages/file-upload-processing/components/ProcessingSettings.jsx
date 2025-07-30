import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProcessingSettings = ({ settings, onSettingsChange, onStartProcessing, canProcess }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const ocrSensitivityOptions = [
    { value: 'low', label: 'Baja - Más rápido, menos preciso' },
    { value: 'medium', label: 'Media - Equilibrio recomendado' },
    { value: 'high', label: 'Alta - Más lento, más preciso' }
  ];

  const validationRuleOptions = [
    { value: 'strict', label: 'Estricta - Rechaza datos incompletos' },
    { value: 'moderate', label: 'Moderada - Permite algunos campos vacíos' },
    { value: 'lenient', label: 'Permisiva - Acepta la mayoría de datos' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              Configuración de Procesamiento
            </h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>

      {/* Settings Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* OCR Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <Icon name="Eye" size={16} />
              <span>Reconocimiento Óptico (OCR)</span>
            </h4>
            
            <Select
              label="Sensibilidad OCR"
              description="Ajusta la precisión vs velocidad del reconocimiento"
              options={ocrSensitivityOptions}
              value={settings.ocrSensitivity}
              onChange={(value) => handleSettingChange('ocrSensitivity', value)}
            />
            
            <Input
              label="Umbral de Confianza (%)"
              type="number"
              min="50"
              max="100"
              value={settings.confidenceThreshold}
              onChange={(e) => handleSettingChange('confidenceThreshold', parseInt(e.target.value))}
              description="Mínimo nivel de confianza para aceptar datos extraídos"
            />
          </div>

          {/* Validation Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Validación de Datos</span>
            </h4>
            
            <Select
              label="Reglas de Validación"
              description="Define qué tan estricta debe ser la validación"
              options={validationRuleOptions}
              value={settings.validationRules}
              onChange={(value) => handleSettingChange('validationRules', value)}
            />
            
            <div className="space-y-3">
              <Checkbox
                label="Validar números de incidente"
                description="Verificar formato y unicidad de números de incidente"
                checked={settings.validateIncidentNumbers}
                onChange={(e) => handleSettingChange('validateIncidentNumbers', e.target.checked)}
              />
              
              <Checkbox
                label="Validar fechas de visita"
                description="Comprobar que las fechas estén en formato correcto"
                checked={settings.validateDates}
                onChange={(e) => handleSettingChange('validateDates', e.target.checked)}
              />
              
              <Checkbox
                label="Validar información de contacto"
                description="Verificar formato de emails y teléfonos"
                checked={settings.validateContactInfo}
                onChange={(e) => handleSettingChange('validateContactInfo', e.target.checked)}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <Icon name="Bell" size={16} />
              <span>Notificaciones</span>
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Notificar al completar procesamiento"
                description="Recibir notificación cuando termine el lote"
                checked={settings.notifyOnCompletion}
                onChange={(e) => handleSettingChange('notifyOnCompletion', e.target.checked)}
              />
              
              <Checkbox
                label="Notificar errores críticos"
                description="Alertar sobre archivos que no se pueden procesar"
                checked={settings.notifyOnErrors}
                onChange={(e) => handleSettingChange('notifyOnErrors', e.target.checked)}
              />
              
              <Checkbox
                label="Resumen diario por email"
                description="Enviar resumen de procesamiento al final del día"
                checked={settings.dailyEmailSummary}
                onChange={(e) => handleSettingChange('dailyEmailSummary', e.target.checked)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            fullWidth
            iconName="Play"
            iconPosition="left"
            onClick={onStartProcessing}
            disabled={!canProcess}
          >
            Iniciar Procesamiento
          </Button>
          
          <Button
            variant="outline"
            iconName="RotateCcw"
            onClick={() => onSettingsChange({
              ocrSensitivity: 'medium',
              confidenceThreshold: 85,
              validationRules: 'moderate',
              validateIncidentNumbers: true,
              validateDates: true,
              validateContactInfo: true,
              notifyOnCompletion: true,
              notifyOnErrors: true,
              dailyEmailSummary: false
            })}
          >
            Restablecer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProcessingSettings;