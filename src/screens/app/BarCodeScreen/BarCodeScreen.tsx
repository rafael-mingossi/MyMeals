import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {useGetFoodByBarCode} from '@domain';
import {useIsFocused} from '@react-navigation/native';
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';

import {
  ActivityIndicator,
  Box,
  BoxProps,
  Icon,
  PermissionManager,
} from '@components';
import {useAppSafeArea, useAppState} from '@hooks';
import {AppScreenProps} from '@routes';

import {AddFood} from '../FoodsScreen/tabs/AddFood.tsx';

const CAMERA_VIEW = Dimensions.get('screen').width;
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_VIEW) / 2;

type FoodParams = {
  label: string;
  servSize: string;
  servUnit: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fibre: number;
  sodium: number;
  food_img: string;
  category_id: number;
  is_archived: boolean;
};

export function BarCodeScreen({navigation}: AppScreenProps<'BarCodeScreen'>) {
  const {top} = useAppSafeArea();
  const [scannedItem, setScannedItem] = useState<string | undefined>('');
  const [foodParams, setFoodParams] = useState<FoodParams>();

  // const device = useCameraDevice('back', {
  //   physicalDevices: [
  //     'ultra-wide-angle-camera',
  //     'wide-angle-camera',
  //     'telephoto-camera',
  //   ],
  // });
  const device = useCameraDevice('back');
  const {barcodeFood, error, isLoading} = useGetFoodByBarCode(
    scannedItem ? scannedItem : null,
  );

  if (error) {
    console.log(error.message);
  }

  if (barcodeFood) {
    console.log(barcodeFood);
  }

  const format = useCameraFormat(device, Templates.Instagram);

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log({codes});
      if (codes[0].value) {
        setScannedItem(codes[0].value);
      }
    },
  });

  useEffect(() => {
    if (scannedItem && barcodeFood) {
      const params = {
        label: barcodeFood.label,
        servSize: '100',
        servUnit: 'g',
        protein: barcodeFood.protein,
        carbs: barcodeFood.carbs,
        fat: barcodeFood.fat,
        calories: barcodeFood.calories,
        fibre: barcodeFood.fibre,
        sodium: barcodeFood.sodium,
        food_img: '',
        category_id: 1,
        is_archived: false,
      };

      setFoodParams(params);
    }
  }, [scannedItem, barcodeFood]);

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <PermissionManager
      permissionName="camera"
      description="Allow MyMeals to access the camera">
      {foodParams && !isLoading ? (
        <Box flex={1}>
          <AddFood mode="barcode" initialData={foodParams} />
        </Box>
      ) : (
        <Box flex={1}>
          {device != null && (
            <Camera
              format={format}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive}
              codeScanner={codeScanner}
              // enableHighQualityPhotos={true} //In case the photos have quality set, we need to enable this option for IOS
            />
          )}
          <Box flex={1} justifyContent="space-between">
            <Box {...$controlAreaTop} style={{paddingTop: top}}>
              <Icon
                name="arrowLeft"
                color="white"
                onPress={navigation.goBack}
              />
              <Box width={20} />
            </Box>
            <Box {...$controlAreaTop}>
              <Box width={20} />
            </Box>
          </Box>
        </Box>
      )}
    </PermissionManager>
  );
}

const $controlAreaTop: BoxProps = {
  backgroundColor: 'black60',
  height: CONTROL_HEIGHT,
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingHorizontal: 's24',
};
