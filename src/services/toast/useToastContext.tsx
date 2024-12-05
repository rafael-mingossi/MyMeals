import {useContext} from 'react';

import {ToastService} from '@services';

import {ToastContext} from './Providers/ToastProvider.tsx';

export function useToastContext(): ToastService {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Toast must be within a ToastProvider');
  }

  return context;
}
