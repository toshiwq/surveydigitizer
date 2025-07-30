import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DetailPanel = ({ survey, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!survey) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Selecciona una Encuesta</h3>
        <p className="text-sm text-muted-foreground">
          Haz clic en una fila de la tabla para ver los detalles completos de la encuesta
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'details', label: 'Detalles', icon: 'FileText' },
    { id: 'ratings', label: 'Valoraciones', icon: 'Star' },
    { id: 'comments', label: 'Comentarios', icon: 'MessageSquare' },
    { id: 'history', label: 'Historial', icon: 'Clock' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'procesado':
        return 'text-success bg-success/10 border-success/20';
      case 'validado':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'pendiente':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getSatisfactionStars = (rating) => {
    const ratings = { 'excelente': 5, 'bueno': 4, 'regular': 3, 'malo': 2 };
    const stars = ratings[rating] || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < stars ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Número de Incidente</label>
            <p className="text-lg font-semibold text-foreground">{survey.incidentNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Fecha de Visita</label>
            <p className="text-sm text-foreground">{survey.visitDate}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Estado</label>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(survey.status)}`}>
              {survey.status}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Unidad</label>
            <p className="text-sm text-foreground">{survey.unitName}</p>
            <p className="text-xs text-muted-foreground">#{survey.unitNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Ingeniero</label>
            <p className="text-sm text-foreground">{survey.engineerName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Confianza de Extracción</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${survey.confidenceScore}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">{survey.confidenceScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Información de Contacto</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Cliente</label>
            <p className="text-sm text-foreground">{survey.customerName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
            <p className="text-sm text-foreground">{survey.customerPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRatingsTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Tiempo de Respuesta</label>
            <div className="flex items-center space-x-1">
              {getSatisfactionStars(survey.responseTime)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{survey.responseTime}</p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Conocimiento Técnico</label>
            <div className="flex items-center space-x-1">
              {getSatisfactionStars(survey.technicalKnowledge)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{survey.technicalKnowledge}</p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Presentación y Cortesía</label>
            <div className="flex items-center space-x-1">
              {getSatisfactionStars(survey.presentation)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{survey.presentation}</p>
        </div>
        
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Satisfacción General</label>
            <div className="flex items-center space-x-1">
              {getSatisfactionStars(survey.overallSatisfaction)}
            </div>
          </div>
          <p className="text-sm text-primary font-medium capitalize">{survey.overallSatisfaction}</p>
        </div>
      </div>
    </div>
  );

  const renderCommentsTab = () => (
    <div className="space-y-4">
      <div className="p-4 bg-muted/30 rounded-lg">
        <label className="text-sm font-medium text-foreground mb-2 block">Comentarios del Cliente</label>
        <p className="text-sm text-foreground leading-relaxed">
          {survey.comments || 'No hay comentarios disponibles para esta encuesta.'}
        </p>
      </div>
      
      {survey.extractedText && (
        <div className="p-4 bg-muted/30 rounded-lg">
          <label className="text-sm font-medium text-foreground mb-2 block">Texto Extraído (OCR)</label>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed bg-background p-3 rounded border">
            {survey.extractedText}
          </p>
        </div>
      )}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        {survey.processingHistory?.map((entry, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{entry.action}</p>
              <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
              {entry.user && (
                <p className="text-xs text-muted-foreground">Por: {entry.user}</p>
              )}
            </div>
          </div>
        )) || (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay historial de procesamiento disponible
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="text-lg font-medium text-foreground">
          Detalles de Encuesta #{survey.incidentNumber}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(survey)}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'ratings' && renderRatingsTab()}
        {activeTab === 'comments' && renderCommentsTab()}
        {activeTab === 'history' && renderHistoryTab()}
      </div>

      {/* PDF Preview */}
      {survey.pdfThumbnail && (
        <div className="border-t border-border p-4">
          <label className="text-sm font-medium text-foreground mb-2 block">Vista Previa del PDF</label>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <Image
              src={survey.pdfThumbnail}
              alt={`Vista previa del PDF - Incidente ${survey.incidentNumber}`}
              className="max-w-full h-48 object-contain mx-auto rounded border"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              className="mt-2"
            >
              Descargar PDF Original
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPanel;