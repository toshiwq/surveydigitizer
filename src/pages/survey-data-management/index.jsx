import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DataTable from './components/DataTable';
import FilterPanel from './components/FilterPanel';
import DetailPanel from './components/DetailPanel';
import MobileDataView from './components/MobileDataView';

const SurveyDataManagement = () => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  // Mock survey data
  const mockSurveys = [
    {
      id: 1,
      incidentNumber: "INC-2025-001",
      visitDate: "2025-01-15",
      unitName: "Madrid Centro",
      unitNumber: "MC-001",
      engineerName: "Carlos Martínez",
      customerName: "María González",
      customerPhone: "+34 612 345 678",
      responseTime: "excelente",
      technicalKnowledge: "bueno",
      presentation: "excelente",
      overallSatisfaction: "excelente",
      status: "procesado",
      confidenceScore: 95,
      comments: `El servicio fue excepcional. El ingeniero llegó puntual y resolvió el problema de manera eficiente.\nMuy profesional en su trato y explicó claramente los pasos realizados.`,
      extractedText: "ENCUESTA SATISFACCION [X] EXCELENTE [ ] BUENO [ ] REGULAR [ ] MALO",
      pdfThumbnail: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop",
      processingHistory: [
        { action: "PDF procesado automáticamente", timestamp: "2025-01-15 10:30", user: "Sistema" },
        { action: "Datos validados manualmente", timestamp: "2025-01-15 11:15", user: "Ana Rodríguez" },
        { action: "Estado actualizado a procesado", timestamp: "2025-01-15 11:20", user: "Ana Rodríguez" }
      ]
    },
    {
      id: 2,
      incidentNumber: "INC-2025-002",
      visitDate: "2025-01-14",
      unitName: "Barcelona Norte",
      unitNumber: "BN-002",
      engineerName: "Ana Rodríguez",
      customerName: "José Luis Pérez",
      customerPhone: "+34 623 456 789",
      responseTime: "bueno",
      technicalKnowledge: "excelente",
      presentation: "bueno",
      overallSatisfaction: "bueno",
      status: "validado",
      confidenceScore: 88,
      comments: `Buen servicio en general. El técnico demostró conocimiento pero tardó más de lo esperado.\nLa solución fue efectiva aunque el tiempo de respuesta podría mejorar.`,
      extractedText: "TIEMPO RESPUESTA [X] BUENO CONOCIMIENTO [X] EXCELENTE",
      pdfThumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop",
      processingHistory: [
        { action: "PDF cargado", timestamp: "2025-01-14 14:20", user: "Sistema" },
        { action: "Extracción OCR completada", timestamp: "2025-01-14 14:22", user: "Sistema" },
        { action: "Revisión manual completada", timestamp: "2025-01-14 15:45", user: "Miguel López" }
      ]
    },
    {
      id: 3,
      incidentNumber: "INC-2025-003",
      visitDate: "2025-01-13",
      unitName: "Valencia Sur",
      unitNumber: "VS-003",
      engineerName: "Miguel López",
      customerName: "Carmen Ruiz",
      customerPhone: "+34 634 567 890",
      responseTime: "regular",
      technicalKnowledge: "bueno",
      presentation: "regular",
      overallSatisfaction: "regular",
      status: "pendiente",
      confidenceScore: 72,
      comments: `El servicio fue aceptable pero hay margen de mejora.\nEl técnico resolvió el problema pero la comunicación podría ser más clara.`,
      extractedText: "SATISFACCION GENERAL [X] REGULAR PRESENTACION [X] REGULAR",
      pdfThumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      processingHistory: [
        { action: "PDF procesado", timestamp: "2025-01-13 16:10", user: "Sistema" },
        { action: "Requiere revisión manual", timestamp: "2025-01-13 16:12", user: "Sistema" }
      ]
    },
    {
      id: 4,
      incidentNumber: "INC-2025-004",
      visitDate: "2025-01-12",
      unitName: "Sevilla Este",
      unitNumber: "SE-004",
      engineerName: "Laura García",
      customerName: "Antonio Jiménez",
      customerPhone: "+34 645 678 901",
      responseTime: "malo",
      technicalKnowledge: "regular",
      presentation: "malo",
      overallSatisfaction: "malo",
      status: "error",
      confidenceScore: 45,
      comments: `Muy insatisfecho con el servicio. El técnico llegó tarde y no pudo resolver el problema completamente.\nLa actitud fue poco profesional y no explicó bien los procedimientos.`,
      extractedText: "ERROR EN EXTRACCION - TEXTO ILEGIBLE",
      pdfThumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop",
      processingHistory: [
        { action: "PDF cargado con errores", timestamp: "2025-01-12 09:30", user: "Sistema" },
        { action: "Error en extracción OCR", timestamp: "2025-01-12 09:32", user: "Sistema" },
        { action: "Marcado para revisión manual", timestamp: "2025-01-12 09:35", user: "Sistema" }
      ]
    },
    {
      id: 5,
      incidentNumber: "INC-2025-005",
      visitDate: "2025-01-11",
      unitName: "Bilbao Oeste",
      unitNumber: "BO-005",
      engineerName: "David Sánchez",
      customerName: "Isabel Moreno",
      customerPhone: "+34 656 789 012",
      responseTime: "excelente",
      technicalKnowledge: "excelente",
      presentation: "excelente",
      overallSatisfaction: "excelente",
      status: "procesado",
      confidenceScore: 98,
      comments: `Servicio impecable. El ingeniero fue muy profesional, puntual y resolvió todos los problemas de manera eficiente.\nExcelente comunicación y seguimiento post-servicio.`,
      extractedText: "TODAS LAS VALORACIONES [X] EXCELENTE",
      pdfThumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=400&fit=crop",
      processingHistory: [
        { action: "PDF procesado exitosamente", timestamp: "2025-01-11 13:45", user: "Sistema" },
        { action: "Validación automática completada", timestamp: "2025-01-11 13:47", user: "Sistema" },
        { action: "Datos confirmados", timestamp: "2025-01-11 14:00", user: "Laura García" }
      ]
    }
  ];

  useEffect(() => {
    setSurveys(mockSurveys);
    setFilteredSurveys(mockSurveys);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalPages = Math.ceil(filteredSurveys.length / pageSize);
  const paginatedSurveys = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSurveys.slice(startIndex, startIndex + pageSize);
  }, [filteredSurveys, currentPage, pageSize]);

  const handleFilter = (filters) => {
    let filtered = [...surveys];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(survey =>
        survey.incidentNumber.toLowerCase().includes(searchLower) ||
        survey.engineerName.toLowerCase().includes(searchLower) ||
        survey.customerName.toLowerCase().includes(searchLower) ||
        survey.unitName.toLowerCase().includes(searchLower) ||
        (survey.comments && survey.comments.toLowerCase().includes(searchLower))
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(survey => survey.visitDate >= filters.dateFrom);
    }

    if (filters.dateTo) {
      filtered = filtered.filter(survey => survey.visitDate <= filters.dateTo);
    }

    if (filters.unit) {
      filtered = filtered.filter(survey => survey.unitName.toLowerCase().includes(filters.unit));
    }

    if (filters.engineer) {
      filtered = filtered.filter(survey => survey.engineerName.toLowerCase().includes(filters.engineer));
    }

    if (filters.satisfaction) {
      filtered = filtered.filter(survey => survey.overallSatisfaction === filters.satisfaction);
    }

    if (filters.status) {
      filtered = filtered.filter(survey => survey.status === filters.status);
    }

    setFilteredSurveys(filtered);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilteredSurveys(surveys);
    setCurrentPage(1);
  };

  const handleEdit = (updatedSurvey) => {
    const updatedSurveys = surveys.map(survey =>
      survey.id === updatedSurvey.id ? updatedSurvey : survey
    );
    setSurveys(updatedSurveys);
    setFilteredSurveys(updatedSurveys);
    
    if (selectedSurvey && selectedSurvey.id === updatedSurvey.id) {
      setSelectedSurvey(updatedSurvey);
    }
  };

  const handleSelect = (surveyIds) => {
    setSelectedRows(surveyIds);
    
    if (surveyIds.length === 1) {
      const survey = surveys.find(s => s.id === surveyIds[0]);
      setSelectedSurvey(survey);
      setShowDetailPanel(true);
    } else {
      setSelectedSurvey(null);
      setShowDetailPanel(false);
    }
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'export':
        console.log('Exportando encuestas seleccionadas:', selectedRows);
        break;
      case 'validate':
        const validatedSurveys = surveys.map(survey =>
          selectedRows.includes(survey.id) ? { ...survey, status: 'validado' } : survey
        );
        setSurveys(validatedSurveys);
        setFilteredSurveys(validatedSurveys);
        break;
      case 'delete':
        if (window.confirm(`¿Estás seguro de que quieres eliminar ${selectedRows.length} encuesta(s)?`)) {
          const remainingSurveys = surveys.filter(survey => !selectedRows.includes(survey.id));
          setSurveys(remainingSurveys);
          setFilteredSurveys(remainingSurveys);
          setSelectedRows([]);
        }
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleCloseDetail = () => {
    setSelectedSurvey(null);
    setShowDetailPanel(false);
    setSelectedRows([]);
  };

  const getStatusCounts = () => {
    return {
      total: surveys.length,
      procesado: surveys.filter(s => s.status === 'procesado').length,
      pendiente: surveys.filter(s => s.status === 'pendiente').length,
      error: surveys.filter(s => s.status === 'error').length,
      validado: surveys.filter(s => s.status === 'validado').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[60px]">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Gestión de Datos de Encuestas
              </h1>
              <p className="text-muted-foreground">
                Visualiza, edita y valida la información extraída de las encuestas de satisfacción
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => console.log('Exportar todos los datos')}
              >
                Exportar Todo
              </Button>
              <Button
                variant="default"
                iconName="Upload"
                onClick={() => window.location.href = '/file-upload-processing'}
              >
                Procesar Más PDFs
              </Button>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-semibold text-foreground">{statusCounts.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Procesadas</p>
                  <p className="text-xl font-semibold text-foreground">{statusCounts.procesado}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-xl font-semibold text-foreground">{statusCounts.pendiente}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={20} className="text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Con Errores</p>
                  <p className="text-xl font-semibold text-foreground">{statusCounts.error}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Validadas</p>
                  <p className="text-xl font-semibold text-foreground">{statusCounts.validado}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <div className="mb-6">
            <FilterPanel
              onFilter={handleFilter}
              onReset={handleResetFilters}
              isCollapsed={isFilterCollapsed}
              onToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
            />
          </div>

          {/* Main Content */}
          <div className={`grid gap-6 ${showDetailPanel && !isMobile ? 'lg:grid-cols-3' : 'grid-cols-1'}`}>
            {/* Data Table/Mobile View */}
            <div className={showDetailPanel && !isMobile ? 'lg:col-span-2' : 'col-span-1'}>
              {isMobile ? (
                <MobileDataView
                  surveys={paginatedSurveys}
                  onEdit={handleEdit}
                  onSelect={handleSelect}
                  selectedRows={selectedRows}
                  onBulkAction={handleBulkAction}
                />
              ) : (
                <DataTable
                  surveys={paginatedSurveys}
                  onEdit={handleEdit}
                  onSelect={handleSelect}
                  selectedRows={selectedRows}
                  onBulkAction={handleBulkAction}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  pageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                />
              )}
            </div>

            {/* Detail Panel */}
            {showDetailPanel && !isMobile && (
              <div className="lg:col-span-1">
                <DetailPanel
                  survey={selectedSurvey}
                  onClose={handleCloseDetail}
                  onEdit={handleEdit}
                />
              </div>
            )}
          </div>

          {/* Mobile Detail Modal */}
          {showDetailPanel && isMobile && selectedSurvey && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-card rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <DetailPanel
                  survey={selectedSurvey}
                  onClose={handleCloseDetail}
                  onEdit={handleEdit}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SurveyDataManagement;