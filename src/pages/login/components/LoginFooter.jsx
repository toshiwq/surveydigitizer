import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 text-center space-y-4">
      {/* Demo Credentials Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Icon name="Info" size={16} className="text-blue-600" />
          <h3 className="text-sm font-semibold text-blue-800">
            Credenciales de Demostración
          </h3>
        </div>
        <div className="text-xs text-blue-700 space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-white/50 rounded p-2">
              <p className="font-medium">Gerente de Calidad:</p>
              <p>manager@surveydigitizer.es / Manager123!</p>
            </div>
            <div className="bg-white/50 rounded p-2">
              <p className="font-medium">Analista de Datos:</p>
              <p>analyst@surveydigitizer.es / Analyst123!</p>
            </div>
            <div className="bg-white/50 rounded p-2">
              <p className="font-medium">Administrador:</p>
              <p>admin@surveydigitizer.es / Admin123!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} />
        <span>Conexión segura SSL/TLS</span>
      </div>

      {/* Support Links */}
      <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <button className="hover:text-foreground transition-colors duration-200 flex items-center space-x-1">
          <Icon name="HelpCircle" size={14} />
          <span>Soporte Técnico</span>
        </button>
        <button className="hover:text-foreground transition-colors duration-200 flex items-center space-x-1">
          <Icon name="FileText" size={14} />
          <span>Documentación</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {currentYear} SurveyDigitizer. Todos los derechos reservados.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Sistema especializado en procesamiento automatizado de encuestas PDF
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;