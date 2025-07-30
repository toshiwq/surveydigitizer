import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="FileText" size={32} color="white" />
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        SurveyDigitizer
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground text-lg mb-6">
        Sistema de Procesamiento de Encuestas PDF
      </p>

      {/* Welcome Message */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Bienvenido de Vuelta
        </h2>
        <p className="text-sm text-muted-foreground">
          Acceda a su cuenta para gestionar y analizar datos de encuestas de calidad de servicio
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;