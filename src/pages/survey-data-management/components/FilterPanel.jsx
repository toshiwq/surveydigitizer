import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ onFilter, onReset, isCollapsed, onToggle }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    unit: '',
    engineer: '',
    satisfaction: '',
    status: ''
  });

  const unitOptions = [
    { value: '', label: 'Todas las unidades' },
    { value: 'madrid-centro', label: 'Madrid Centro' },
    { value: 'barcelona-norte', label: 'Barcelona Norte' },
    { value: 'valencia-sur', label: 'Valencia Sur' },
    { value: 'sevilla-este', label: 'Sevilla Este' },
    { value: 'bilbao-oeste', label: 'Bilbao Oeste' }
  ];

  const engineerOptions = [
    { value: '', label: 'Todos los ingenieros' },
    { value: 'carlos-martinez', label: 'Carlos Martínez' },
    { value: 'ana-rodriguez', label: 'Ana Rodríguez' },
    { value: 'miguel-lopez', label: 'Miguel López' },
    { value: 'laura-garcia', label: 'Laura García' },
    { value: 'david-sanchez', label: 'David Sánchez' }
  ];

  const satisfactionOptions = [
    { value: '', label: 'Todas las valoraciones' },
    { value: 'excelente', label: 'Excelente' },
    { value: 'bueno', label: 'Bueno' },
    { value: 'regular', label: 'Regular' },
    { value: 'malo', label: 'Malo' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'procesado', label: 'Procesado' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'error', label: 'Error' },
    { value: 'validado', label: 'Validado' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      dateFrom: '',
      dateTo: '',
      unit: '',
      engineer: '',
      satisfaction: '',
      status: ''
    };
    setFilters(resetFilters);
    onReset();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Filter Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Filtros de Búsqueda</h3>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Activos
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={handleReset}
            >
              Limpiar
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
            onClick={onToggle}
          />
        </div>
      </div>

      {/* Filter Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label="Búsqueda General"
              type="search"
              placeholder="Buscar por número de incidente, ingeniero, comentarios..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
            <div className="flex items-end space-x-2">
              <Button
                variant="outline"
                iconName="Search"
                onClick={() => onFilter(filters)}
                className="flex-shrink-0"
              >
                Buscar
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                className="flex-shrink-0"
              >
                Exportar Filtrados
              </Button>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Fecha Desde"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
            <Input
              label="Fecha Hasta"
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Unidad"
              options={unitOptions}
              value={filters.unit}
              onChange={(value) => handleFilterChange('unit', value)}
              searchable
            />
            <Select
              label="Ingeniero"
              options={engineerOptions}
              value={filters.engineer}
              onChange={(value) => handleFilterChange('engineer', value)}
              searchable
            />
            <Select
              label="Satisfacción"
              options={satisfactionOptions}
              value={filters.satisfaction}
              onChange={(value) => handleFilterChange('satisfaction', value)}
            />
            <Select
              label="Estado"
              options={statusOptions}
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Filtros rápidos:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('status', 'error')}
            >
              Con Errores
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('status', 'pendiente')}
            >
              Pendientes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('satisfaction', 'malo')}
            >
              Baja Satisfacción
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                handleFilterChange('dateFrom', lastWeek.toISOString().split('T')[0]);
                handleFilterChange('dateTo', today.toISOString().split('T')[0]);
              }}
            >
              Última Semana
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;