import React, { useState, useCallback, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FileUploadZone from './components/FileUploadZone';
import ProcessingQueue from './components/ProcessingQueue';
import ProcessingSettings from './components/ProcessingSettings';
import ProcessingResults from './components/ProcessingResults';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FileUploadProcessing = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [processingResults, setProcessingResults] = useState([]);
  const [settings, setSettings] = useState({
    ocrSensitivity: 'medium',
    confidenceThreshold: 85,
    validationRules: 'moderate',
    validateIncidentNumbers: true,
    validateDates: true,
    validateContactInfo: true,
    notifyOnCompletion: true,
    notifyOnErrors: true,
    dailyEmailSummary: false
  });

  // Mock data for demonstration
  const mockExtractedData = [
    {
      incidentNumber: 'INC-2024-001',
      visitDate: '15/07/2024',
      unitName: 'Unidad Central Madrid',
      unitNumber: 'UC-001',
      contactInfo: {
        name: 'María García López',
        phone: '+34 612 345 678',
        email: 'maria.garcia@email.com'
      },
      engineerDetails: {
        name: 'Carlos Rodríguez',
        id: 'ENG-456',
        department: 'Soporte Técnico'
      },
      satisfactionRatings: {
        responseTime: 4,
        technicalKnowledge: 5,
        presentationCourtesy: 4,
        overallService: 4
      },
      comments: `El técnico fue muy profesional y resolvió el problema rápidamente.\nExcelente servicio al cliente.`,
      overallRating: 4
    },
    {
      incidentNumber: 'INC-2024-002',
      visitDate: '16/07/2024',
      unitName: 'Unidad Norte Barcelona',
      unitNumber: 'UN-002',
      contactInfo: {
        name: 'José Martínez Ruiz',
        phone: '+34 623 456 789',
        email: 'jose.martinez@empresa.com'
      },
      engineerDetails: {
        name: 'Ana Fernández',
        id: 'ENG-789',
        department: 'Mantenimiento'
      },
      satisfactionRatings: {
        responseTime: 3,
        technicalKnowledge: 4,
        presentationCourtesy: 5,
        overallService: 4
      },
      comments: `Buena atención, aunque el tiempo de respuesta podría mejorar.\nLa técnica demostró gran conocimiento.`,
      overallRating: 4
    }
  ];

  const generateFileId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  };

  const handleFilesSelected = useCallback((selectedFiles) => {
    const newFiles = selectedFiles.map(file => ({
      id: generateFileId(),
      name: file.name,
      size: file.size,
      status: 'pending',
      progress: 0,
      file: file
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const handleRemoveFile = useCallback((fileId, action = 'remove') => {
    if (action === 'retry') {
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.id === fileId 
            ? { ...file, status: 'pending', error: null, progress: 0 }
            : file
        )
      );
    } else {
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    }
  }, []);

  const handleClearAll = useCallback(() => {
    if (!isProcessing) {
      setFiles([]);
      setProcessingResults([]);
    }
  }, [isProcessing]);

  const simulateFileProcessing = useCallback(async (file) => {
    const updateProgress = (progress) => {
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.id === file.id ? { ...f, progress, status: 'processing' } : f
        )
      );
    };

    // Simulate processing steps
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      updateProgress(progress);
    }

    // Simulate random success/error
    const isSuccess = Math.random() > 0.2; // 80% success rate
    
    if (isSuccess) {
      const recordCount = Math.floor(Math.random() * 10) + 1;
      const confidence = 0.7 + Math.random() * 0.3; // 70-100% confidence
      
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.id === file.id
            ? {
                ...f,
                status: 'completed',
                progress: 100,
                extractedData: {
                  recordCount,
                  confidence,
                  data: mockExtractedData.slice(0, recordCount)
                }
              }
            : f
        )
      );

      // Add to results
      setProcessingResults(prevResults => [
        ...prevResults,
        {
          fileName: file.name,
          status: 'completed',
          recordCount,
          confidence,
          processingTime: Math.floor(Math.random() * 30) + 10,
          errorCount: 0,
          extractedData: mockExtractedData.slice(0, recordCount)
        }
      ]);
    } else {
      const errors = [
        'Archivo PDF corrupto o dañado',
        'No se pudieron detectar campos de encuesta',
        'Calidad de imagen insuficiente para OCR',
        'Formato de encuesta no reconocido',
        'Error de conectividad durante el procesamiento'
      ];
      
      const randomError = errors[Math.floor(Math.random() * errors.length)];
      
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.id === file.id
            ? { ...f, status: 'error', error: randomError }
            : f
        )
      );

      setProcessingResults(prevResults => [
        ...prevResults,
        {
          fileName: file.name,
          status: 'error',
          error: randomError
        }
      ]);
    }
  }, []);

  const handleStartProcessing = useCallback(async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    if (pendingFiles.length === 0) return;

    setIsProcessing(true);
    setIsPaused(false);

    // Process files sequentially
    for (const file of pendingFiles) {
      if (isPaused) break;
      await simulateFileProcessing(file);
    }

    setIsProcessing(false);
  }, [files, isPaused, simulateFileProcessing]);

  const handlePauseProcessing = useCallback(() => {
    setIsPaused(true);
    setIsProcessing(false);
  }, []);

  const handleResumeProcessing = useCallback(() => {
    setIsPaused(false);
    handleStartProcessing();
  }, [handleStartProcessing]);

  const handleExportResults = useCallback((results = processingResults) => {
    // Simulate export functionality
    console.log('Exporting results:', results);
    
    // Create mock CSV content
    const csvContent = results
      .filter(r => r.status === 'completed')
      .map(r => `${r.fileName},${r.recordCount},${Math.round(r.confidence * 100)}%`)
      .join('\n');
    
    console.log('CSV Content:', csvContent);
    
    // In a real app, this would trigger a download
    alert('Resultados exportados exitosamente');
  }, [processingResults]);

  const handleViewDetails = useCallback((result) => {
    console.log('Viewing details for:', result);
    // In a real app, this would open a detailed view modal
    alert(`Viendo detalles de: ${result.fileName}`);
  }, []);

  const canProcess = files.some(f => f.status === 'pending') && !isProcessing;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[60px]">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Subida y Procesamiento de Archivos
                </h1>
                <p className="text-muted-foreground">
                  Procesa encuestas PDF por lotes con extracción automática de datos
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Upload and Queue */}
            <div className="xl:col-span-2 space-y-8">
              {/* Upload Zone */}
              <FileUploadZone
                onFilesSelected={handleFilesSelected}
                isProcessing={isProcessing}
              />

              {/* Processing Queue */}
              <ProcessingQueue
                files={files}
                onRemoveFile={handleRemoveFile}
                onClearAll={handleClearAll}
                onPauseProcessing={handlePauseProcessing}
                onResumeProcessing={handleResumeProcessing}
                isProcessing={isProcessing}
                isPaused={isPaused}
              />

              {/* Processing Results */}
              {processingResults.length > 0 && (
                <ProcessingResults
                  results={processingResults}
                  onExportResults={handleExportResults}
                  onViewDetails={handleViewDetails}
                />
              )}
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-8">
              <ProcessingSettings
                settings={settings}
                onSettingsChange={setSettings}
                onStartProcessing={handleStartProcessing}
                canProcess={canProcess}
              />

              {/* Quick Stats */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="BarChart3" size={20} />
                  <span>Estadísticas Rápidas</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Archivos en Cola</span>
                    <span className="font-medium text-foreground">{files.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Procesados Hoy</span>
                    <span className="font-medium text-success">
                      {processingResults.filter(r => r.status === 'completed').length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Errores</span>
                    <span className="font-medium text-destructive">
                      {processingResults.filter(r => r.status === 'error').length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tiempo Promedio</span>
                    <span className="font-medium text-foreground">
                      {processingResults.length > 0
                        ? `${Math.round(
                            processingResults
                              .filter(r => r.processingTime)
                              .reduce((sum, r) => sum + r.processingTime, 0) /
                            processingResults.filter(r => r.processingTime).length
                          )}s`
                        : '0s'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="HelpCircle" size={20} />
                  <span>Ayuda Rápida</span>
                </h3>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <Icon name="FileText" size={14} className="mt-0.5 flex-shrink-0" />
                    <span>Solo archivos PDF de encuestas son soportados</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Icon name="Zap" size={14} className="mt-0.5 flex-shrink-0" />
                    <span>El procesamiento automático extrae datos marcados con [x]</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Icon name="Shield" size={14} className="mt-0.5 flex-shrink-0" />
                    <span>Todos los datos son encriptados durante el procesamiento</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Icon name="Download" size={14} className="mt-0.5 flex-shrink-0" />
                    <span>Los resultados se pueden exportar a Excel</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="mt-4 w-full"
                >
                  Ver Documentación Completa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileUploadProcessing;