import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingStatus = () => {
  const processingQueue = [
    {
      id: 1,
      filename: 'encuesta_lote_julio_001.pdf',
      status: 'processing',
      progress: 75,
      timeRemaining: '2 min',
      startTime: '14:32'
    },
    {
      id: 2,
      filename: 'encuesta_lote_julio_002.pdf',
      status: 'queued',
      progress: 0,
      timeRemaining: '5 min',
      startTime: '14:35'
    },
    {
      id: 3,
      filename: 'encuesta_lote_julio_003.pdf',
      status: 'queued',
      progress: 0,
      timeRemaining: '8 min',
      startTime: '14:38'
    }
  ];

  const recentCompleted = [
    {
      id: 4,
      filename: 'encuesta_satisfaccion_batch_15.pdf',
      recordsExtracted: 23,
      completedTime: '14:28',
      processingTime: '3 min 45 seg'
    },
    {
      id: 5,
      filename: 'encuesta_satisfaccion_batch_14.pdf',
      recordsExtracted: 18,
      completedTime: '14:15',
      processingTime: '2 min 30 seg'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return { icon: 'Loader2', color: 'text-primary', spin: true };
      case 'queued':
        return { icon: 'Clock', color: 'text-warning', spin: false };
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success', spin: false };
      default:
        return { icon: 'AlertCircle', color: 'text-error', spin: false };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Procesando';
      case 'queued':
        return 'En Cola';
      case 'completed':
        return 'Completado';
      default:
        return 'Error';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Estado de Procesamiento</h3>
        <Button variant="outline" size="sm">
          <Icon name="RefreshCw" size={16} />
          Actualizar
        </Button>
      </div>

      {/* Processing Queue */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Cola de Procesamiento</h4>
        <div className="space-y-3">
          {processingQueue.map((item) => {
            const statusInfo = getStatusIcon(item.status);
            return (
              <div key={item.id} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={statusInfo.icon} 
                      size={16} 
                      className={`${statusInfo.color} ${statusInfo.spin ? 'animate-spin' : ''}`} 
                    />
                    <span className="text-sm font-medium text-foreground truncate max-w-xs">
                      {item.filename}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{getStatusText(item.status)}</span>
                    <span>•</span>
                    <span>{item.timeRemaining} restante</span>
                  </div>
                </div>
                
                {item.status === 'processing' && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Completed */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Completados Recientemente</h4>
        <div className="space-y-3">
          {recentCompleted.map((item) => (
            <div key={item.id} className="p-3 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-foreground truncate max-w-xs">
                    {item.filename}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{item.completedTime}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.recordsExtracted} registros extraídos</span>
                <span>Tiempo: {item.processingTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Statistics */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">3</div>
            <div className="text-xs text-muted-foreground">En Proceso</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">47</div>
            <div className="text-xs text-muted-foreground">Completados Hoy</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">2.5 min</div>
            <div className="text-xs text-muted-foreground">Tiempo Promedio</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;