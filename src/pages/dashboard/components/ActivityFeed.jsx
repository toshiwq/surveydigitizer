import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'upload',
      message: 'Se procesaron 15 encuestas PDF exitosamente',
      user: 'María González',
      time: 'hace 5 min',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'error',
      message: 'Error al procesar encuesta_batch_003.pdf',
      user: 'Sistema',
      time: 'hace 12 min',
      icon: 'AlertCircle',
      color: 'text-error'
    },
    {
      id: 3,
      type: 'export',
      message: 'Reporte mensual exportado a Excel',
      user: 'Carlos Ruiz',
      time: 'hace 25 min',
      icon: 'Download',
      color: 'text-primary'
    },
    {
      id: 4,
      type: 'processing',
      message: 'Iniciado procesamiento de lote con 8 archivos',
      user: 'Ana López',
      time: 'hace 35 min',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      id: 5,
      type: 'upload',
      message: 'Se completó la extracción de datos de 22 encuestas',
      user: 'Sistema',
      time: 'hace 1 hora',
      icon: 'Database',
      color: 'text-success'
    },
    {
      id: 6,
      type: 'user',
      message: 'Nuevo usuario agregado al sistema',
      user: 'Admin',
      time: 'hace 2 horas',
      icon: 'UserPlus',
      color: 'text-primary'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Actividad Reciente</h3>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors duration-200">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${activity.color}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground mb-1">{activity.message}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{activity.user}</span>
                <span>•</span>
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" fullWidth>
          Ver Toda la Actividad
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;