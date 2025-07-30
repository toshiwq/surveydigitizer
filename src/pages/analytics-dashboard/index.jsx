import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import FilterPanel from './components/FilterPanel';
import SatisfactionChart from './components/SatisfactionChart';
import TrendChart from './components/TrendChart';
import EngineerPerformanceChart from './components/EngineerPerformanceChart';
import ExportPanel from './components/ExportPanel';

const AnalyticsDashboard = () => {
  const [filters, setFilters] = useState({});
  const [isFilterPanelCollapsed, setIsFilterPanelCollapsed] = useState(false);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Simulate data refresh
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting with config:', exportConfig);
    // Simulate export process
    setTimeout(() => {
      alert('Informe generado exitosamente. Se descargará automáticamente.');
    }, 2000);
  };

  const metricsData = [
    {
      title: 'Satisfacción promedio',
      value: '87.3%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'Heart',
      color: 'success'
    },
    {
      title: 'Encuestas procesadas',
      value: '1,247',
      change: '+156',
      changeType: 'positive',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Tiempo respuesta promedio',
      value: '4.2/5',
      change: '+0.3',
      changeType: 'positive',
      icon: 'Clock',
      color: 'accent'
    },
    {
      title: 'Índice de mejora',
      value: '+5.8%',
      change: '+1.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[60px]">
        <div className="max-w-[1400px] mx-auto p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Panel de Análisis
              </h1>
              <p className="text-muted-foreground">
                Análisis integral de satisfacción del servicio y rendimiento del equipo
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Última actualización: {lastUpdated.toLocaleTimeString('es-ES')}
              </div>
              <Button
                variant="outline"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Actualizar
              </Button>
              <Button
                variant="default"
                onClick={() => setIsExportPanelOpen(true)}
                iconName="Download"
                iconPosition="left"
              >
                Exportar
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Main Content Layout */}
          <div className="flex gap-6">
            {/* Filter Panel */}
            <FilterPanel
              onFiltersChange={handleFiltersChange}
              isCollapsed={isFilterPanelCollapsed}
              onToggleCollapse={() => setIsFilterPanelCollapsed(!isFilterPanelCollapsed)}
            />

            {/* Charts and Analytics */}
            <div className="flex-1 space-y-8">
              {/* Satisfaction Analysis */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SatisfactionChart
                  title="Distribución de satisfacción"
                  type="pie"
                />
                <SatisfactionChart
                  title="Satisfacción por dimensión"
                  type="bar"
                />
              </div>

              {/* Trend Analysis */}
              <TrendChart title="Tendencias de satisfacción" />

              {/* Engineer Performance */}
              <EngineerPerformanceChart title="Rendimiento por ingeniero" />

              {/* Comparative Analysis Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Análisis comparativo
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Icon name="BarChart3" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Comparación temporal
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Este mes vs anterior
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Satisfacción:</span>
                        <span className="text-sm font-medium text-success">+3.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Respuestas:</span>
                        <span className="text-sm font-medium text-success">+12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tiempo resp.:</span>
                        <span className="text-sm font-medium text-success">+0.4</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Target" size={16} className="text-warning" />
                      <span className="text-sm font-medium text-foreground">
                        Objetivos vs actual
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Meta 85%:</span>
                        <span className="text-sm font-medium text-success">87.3% ✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Meta 1000:</span>
                        <span className="text-sm font-medium text-success">1,247 ✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Meta 4.0:</span>
                        <span className="text-sm font-medium text-success">4.2 ✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Award" size={16} className="text-accent" />
                      <span className="text-sm font-medium text-foreground">
                        Mejores resultados
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mejor unidad:</span>
                        <span className="text-sm font-medium text-foreground">Madrid Centro</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mejor ingeniero:</span>
                        <span className="text-sm font-medium text-foreground">Isabel M.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mejor categoría:</span>
                        <span className="text-sm font-medium text-foreground">Instalación</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistical Significance Indicators */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Indicadores de significancia estadística
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Mejora significativa en satisfacción
                      </p>
                      <p className="text-xs text-muted-foreground">
                        p &lt; 0.05, intervalo de confianza 95%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Variación en tiempo de respuesta
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Requiere monitoreo continuo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Export Panel Modal */}
      {isExportPanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                Exportar análisis
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExportPanelOpen(false)}
                iconName="X"
              />
            </div>
            <div className="p-4">
              <ExportPanel onExport={handleExport} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;