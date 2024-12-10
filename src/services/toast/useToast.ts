import {ToastService} from './toastTypes.ts';
// import {useToastContext} from './useToastContext.tsx';
import {useToastServiceZustand, useToastZustand} from './useToastZustand.ts';

export function useToast(): ToastService['toast'] {
  // const {toast} = useToastContext();
  // return toast;

  return useToastZustand(); //const {toast} = useToastZustand(); return toast
}

export function useToastService(): Pick<
  ToastService,
  'showToast' | 'hideToast'
> {
  // const {showToast, hideToast} = useToastContext();
  // return {
  //   showToast,
  //   hideToast,
  // };

  return useToastServiceZustand();
}
