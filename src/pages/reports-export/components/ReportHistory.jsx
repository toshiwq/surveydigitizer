import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReportHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReports, setSelectedReports] = useState([]);

  const mockReportHistory = [
    {
      id: 'rpt_001',
      name: 'Resumen Mensual Julio 2025',
      type: 'monthly_summary',
      format: 'excel',
      size: '2.3 MB',
      createdAt: '30/07/2025 14:30',
      createdBy: 'Juan Pérez',
      downloads: 12,
      status: 'completed',
      shared: true
    },
    {
      id: 'rpt_002',
      name: 'Rendimiento Ingenieros Q2',
      type: 'engineer_performance',
      format: 'pdf',
      size: '1.8 MB',
      createdAt: '28/07/2025 09:15',
      createdBy: 'María González',
      downloads: 8,
      status: 'completed',
      shared: false
    },
    {
      id: 'rpt_003',
      name: 'Análisis Tendencias Trimestral',
      type: 'trend_analysis',
      format: 'excel',
      size: '3.1 MB',
      createdAt: '25/07/2025 16:45',
      createdBy: 'Carlos Rodríguez',
      downloads: 15,
      status: 'completed',
      shared: true
    },
    {
      id: 'rpt_004',
      name: 'Comparación Unidades Junio',
      type: 'unit_comparison',
      format: 'pdf',
      size: '2.7 MB',
      createdAt: '22/07/2025 11:20',
      createdBy: 'Ana Martín',
      downloads: 6,
      status: 'completed',
      shared: false
    },
    {
      id: 'rpt_005',
      name: 'Informe Personalizado Cliente VIP',
      type: 'custom',
      format: 'pdf',
      size: '4.2 MB',
      createdAt: '20/07/2025 13:10',
      createdBy: 'Luis Fernández',
      downloads: 3,
      status: 'completed',
      shared: true
    },
    {
      id: 'rpt_006',
      name: 'Datos Exportación CSV Completa',
      type: 'custom',
      format: 'csv',
      size: '0.8 MB',
      createdAt: '18/07/2025 08:30',
      createdBy: 'Isabel López',
      downloads: 22,
      status: 'completed',
      shared: false
    }
  ];

  const getTypeLabel = (type) => {
    const labels = {
      monthly_summary: 'Resumen Mensual',
      engineer_performance: 'Rendimiento',
      trend_analysis: 'Tendencias',
      unit_comparison: 'Comparación',
      custom: 'Personalizado'
    };
    return labels[type] || type;
  };

  const getFormatIcon = (format) => {
    const icons = {
      excel: 'FileSpreadsheet',
      pdf: 'FileText',
      csv: 'Database',
      json: 'Code'
    };
    return icons[format] || 'File';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-success',
      processing: 'text-warning',
      failed: 'text-destructive'
    };
    return colors[status] || 'text-muted-foreground';
  };

  const filteredReports = mockReportHistory.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getTypeLabel(report.type).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectReport = (reportId) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(report => report.id));
    }
  };

  const handleBulkDownload = () => {
    console.log('Downloading reports:', selectedReports);
    // Implement bulk download logic
  };

  const handleBulkDelete = () => {
    console.log('Deleting reports:', selectedReports);
    // Implement bulk delete logic
    setSelectedReports([]);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Historial de Informes</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">{filteredReports.length} informes</span>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar informes por nombre, autor o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          {selectedReports.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedReports.length} seleccionados
              </span>
              <Button variant="outline" size="sm" onClick={handleBulkDownload}>
                <Icon name="Download" size={16} className="mr-2" />
                Descargar
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Icon name="Trash2" size={16} className="mr-2" />
                Eliminar
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Reports List */}
      <div className="max-h-[500px] overflow-y-auto">
        {/* Table Header */}
        <div className="sticky top-0 bg-muted/50 border-b border-border">
          <div className="flex items-center p-4">
            <div className="flex items-center space-x-3 flex-1">
              <input
                type="checkbox"
                checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                onChange={handleSelectAll}
                className="rounded border-border"
              />
              <span className="text-sm font-medium text-foreground">Nombre del Informe</span>
            </div>
            <div className="w-24 text-sm font-medium text-foreground">Tipo</div>
            <div className="w-20 text-sm font-medium text-foreground">Formato</div>
            <div className="w-20 text-sm font-medium text-foreground">Tamaño</div>
            <div className="w-32 text-sm font-medium text-foreground">Creado</div>
            <div className="w-24 text-sm font-medium text-foreground">Descargas</div>
            <div className="w-24 text-sm font-medium text-foreground">Acciones</div>
          </div>
        </div>

        {/* Reports */}
        <div className="divide-y divide-border">
          {filteredReports.map((report) => (
            <div key={report.id} className="flex items-center p-4 hover:bg-muted/30">
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={selectedReports.includes(report.id)}
                  onChange={() => handleSelectReport(report.id)}
                  className="rounded border-border"
                />
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getFormatIcon(report.format)} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                  <div>
                    <div className="font-medium text-sm text-foreground">{report.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Por {report.createdBy} • {report.createdAt}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-24">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {getTypeLabel(report.type)}
                </span>
              </div>
              
              <div className="w-20 text-sm text-muted-foreground uppercase">
                {report.format}
              </div>
              
              <div className="w-20 text-sm text-muted-foreground">
                {report.size}
              </div>
              
              <div className="w-32 text-sm text-muted-foreground">
                {report.createdAt.split(' ')[0]}
              </div>
              
              <div className="w-24 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={14} />
                  <span>{report.downloads}</span>
                </div>
              </div>
              
              <div className="w-24 flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <Icon name="Download" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Share2" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No se encontraron informes</h4>
            <p className="text-muted-foreground">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Aún no has generado ningún informe'}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredReports.length} de {mockReportHistory.length} informes
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Archive" size={16} className="mr-2" />
            Archivar Antiguos
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Configurar Retención
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportHistory;