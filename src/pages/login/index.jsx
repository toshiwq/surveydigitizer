import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import BackgroundPattern from './components/BackgroundPattern';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const session = JSON.parse(userSession);
        // Check if session is still valid (less than 24 hours old)
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          navigate('/dashboard');
          return;
        } else {
          // Session expired, remove it
          localStorage.removeItem('userSession');
        }
      } catch (error) {
        // Invalid session data, remove it
        localStorage.removeItem('userSession');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Main Login Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-card/95">
          {/* Header Section */}
          <LoginHeader />
          
          {/* Form Section */}
          <LoginForm />
          
          {/* Footer Section */}
          <LoginFooter />
        </div>
      </div>

      {/* Additional Security Indicators */}
      <div className="fixed bottom-4 left-4 flex items-center space-x-2 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>Sistema Seguro</span>
      </div>

      {/* Version Info */}
      <div className="fixed bottom-4 right-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        v2.1.0
      </div>
    </div>
  );
};

export default LoginPage;