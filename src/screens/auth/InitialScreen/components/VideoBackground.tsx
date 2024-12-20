import React, {useRef, useState} from 'react';
import {Image, StyleSheet} from 'react-native';

import {images, videos} from '@assets';
import Video, {VideoRef} from 'react-native-video';

const VideoPlaceholder = () => {
  return (
    <Image
      resizeMode="cover"
      source={images.introPlaceholder}
      style={[styles.backgroundVideo, styles.image]}
    />
  );
};

export const VideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (er: any) => {
    console.error('Video Error:', er);
    setError(true);
  };

  return (
    <>
      {isLoading && !error && <VideoPlaceholder />}
      {error && <VideoPlaceholder />}
      <Video
        resizeMode="cover"
        repeat
        muted
        source={videos.intro}
        ref={videoRef}
        onLoad={handleLoad}
        onError={handleError}
        style={styles.backgroundVideo}
      />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
