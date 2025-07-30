import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilePreviewCard = ({ file, onRemove, isProcessing }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case 'pending':
        return { name: 'Clock', color: 'text-warning' };
      case 'processing':
        return { name: 'Loader2', color: 'text-primary animate-spin' };
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { name: 'XCircle', color: 'text-destructive' };
      default:
        return { name: 'File', color: 'text-muted-foreground' };
    }
  };

  const getStatusText = () => {
    switch (file.status) {
      case 'pending':
        return 'Pendiente';
      case 'processing':
        return 'Procesando...';
      case 'completed':
        return 'Completado';
      case 'error':
        return 'Error';
      default:
        return 'Listo';
    }
  };

  const statusIcon = getStatusIcon();

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="FileText" size={20} className="text-destructive" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-foreground truncate" title={file.name}>
              {file.name}
            </h4>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
              <div className="flex items-center space-x-1">
                <Icon name={statusIcon.name} size={14} className={statusIcon.color} />
                <span className={`text-xs ${statusIcon.color.replace('animate-spin', '')}`}>
                  {getStatusText()}
                </span>
              </div>
            </div>
            
            {file.status === 'processing' && (
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${file.progress || 0}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {file.progress || 0}% completado
                </span>
              </div>
            )}
            
            {file.status === 'error' && file.error && (
              <p className="text-xs text-destructive mt-1">
                {file.error}
              </p>
            )}
            
            {file.status === 'completed' && file.extractedData && (
              <div className="mt-2 text-xs text-muted-foreground">
                <span>Datos extraídos: {file.extractedData.recordCount} registros</span>
                {file.extractedData.confidence && (
                  <span className="ml-2">
                    Confianza: {Math.round(file.extractedData.confidence * 100)}%
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-2">
          {file.status === 'error' && (
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={() => onRemove(file.id, 'retry')}
              disabled={isProcessing}
            />
          )}
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={() => onRemove(file.id)}
            disabled={isProcessing && file.status === 'processing'}
          />
        </div>
      </div>
    </div>
  );
};

export default FilePreviewCard;