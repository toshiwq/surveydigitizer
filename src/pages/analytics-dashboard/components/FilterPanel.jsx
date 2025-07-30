import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last_30_days',
    units: [],
    engineers: [],
    serviceCategories: [],
    satisfactionDimensions: []
  });

  const dateRangeOptions = [
    { value: 'last_7_days', label: 'Últimos 7 días' },
    { value: 'last_30_days', label: 'Últimos 30 días' },
    { value: 'last_90_days', label: 'Últimos 90 días' },
    { value: 'last_6_months', label: 'Últimos 6 meses' },
    { value: 'last_year', label: 'Último año' },
    { value: 'custom', label: 'Rango personalizado' }
  ];

  const unitOptions = [
    { value: 'unit_001', label: 'Unidad Madrid Centro' },
    { value: 'unit_002', label: 'Unidad Barcelona Norte' },
    { value: 'unit_003', label: 'Unidad Valencia Sur' },
    { value: 'unit_004', label: 'Unidad Sevilla Este' },
    { value: 'unit_005', label: 'Unidad Bilbao Oeste' }
  ];

  const engineerOptions = [
    { value: 'eng_001', label: 'Carlos Rodríguez' },
    { value: 'eng_002', label: 'María González' },
    { value: 'eng_003', label: 'Antonio López' },
    { value: 'eng_004', label: 'Isabel Martín' },
    { value: 'eng_005', label: 'Francisco Sánchez' }
  ];

  const serviceCategoryOptions = [
    { value: 'installation', label: 'Instalación' },
    { value: 'maintenance', label: 'Mantenimiento' },
    { value: 'repair', label: 'Reparación' },
    { value: 'consultation', label: 'Consultoría' },
    { value: 'upgrade', label: 'Actualización' }
  ];

  const satisfactionDimensions = [
    { value: 'response_time', label: 'Tiempo de respuesta' },
    { value: 'technical_knowledge', label: 'Conocimiento técnico' },
    { value: 'presentation', label: 'Presentación' },
    { value: 'courtesy', label: 'Cortesía' },
    { value: 'overall_service', label: 'Servicio general' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateRange: 'last_30_days',
      units: [],
      engineers: [],
      serviceCategories: [],
      satisfactionDimensions: []
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border border-border rounded-lg p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="w-full h-8"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Date Range Filter */}
        <div>
          <Select
            label="Período de tiempo"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
        </div>

        {/* Units Filter */}
        <div>
          <Select
            label="Unidades"
            options={unitOptions}
            value={filters.units}
            onChange={(value) => handleFilterChange('units', value)}
            multiple
            searchable
            placeholder="Seleccionar unidades"
          />
        </div>

        {/* Engineers Filter */}
        <div>
          <Select
            label="Ingenieros"
            options={engineerOptions}
            value={filters.engineers}
            onChange={(value) => handleFilterChange('engineers', value)}
            multiple
            searchable
            placeholder="Seleccionar ingenieros"
          />
        </div>

        {/* Service Categories */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Categorías de servicio
          </label>
          <div className="space-y-2">
            {serviceCategoryOptions.map((category) => (
              <Checkbox
                key={category.value}
                label={category.label}
                checked={filters.serviceCategories.includes(category.value)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.serviceCategories, category.value]
                    : filters.serviceCategories.filter(c => c !== category.value);
                  handleFilterChange('serviceCategories', newCategories);
                }}
              />
            ))}
          </div>
        </div>

        {/* Satisfaction Dimensions */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Dimensiones de satisfacción
          </label>
          <div className="space-y-2">
            {satisfactionDimensions.map((dimension) => (
              <Checkbox
                key={dimension.value}
                label={dimension.label}
                checked={filters.satisfactionDimensions.includes(dimension.value)}
                onChange={(e) => {
                  const newDimensions = e.target.checked
                    ? [...filters.satisfactionDimensions, dimension.value]
                    : filters.satisfactionDimensions.filter(d => d !== dimension.value);
                  handleFilterChange('satisfactionDimensions', newDimensions);
                }}
              />
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            fullWidth
            iconName="X"
            iconPosition="left"
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;