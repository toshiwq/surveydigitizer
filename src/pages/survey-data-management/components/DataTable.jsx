import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataTable = ({ 
  surveys, 
  onEdit, 
  onSelect, 
  selectedRows, 
  onBulkAction,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange
}) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedSurveys = useMemo(() => {
    if (!sortConfig.key) return surveys;

    return [...surveys].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [surveys, sortConfig]);

  const handleEdit = (survey) => {
    setEditingRow(survey.id);
    setEditData({ ...survey });
  };

  const handleSave = () => {
    onEdit(editData);
    setEditingRow(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelect(surveys.map(s => s.id));
    } else {
      onSelect([]);
    }
  };

  const handleRowSelect = (surveyId, checked) => {
    if (checked) {
      onSelect([...selectedRows, surveyId]);
    } else {
      onSelect(selectedRows.filter(id => id !== surveyId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'procesado':
        return 'text-success bg-success/10';
      case 'validado':
        return 'text-primary bg-primary/10';
      case 'pendiente':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
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

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedRows.length > 0 && (
        <div className="bg-muted/50 border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedRows.length} elemento{selectedRows.length !== 1 ? 's' : ''} seleccionado{selectedRows.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center space-x-2">
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
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedRows.length === surveys.length && surveys.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('incidentNumber')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Nº Incidente</span>
                  <Icon 
                    name={sortConfig.key === 'incidentNumber' ? 
                      (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 
                      'ChevronsUpDown'
                    } 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('visitDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Fecha Visita</span>
                  <Icon 
                    name={sortConfig.key === 'visitDate' ? 
                      (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 
                      'ChevronsUpDown'
                    } 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Unidad</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Ingeniero</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Satisfacción</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Estado</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedSurveys.map((survey) => (
              <tr 
                key={survey.id} 
                className={`hover:bg-muted/30 transition-colors ${
                  selectedRows.includes(survey.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedRows.includes(survey.id)}
                    onChange={(e) => handleRowSelect(survey.id, e.target.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  {editingRow === survey.id ? (
                    <Input
                      type="text"
                      value={editData.incidentNumber || ''}
                      onChange={(e) => setEditData({...editData, incidentNumber: e.target.value})}
                      className="w-24"
                    />
                  ) : (
                    <span className="text-sm font-medium text-foreground">{survey.incidentNumber}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingRow === survey.id ? (
                    <Input
                      type="date"
                      value={editData.visitDate || ''}
                      onChange={(e) => setEditData({...editData, visitDate: e.target.value})}
                      className="w-32"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">{survey.visitDate}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingRow === survey.id ? (
                    <Input
                      type="text"
                      value={editData.unitName || ''}
                      onChange={(e) => setEditData({...editData, unitName: e.target.value})}
                      className="w-32"
                    />
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-foreground">{survey.unitName}</div>
                      <div className="text-xs text-muted-foreground">#{survey.unitNumber}</div>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingRow === survey.id ? (
                    <Input
                      type="text"
                      value={editData.engineerName || ''}
                      onChange={(e) => setEditData({...editData, engineerName: e.target.value})}
                      className="w-32"
                    />
                  ) : (
                    <span className="text-sm text-foreground">{survey.engineerName}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingRow === survey.id ? (
                    <Select
                      options={satisfactionOptions}
                      value={editData.overallSatisfaction || ''}
                      onChange={(value) => setEditData({...editData, overallSatisfaction: value})}
                      className="w-32"
                    />
                  ) : (
                    <span className={`text-sm font-medium ${getSatisfactionColor(survey.overallSatisfaction)}`}>
                      {survey.overallSatisfaction}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingRow === survey.id ? (
                    <Select
                      options={statusOptions}
                      value={editData.status || ''}
                      onChange={(value) => setEditData({...editData, status: value})}
                      className="w-32"
                    />
                  ) : (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(survey.status)}`}>
                      {survey.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingRow === survey.id ? (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Check"
                        onClick={handleSave}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEdit(survey)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onSelect([survey.id])}
                      >
                        Ver
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Mostrar</span>
          <Select
            options={[
              { value: '10', label: '10' },
              { value: '25', label: '25' },
              { value: '50', label: '50' },
              { value: '100', label: '100' }
            ]}
            value={pageSize.toString()}
            onChange={(value) => onPageSizeChange(parseInt(value))}
            className="w-20"
          />
          <span className="text-sm text-muted-foreground">elementos por página</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;