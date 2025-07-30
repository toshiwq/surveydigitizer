import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files).filter(
      file => file.type === 'application/pdf'
    );
    
    if (files.length > 0) {
      onFilesSelected(files);
    }
    
    // Reset input value to allow selecting same files again
    e.target.value = '';
  }, [onFilesSelected]);

  return (
    <div className="bg-card rounded-lg border-2 border-dashed border-border p-8">
      <div
        className={`relative transition-all duration-300 ${
          isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        } border-2 border-dashed rounded-lg p-12 text-center`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name="Upload" size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isDragOver ? 'Suelta los archivos aquí' : 'Subir Encuestas PDF'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Arrastra y suelta archivos PDF aquí o haz clic para seleccionar. 
              Soporta procesamiento por lotes de múltiples archivos.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="outline" 
              disabled={isProcessing}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Seleccionar Archivos
            </Button>
            <span className="text-xs text-muted-foreground">
              Máximo 50 archivos, 10MB cada uno
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="FileText" size={14} />
          <span>Solo archivos PDF</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>Datos encriptados</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Zap" size={14} />
          <span>Procesamiento automático</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;