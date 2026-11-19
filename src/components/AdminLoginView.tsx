import React from 'react';
import { PortalLoginView } from './PortalLoginView';

interface AdminLoginViewProps {
  onEnterAdminConsole: () => void;
  onGoStudentHub: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onEnterAdminConsole,
  onGoStudentHub,
  onToast,
}) => {
  return (
    <PortalLoginView
      initialRole="admin"
      targetViewAfterLogin="instructor"
      onAuthenticated={() => onEnterAdminConsole()}
      onBackHome={onGoStudentHub}
      onToast={onToast}
    />
  );
};
