import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportBuilder from './components/ReportBuilder';
import ReportPreview from './components/ReportPreview';
import ExportOptions from './components/ExportOptions';
import ReportHistory from './components/ReportHistory';
import ScheduledReports from './components/ScheduledReports';

const ReportsExport = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedTemplate, setSelectedTemplate] = useState('monthly_summary');
  const [reportConfig, setReportConfig] = useState({
    dateRange: 'last_30_days',
    units: [],
    engineers: [],
    metrics: ['response_time', 'technical_knowledge', 'presentation', 'overall_satisfaction'],
    includeComments: true,
    includeCharts: true,
    groupBy: 'unit'
  });

  const tabs = [
    { id: 'builder', label: 'Constructor', icon: 'Settings' },
    { id: 'preview', label: 'Vista Previa', icon: 'Eye' },
    { id: 'export', label: 'Exportar', icon: 'Download' },
    { id: 'history', label: 'Historial', icon: 'Clock' },
    { id: 'scheduled', label: 'Programados', icon: 'Calendar' }
  ];

  const handlePreviewUpdate = (config) => {
    setReportConfig(config);
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleExport = (exportSettings) => {
    console.log('Exporting report with settings:', exportSettings);
    // Implement export logic here
  };

  const quickActions = [
    {
      title: 'Exportación Rápida Excel',
      description: 'Generar informe mensual en Excel',
      icon: 'FileSpreadsheet',
      action: () => console.log('Quick Excel export')
    },
    {
      title: 'Informe PDF Ejecutivo',
      description: 'Resumen para dirección en PDF',
      icon: 'FileText',
      action: () => console.log('Executive PDF export')
    },
    {
      title: 'Datos CSV Completos',
      description: 'Exportar todos los datos sin procesar',
      icon: 'Database',
      action: () => console.log('CSV data export')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Informes y Exportación</h1>
              <p className="text-muted-foreground mt-2">
                Genera informes personalizados y exporta datos de encuestas de satisfacción
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Ayuda
              </Button>
              <Button variant="default" size="sm">
                <Icon name="Zap" size={16} className="mr-2" />
                Exportación Rápida
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={action.action}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={action.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="flex items-center space-x-1 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'builder' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <ReportBuilder
                    onPreviewUpdate={handlePreviewUpdate}
                    selectedTemplate={selectedTemplate}
                    onTemplateChange={handleTemplateChange}
                  />
                </div>
                <div className="lg:col-span-2">
                  <ReportPreview
                    reportConfig={reportConfig}
                    selectedTemplate={selectedTemplate}
                  />
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <ReportPreview
                reportConfig={reportConfig}
                selectedTemplate={selectedTemplate}
              />
            )}

            {activeTab === 'export' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <ExportOptions
                    reportConfig={reportConfig}
                    onExport={handleExport}
                  />
                </div>
                <div className="lg:col-span-2">
                  <ReportPreview
                    reportConfig={reportConfig}
                    selectedTemplate={selectedTemplate}
                  />
                </div>
              </div>
            )}

            {activeTab === 'history' && <ReportHistory />}

            {activeTab === 'scheduled' && <ScheduledReports />}
          </div>

          {/* Statistics Footer */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Estadísticas de Exportación</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">247</div>
                <div className="text-sm text-muted-foreground">Informes Generados</div>
                <div className="text-xs text-muted-foreground mt-1">Este mes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">1,847</div>
                <div className="text-sm text-muted-foreground">Descargas Totales</div>
                <div className="text-xs text-muted-foreground mt-1">Últimos 30 días</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">12</div>
                <div className="text-sm text-muted-foreground">Programas Activos</div>
                <div className="text-xs text-muted-foreground mt-1">Automatizados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98.5%</div>
                <div className="text-sm text-muted-foreground">Tasa de Éxito</div>
                <div className="text-xs text-muted-foreground mt-1">Exportaciones</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsExport;