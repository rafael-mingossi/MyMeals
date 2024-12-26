// If you want to keep the food record for historical purposes, you could implement soft deletion instead:
//
//   Add a deleted_at column to your foods table:
//
//   sqlCopyALTER TABLE foods
// ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;
//
// Modify your delete food API to use soft delete:
//
// typescriptCopy// foodsApi.ts
// async function deleteFood(foodId: number): Promise<void> {
//   const { error } = await supabaseClient
//     .from('foods')
//     .update({ deleted_at: new Date().toISOString() })
//     .eq('id', foodId);
//
//   if (error) {
//     throw new Error(`Failed to delete food: ${error.message}`);
//   }
// }
//
// Update your getFoodsByUser query to exclude deleted foods:
//
//   typescriptCopyasync function getFoodsByUser(userId: string): Promise<FoodsAPI[]> {
//   const { data, error } = await supabaseClient
//     .from('foods')
//     .select('*')
//     .eq('user_id', userId)
//     .is('deleted_at', null)  // Only get non-deleted foods
//     .order('created_at', { ascending: false });
//
//   if (error) {
//     throw new Error(`Failed to fetch foods: ${error.message}`);
//   }
//
//   return data || [];
// }

//TODO: Change this to a Modal, and ADD the above to the DB

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
