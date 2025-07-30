import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ScheduledReports = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    template: 'monthly_summary',
    frequency: 'monthly',
    dayOfMonth: 1,
    dayOfWeek: 'monday',
    time: '09:00',
    recipients: '',
    format: 'excel',
    active: true
  });

  const mockScheduledReports = [
    {
      id: 'sch_001',
      name: 'Resumen Mensual Automático',
      template: 'monthly_summary',
      frequency: 'monthly',
      schedule: 'Primer día de cada mes a las 09:00',
      recipients: ['director@empresa.com', 'calidad@empresa.com'],
      format: 'excel',
      lastRun: '01/07/2025 09:00',
      nextRun: '01/08/2025 09:00',
      status: 'active',
      runsCompleted: 12,
      runsTotal: 12
    },
    {
      id: 'sch_002',
      name: 'Informe Semanal de Rendimiento',
      template: 'engineer_performance',
      frequency: 'weekly',
      schedule: 'Todos los lunes a las 08:30',
      recipients: ['supervisores@empresa.com'],
      format: 'pdf',
      lastRun: '29/07/2025 08:30',
      nextRun: '05/08/2025 08:30',
      status: 'active',
      runsCompleted: 48,
      runsTotal: 52
    },
    {
      id: 'sch_003',
      name: 'Análisis Trimestral de Tendencias',
      template: 'trend_analysis',
      frequency: 'quarterly',
      schedule: 'Primer día de cada trimestre a las 10:00',
      recipients: ['gerencia@empresa.com', 'analistas@empresa.com'],
      format: 'pdf',
      lastRun: '01/07/2025 10:00',
      nextRun: '01/10/2025 10:00',
      status: 'active',
      runsCompleted: 4,
      runsTotal: 4
    },
    {
      id: 'sch_004',
      name: 'Exportación Diaria de Datos',
      template: 'custom',
      frequency: 'daily',
      schedule: 'Todos los días a las 23:30',
      recipients: ['sistemas@empresa.com'],
      format: 'csv',
      lastRun: '29/07/2025 23:30',
      nextRun: '30/07/2025 23:30',
      status: 'paused',
      runsCompleted: 180,
      runsTotal: 210
    }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'quarterly', label: 'Trimestral' }
  ];

  const templateOptions = [
    { value: 'monthly_summary', label: 'Resumen Mensual' },
    { value: 'engineer_performance', label: 'Rendimiento de Ingenieros' },
    { value: 'trend_analysis', label: 'Análisis de Tendencias' },
    { value: 'unit_comparison', label: 'Comparación de Unidades' },
    { value: 'custom', label: 'Personalizado' }
  ];

  const formatOptions = [
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'pdf', label: 'PDF (.pdf)' },
    { value: 'csv', label: 'CSV (.csv)' }
  ];

  const dayOfWeekOptions = [
    { value: 'monday', label: 'Lunes' },
    { value: 'tuesday', label: 'Martes' },
    { value: 'wednesday', label: 'Miércoles' },
    { value: 'thursday', label: 'Jueves' },
    { value: 'friday', label: 'Viernes' },
    { value: 'saturday', label: 'Sábado' },
    { value: 'sunday', label: 'Domingo' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success bg-success/10',
      paused: 'text-warning bg-warning/10',
      error: 'text-destructive bg-destructive/10'
    };
    return colors[status] || 'text-muted-foreground bg-muted/10';
  };

  const getStatusLabel = (status) => {
    const labels = {
      active: 'Activo',
      paused: 'Pausado',
      error: 'Error'
    };
    return labels[status] || status;
  };

  const getFrequencyLabel = (frequency) => {
    const labels = {
      daily: 'Diario',
      weekly: 'Semanal',
      monthly: 'Mensual',
      quarterly: 'Trimestral'
    };
    return labels[frequency] || frequency;
  };

  const handleCreateSchedule = () => {
    console.log('Creating scheduled report:', newSchedule);
    setShowCreateForm(false);
    setNewSchedule({
      name: '',
      template: 'monthly_summary',
      frequency: 'monthly',
      dayOfMonth: 1,
      dayOfWeek: 'monday',
      time: '09:00',
      recipients: '',
      format: 'excel',
      active: true
    });
  };

  const handleToggleStatus = (scheduleId) => {
    console.log('Toggling status for schedule:', scheduleId);
  };

  const handleDeleteSchedule = (scheduleId) => {
    console.log('Deleting schedule:', scheduleId);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Informes Programados</h3>
        <Button variant="default" size="sm" onClick={() => setShowCreateForm(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Nuevo Programa
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="p-6 border-b border-border bg-muted/30">
          <h4 className="text-md font-medium text-foreground mb-4">Crear Informe Programado</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre del Programa"
              value={newSchedule.name}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ej: Resumen Semanal de Calidad"
            />
            
            <Select
              label="Plantilla"
              options={templateOptions}
              value={newSchedule.template}
              onChange={(value) => setNewSchedule(prev => ({ ...prev, template: value }))}
            />
            
            <Select
              label="Frecuencia"
              options={frequencyOptions}
              value={newSchedule.frequency}
              onChange={(value) => setNewSchedule(prev => ({ ...prev, frequency: value }))}
            />
            
            {newSchedule.frequency === 'weekly' && (
              <Select
                label="Día de la Semana"
                options={dayOfWeekOptions}
                value={newSchedule.dayOfWeek}
                onChange={(value) => setNewSchedule(prev => ({ ...prev, dayOfWeek: value }))}
              />
            )}
            
            {newSchedule.frequency === 'monthly' && (
              <Input
                label="Día del Mes"
                type="number"
                min="1"
                max="31"
                value={newSchedule.dayOfMonth}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, dayOfMonth: parseInt(e.target.value) }))}
              />
            )}
            
            <Input
              label="Hora"
              type="time"
              value={newSchedule.time}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
            />
            
            <Select
              label="Formato"
              options={formatOptions}
              value={newSchedule.format}
              onChange={(value) => setNewSchedule(prev => ({ ...prev, format: value }))}
            />
            
            <div className="md:col-span-2">
              <Input
                label="Destinatarios"
                description="Direcciones de email separadas por comas"
                value={newSchedule.recipients}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, recipients: e.target.value }))}
                placeholder="usuario1@empresa.com, usuario2@empresa.com"
              />
            </div>
            
            <div className="md:col-span-2">
              <Checkbox
                label="Activar inmediatamente"
                checked={newSchedule.active}
                onChange={(e) => setNewSchedule(prev => ({ ...prev, active: e.target.checked }))}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-6">
            <Button variant="default" onClick={handleCreateSchedule}>
              <Icon name="Check" size={16} className="mr-2" />
              Crear Programa
            </Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Scheduled Reports List */}
      <div className="max-h-[400px] overflow-y-auto">
        <div className="divide-y divide-border">
          {mockScheduledReports.map((schedule) => (
            <div key={schedule.id} className="p-6 hover:bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{schedule.name}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                      {getStatusLabel(schedule.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <div className="font-medium text-foreground mb-1">Programación</div>
                      <div>{schedule.schedule}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-foreground mb-1">Destinatarios</div>
                      <div>{schedule.recipients.length} destinatarios</div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-foreground mb-1">Ejecuciones</div>
                      <div>{schedule.runsCompleted}/{schedule.runsTotal} completadas</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>Última: {schedule.lastRun}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>Próxima: {schedule.nextRun}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="FileText" size={14} />
                      <span>{schedule.format.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleStatus(schedule.id)}
                  >
                    <Icon name={schedule.status === 'active' ? 'Pause' : 'Play'} size={16} className="mr-2" />
                    {schedule.status === 'active' ? 'Pausar' : 'Activar'}
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Editar
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progreso de ejecuciones</span>
                  <span>{Math.round((schedule.runsCompleted / schedule.runsTotal) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(schedule.runsCompleted / schedule.runsTotal) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
        <div className="text-sm text-muted-foreground">
          {mockScheduledReports.filter(s => s.status === 'active').length} programas activos de {mockScheduledReports.length} totales
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Configuración Global
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduledReports;