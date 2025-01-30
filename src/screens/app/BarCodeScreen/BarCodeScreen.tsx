import React, {useState} from 'react';
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

const CAMERA_VIEW = Dimensions.get('screen').width;
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_VIEW) / 2;
const CONTROL_DIF = 30;

export function BarCodeScreen({navigation}: AppScreenProps<'BarCodeScreen'>) {
  const {top} = useAppSafeArea();
  const [flashOn, setFlashOn] = useState(false);
  const [scannedItem, setScannedItem] = useState<string | undefined>('');

  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const {barcodeFood, error, isLoading} = useGetFoodByBarCode(
    scannedItem ? scannedItem : null,
  );

  if (error) {
    console.log(error.message);
  }

  if (barcodeFood) {
    console.log(barcodeFood);
  }

  // const camera = useRef<Camera>(null);

  const format = useCameraFormat(device, Templates.Instagram);

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';

  // async function takePhoto() {
  //   if (camera.current) {
  //     const photoFile = await camera.current?.takePhoto({
  //       flash: flashOn ? 'on' : 'off',
  //       // qualityPrioritization: 'quality',
  //     });
  //
  //     console.log({photoFile});
  //   }
  // }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes[0].value) {
        setScannedItem(codes[0].value);
        if (scannedItem && barcodeFood) {
          // const params = {
          //   id: number,
          //   createdAt: string,
          //   userId: string,
          //   label: string,
          //   servSize: number,
          //   servUnit: string,
          //   isArchived: boolean,
          //   protein: number,
          //   carbs: number,
          //   fat: number,
          //   calories: number,
          //   fibre: number,
          //   sodium: number,
          //   foodImg: string,
          //   categoryId: number | null,
          // }
          // navigation.navigate('UpdateEntryScreen', {
          //   isUpdatingItem: true,
          //   item: barcodeFood,
          //   updating: 'food',
          // });
        }
      }
    },
  });

  console.log({scannedItem});

  function toggleFlash() {
    setFlashOn(prevState => !prevState);
  }

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
            <Icon name="arrowLeft" color="white" onPress={navigation.goBack} />
            <Icon
              name={flashOn ? 'flashOn' : 'flashOff'}
              color="white"
              onPress={toggleFlash}
            />
            <Box width={20} />
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  );
}

const $controlAreaTop: BoxProps = {
  backgroundColor: 'black60',
  height: CONTROL_HEIGHT - CONTROL_DIF,
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingHorizontal: 's24',
};
