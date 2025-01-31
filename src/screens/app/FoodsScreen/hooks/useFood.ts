import {
  AddFoodParams,
  FoodMode,
  UpdateFoodParams,
  useAddFood,
  useUpdateFood,
} from '@domain';
import {useNavigation} from '@react-navigation/native';
import {useAuthCredentials, useToastService} from '@services';
import {UseFormReset} from 'react-hook-form';

import {FormInputValues} from '../tabs/AddFood.tsx';

export function useFood(
  foodId: number,
  mode: FoodMode,
  reset?: UseFormReset<FormInputValues>,
) {
  const {authCredentials} = useAuthCredentials();
  const {showToast} = useToastService();
  const navigation = useNavigation();

  const {mutate: addFood, isPending: isPendingAdd} = useAddFood({
    onSuccess: () => {
      showToast({
        message: 'Food was added!',
      });
      navigation.goBack();
      reset?.();
    },
    onError: () => {
      showToast({
        message: 'Failed to add food',
        type: 'error',
      });
    },
  });

  const {mutate: updateFood, isPending: isPendingUpdate} = useUpdateFood({
    onSuccess: () => {
      showToast({
        message: 'Food was updated!',
      });
      navigation.goBack();
      reset?.();
    },
    onError: () => {
      showToast({
        message: 'Failed to update food',
        type: 'error',
      });
    },
  });

  const onSubmit = (data: FormInputValues) => {
    if (!authCredentials?.session.user.id) {
      showToast({
        message: 'User not authenticated',
        type: 'error',
      });
      return;
    }

    const baseFood = {
      label: data.label,
      category_id: Number(data.category_id),
      protein: Number(data.protein),
      carbs: Number(data.carbs),
      fat: Number(data.fat),
      calories: Number(data.calories),
      fibre: data.fibre ? Number(data.fibre) : 0,
      sodium: data.sodium ? Number(data.sodium) : 0,
      serv_size: Number(data.serv_size),
      serv_unit: data.serv_unit,
      food_img: '',
      is_archived: false,
    };

    switch (mode) {
      case 'update':
        const updateParams: UpdateFoodParams = {
          id: foodId,
          ...baseFood,
        };
        updateFood(updateParams);
        break;

      case 'create':
      case 'barcode':
        const addParams: AddFoodParams = {
          user_id: authCredentials.session.user.id,
          ...baseFood,
        };
        addFood(addParams);
        break;
    }
  };

  return {
    onSubmit,
    isPendingAdd,
    isPendingUpdate,
  };
}
