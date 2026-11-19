import React from 'react';
import { PortalLoginView } from './PortalLoginView';
import { AppView } from '../types';

interface StudentLoginViewProps {
  onSuccess: () => void;
  onGoAdminLogin: () => void;
  onToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
}

export const StudentLoginView: React.FC<StudentLoginViewProps> = ({
  onSuccess,
  onToast,
}) => {
  return (
    <PortalLoginView
      initialRole="student"
      targetViewAfterLogin="student"
      onAuthenticated={(nextView: AppView) => {
        if (nextView === 'student') {
          onSuccess();
        } else {
          onSuccess();
        }
      }}
      onBackHome={onSuccess}
      onToast={onToast}
    />
  );
};
