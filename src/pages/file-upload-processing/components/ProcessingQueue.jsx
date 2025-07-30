import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import FilePreviewCard from './FilePreviewCard';

const ProcessingQueue = ({ 
  files, 
  onRemoveFile, 
  onClearAll, 
  onPauseProcessing, 
  onResumeProcessing, 
  isProcessing, 
  isPaused 
}) => {
  const totalFiles = files.length;
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const errorFiles = files.filter(f => f.status === 'error').length;
  const processingFiles = files.filter(f => f.status === 'processing').length;
  const pendingFiles = files.filter(f => f.status === 'pending').length;

  const overallProgress = totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 0;

  if (files.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileStack" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Cola de Procesamiento Vacía
        </h3>
        <p className="text-sm text-muted-foreground">
          Los archivos seleccionados aparecerán aquí para su procesamiento
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Cola de Procesamiento
            </h3>
            <p className="text-sm text-muted-foreground">
              {totalFiles} archivo{totalFiles !== 1 ? 's' : ''} en cola
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {isProcessing && !isPaused && (
              <Button
                variant="outline"
                size="sm"
                iconName="Pause"
                onClick={onPauseProcessing}
              >
                Pausar
              </Button>
            )}
            
            {isPaused && (
              <Button
                variant="outline"
                size="sm"
                iconName="Play"
                onClick={onResumeProcessing}
              >
                Reanudar
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={onClearAll}
              disabled={isProcessing}
            >
              Limpiar Todo
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progreso General</span>
            <span className="font-medium text-foreground">{overallProgress}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-lg font-semibold text-warning">{pendingFiles}</div>
              <div className="text-xs text-muted-foreground">Pendientes</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-primary">{processingFiles}</div>
              <div className="text-xs text-muted-foreground">Procesando</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-success">{completedFiles}</div>
              <div className="text-xs text-muted-foreground">Completados</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold text-destructive">{errorFiles}</div>
              <div className="text-xs text-muted-foreground">Errores</div>
            </div>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="p-6">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {files.map((file) => (
            <FilePreviewCard
              key={file.id}
              file={file}
              onRemove={onRemoveFile}
              isProcessing={isProcessing}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingQueue;