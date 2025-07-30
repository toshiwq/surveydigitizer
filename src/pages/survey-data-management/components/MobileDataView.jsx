import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const MobileDataView = ({ 
  surveys, 
  onEdit, 
  onSelect, 
  selectedRows, 
  onBulkAction 
}) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [editData, setEditData] = useState({});

  const satisfactionOptions = [
    { value: 'excelente', label: 'Excelente' },
    { value: 'bueno', label: 'Bueno' },
    { value: 'regular', label: 'Regular' },
    { value: 'malo', label: 'Malo' }
  ];

  const statusOptions = [
    { value: 'procesado', label: 'Procesado' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'error', label: 'Error' },
    { value: 'validado', label: 'Validado' }
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

  const getSatisfactionColor = (rating) => {
    switch (rating) {
      case 'excelente':
        return 'text-success';
      case 'bueno':
        return 'text-primary';
      case 'regular':
        return 'text-warning';
      case 'malo':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleCardToggle = (surveyId) => {
    setExpandedCard(expandedCard === surveyId ? null : surveyId);
  };

  const handleEdit = (survey) => {
    setEditingCard(survey.id);
    setEditData({ ...survey });
  };

  const handleSave = () => {
    onEdit(editData);
    setEditingCard(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingCard(null);
    setEditData({});
  };

  const handleRowSelect = (surveyId, checked) => {
    if (checked) {
      onSelect([...selectedRows, surveyId]);
    } else {
      onSelect(selectedRows.filter(id => id !== surveyId));
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      {selectedRows.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary">
              {selectedRows.length} elemento{selectedRows.length !== 1 ? 's' : ''} seleccionado{selectedRows.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onBulkAction('export')}
            >
              Exportar
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="CheckCircle"
              onClick={() => onBulkAction('validate')}
            >
              Validar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={() => onBulkAction('delete')}
            >
              Eliminar
            </Button>
          </div>
        </div>
      )}

      {/* Survey Cards */}
      <div className="space-y-3">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className={`bg-card border border-border rounded-lg overflow-hidden transition-all ${
              selectedRows.includes(survey.id) ? 'ring-2 ring-primary/20 border-primary/30' : ''
            }`}
          >
            {/* Card Header */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={selectedRows.includes(survey.id)}
                    onChange={(e) => handleRowSelect(survey.id, e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Incidente #{survey.incidentNumber}
                    </h3>
                    <p className="text-xs text-muted-foreground">{survey.visitDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(survey.status)}`}>
                    {survey.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={expandedCard === survey.id ? "ChevronUp" : "ChevronDown"}
                    onClick={() => handleCardToggle(survey.id)}
                  />
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Unidad:</span>
                  <p className="font-medium text-foreground">{survey.unitName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Ingeniero:</span>
                  <p className="font-medium text-foreground">{survey.engineerName}</p>
                </div>
              </div>

              {/* Satisfaction Rating */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Satisfacción:</span>
                <span className={`text-sm font-medium ${getSatisfactionColor(survey.overallSatisfaction)}`}>
                  {survey.overallSatisfaction}
                </span>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCard === survey.id && (
              <div className="border-t border-border p-4 bg-muted/20">
                {editingCard === survey.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <Input
                        label="Número de Incidente"
                        type="text"
                        value={editData.incidentNumber || ''}
                        onChange={(e) => setEditData({...editData, incidentNumber: e.target.value})}
                      />
                      <Input
                        label="Fecha de Visita"
                        type="date"
                        value={editData.visitDate || ''}
                        onChange={(e) => setEditData({...editData, visitDate: e.target.value})}
                      />
                      <Input
                        label="Nombre de Unidad"
                        type="text"
                        value={editData.unitName || ''}
                        onChange={(e) => setEditData({...editData, unitName: e.target.value})}
                      />
                      <Input
                        label="Ingeniero"
                        type="text"
                        value={editData.engineerName || ''}
                        onChange={(e) => setEditData({...editData, engineerName: e.target.value})}
                      />
                      <Select
                        label="Satisfacción General"
                        options={satisfactionOptions}
                        value={editData.overallSatisfaction || ''}
                        onChange={(value) => setEditData({...editData, overallSatisfaction: value})}
                      />
                      <Select
                        label="Estado"
                        options={statusOptions}
                        value={editData.status || ''}
                        onChange={(value) => setEditData({...editData, status: value})}
                      />
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Check"
                        onClick={handleSave}
                        fullWidth
                      >
                        Guardar Cambios
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        onClick={handleCancel}
                        fullWidth
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Detailed Information */}
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cliente:</span>
                        <span className="font-medium text-foreground">{survey.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Teléfono:</span>
                        <span className="font-medium text-foreground">{survey.customerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Unidad #:</span>
                        <span className="font-medium text-foreground">{survey.unitNumber}</span>
                      </div>
                    </div>

                    {/* Satisfaction Breakdown */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Valoraciones Detalladas</h4>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tiempo de Respuesta:</span>
                          <span className={`font-medium ${getSatisfactionColor(survey.responseTime)}`}>
                            {survey.responseTime}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conocimiento Técnico:</span>
                          <span className={`font-medium ${getSatisfactionColor(survey.technicalKnowledge)}`}>
                            {survey.technicalKnowledge}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Presentación:</span>
                          <span className={`font-medium ${getSatisfactionColor(survey.presentation)}`}>
                            {survey.presentation}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comments */}
                    {survey.comments && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Comentarios</h4>
                        <p className="text-xs text-muted-foreground bg-background p-3 rounded border">
                          {survey.comments}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEdit(survey)}
                        fullWidth
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onSelect([survey.id])}
                        fullWidth
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDataView;