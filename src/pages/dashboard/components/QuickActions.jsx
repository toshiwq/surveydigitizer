import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Subir Encuestas',
      description: 'Procesar nuevos archivos PDF',
      icon: 'Upload',
      color: 'bg-primary text-primary-foreground',
      onClick: () => navigate('/file-upload-processing')
    },
    {
      title: 'Ver Reportes',
      description: 'Analizar datos y tendencias',
      icon: 'BarChart3',
      color: 'bg-success text-success-foreground',
      onClick: () => navigate('/analytics-dashboard')
    },
    {
      title: 'Exportar Datos',
      description: 'Descargar información en Excel',
      icon: 'Download',
      color: 'bg-warning text-warning-foreground',
      onClick: () => navigate('/reports-export')
    },
    {
      title: 'Gestionar Datos',
      description: 'Administrar encuestas procesadas',
      icon: 'Database',
      color: 'bg-secondary text-secondary-foreground',
      onClick: () => navigate('/survey-data-management')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:border-primary/50 text-left group"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div>
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {action.title}
                </h4>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estado del Sistema</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-success font-medium">Operativo</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Archivos en Cola</span>
          <span className="text-foreground font-medium">3 procesando</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;