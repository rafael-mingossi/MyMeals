//TODO: Change this to a Modal

import {Alert} from 'react-native';

type AlertDialogProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function AlertDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Confirm',
        onPress: onConfirm,
        style: 'destructive',
      },
    ],
    {cancelable: true},
  );
}
