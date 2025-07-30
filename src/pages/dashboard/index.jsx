import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import KPICard from './components/KPICard';
import FileUploadZone from './components/FileUploadZone';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import SatisfactionChart from './components/SatisfactionChart';
import ProcessingStatus from './components/ProcessingStatus';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleFilesSelected = (files) => {
    console.log('Archivos seleccionados:', files);
    // Here you would typically handle the file upload logic
  };

  const kpiData = [
    {
      title: 'Encuestas Procesadas',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Archivos Pendientes',
      value: '23',
      change: '-8%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Errores de Procesamiento',
      value: '3',
      change: '-50%',
      changeType: 'positive',
      icon: 'AlertTriangle',
      color: 'error'
    },
    {
      title: 'Tasa de Completitud',
      value: '97.8%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'success'
    }
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Panel de Control - SurveyDigitizer</title>
        <meta name="description" content="Panel principal para monitorear el procesamiento de encuestas PDF y análisis de satisfacción del servicio" />
      </Helmet>

      <Header />
      
      <main className="pt-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Panel de Control
                </h1>
                <p className="text-muted-foreground">
                  Bienvenido de vuelta. Aquí tienes un resumen de la actividad de procesamiento de encuestas.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <div className="text-sm text-muted-foreground">
                  {formatDate(currentTime)}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {formatTime(currentTime)}
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - File Upload */}
            <div className="lg:col-span-2">
              <FileUploadZone onFilesSelected={handleFilesSelected} />
            </div>

            {/* Right Column - Quick Actions */}
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Processing Status */}
            <div>
              <ProcessingStatus />
            </div>

            {/* Activity Feed */}
            <div>
              <ActivityFeed />
            </div>
          </div>

          {/* Charts Section */}
          <div className="mb-8">
            <SatisfactionChart />
          </div>

          {/* Footer Stats */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground mb-1">156</div>
                <div className="text-sm text-muted-foreground">Encuestas Hoy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-1">2,847</div>
                <div className="text-sm text-muted-foreground">Este Mes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-1">98.5%</div>
                <div className="text-sm text-muted-foreground">Precisión OCR</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-1">4.2/5</div>
                <div className="text-sm text-muted-foreground">Satisfacción Promedio</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;