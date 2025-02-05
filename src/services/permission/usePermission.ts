import {useEffect, useState} from 'react';

import {Camera} from 'react-native-vision-camera';

import {permissionService} from './permissionService';
import {PermissionName, PermissionStatus} from './permissionTypes';

export function usePermission(permissionName: PermissionName) {
  const [status, setStatus] = useState<PermissionStatus>();
  const [isLoading, setIsLoading] = useState(true);

  async function checkPermission() {
    //   try {
    //     setIsLoading(true);
    //
    //     const initialStatus = await permissionService.check(permissionName);
    //
    //     if (initialStatus === 'denied') {
    //       const _status = await permissionService.request(permissionName);
    //       setStatus(_status);
    //     } else {
    //       setStatus(initialStatus);
    //     }
    //   } catch (e) {
    //     setStatus('unavailable');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    try {
      setIsLoading(true);

      if (permissionName === 'camera') {
        try {
          // Check if camera hardware is available
          const devices = Camera.getAvailableCameraDevices();
          // console.log('Available camera devices:', devices);

          if (devices.length === 0) {
            console.log('No camera devices found');
            setStatus('unavailable');
            return;
          }

          // If we have camera hardware, proceed to check permissions
          const initialStatus = await permissionService.check('camera');
          // console.log('Initial camera permission status:', initialStatus);

          if (initialStatus === 'denied') {
            // Request camera permission if initially denied
            const newStatus = await permissionService.request('camera');
            console.log(
              'New camera permission status after request:',
              newStatus,
            );
            setStatus(newStatus);
          } else {
            setStatus(initialStatus);
          }
        } catch (cameraError) {
          console.error('Camera check error:', cameraError);
          setStatus('unavailable');
        }
      } else {
        // Handle other permission types (like photoLibrary)
        const initialStatus = await permissionService.check(permissionName);
        // console.log(
        //   `Initial ${permissionName} permission status:`,
        //   initialStatus,
        // );

        if (initialStatus === 'denied') {
          const newStatus = await permissionService.request(permissionName);
          // console.log(
          //   `New ${permissionName} permission status after request:`,
          //   newStatus,
          // );
          setStatus(newStatus);
        } else {
          setStatus(initialStatus);
        }
      }
    } catch (e) {
      console.error('Permission check error:', e);
      setStatus('unavailable');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    status,
    isLoading,
  };
}
