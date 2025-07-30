import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingResults = ({ results, onExportResults, onViewDetails }) => {
  const [selectedResult, setSelectedResult] = useState(null);

  if (!results || results.length === 0) {
    return null;
  }

  const totalRecords = results.reduce((sum, result) => sum + (result.recordCount || 0), 0);
  const averageConfidence = results.reduce((sum, result) => sum + (result.confidence || 0), 0) / results.length;
  const successfulFiles = results.filter(r => r.status === 'completed').length;

  const formatConfidence = (confidence) => {
    return `${Math.round(confidence * 100)}%`;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-success';
    if (confidence >= 0.7) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Resultados del Procesamiento
            </h3>
            <p className="text-sm text-muted-foreground">
              {successfulFiles} archivo{successfulFiles !== 1 ? 's' : ''} procesado{successfulFiles !== 1 ? 's' : ''} exitosamente
            </p>
          </div>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onExportResults}
          >
            Exportar Resultados
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalRecords}</div>
            <div className="text-sm text-muted-foreground">Registros Extraídos</div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className={`text-2xl font-bold ${getConfidenceColor(averageConfidence)}`}>
              {formatConfidence(averageConfidence)}
            </div>
            <div className="text-sm text-muted-foreground">Confianza Promedio</div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">{successfulFiles}</div>
            <div className="text-sm text-muted-foreground">Archivos Exitosos</div>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="p-6">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="FileText" size={16} className="text-muted-foreground flex-shrink-0" />
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {result.fileName}
                    </h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.status === 'completed' 
                        ? 'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                    }`}>
                      {result.status === 'completed' ? 'Exitoso' : 'Error'}
                    </div>
                  </div>
                  
                  {result.status === 'completed' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Registros:</span> {result.recordCount}
                      </div>
                      <div>
                        <span className="font-medium">Confianza:</span>{' '}
                        <span className={getConfidenceColor(result.confidence)}>
                          {formatConfidence(result.confidence)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Tiempo:</span> {result.processingTime}s
                      </div>
                      <div>
                        <span className="font-medium">Errores:</span> {result.errorCount || 0}
                      </div>
                    </div>
                  )}
                  
                  {result.status === 'error' && (
                    <p className="text-xs text-destructive mt-1">
                      {result.error}
                    </p>
                  )}
                  
                  {result.extractedData && result.extractedData.length > 0 && (
                    <div className="mt-3 p-3 bg-muted rounded-md">
                      <h5 className="text-xs font-medium text-foreground mb-2">
                        Vista Previa de Datos:
                      </h5>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {result.extractedData.slice(0, 2).map((record, idx) => (
                          <div key={idx} className="flex items-center space-x-4">
                            <span>Incidente: {record.incidentNumber}</span>
                            <span>Fecha: {record.visitDate}</span>
                            <span>Satisfacción: {record.overallRating}/5</span>
                          </div>
                        ))}
                        {result.extractedData.length > 2 && (
                          <div className="text-xs text-primary">
                            +{result.extractedData.length - 2} registros más...
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {result.status === 'completed' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(result)}
                    />
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    onClick={() => onExportResults([result])}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingResults;