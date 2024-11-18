module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@screens': './src/screens',
          '@api': './src/api',
          '@hooks': './src/hooks',
          '@types': './src/types',
          '@stores': './src/stores',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@components': './src/components',
          '@config': './src/config',
          '@providers': './src/providers',
          '@services': './src/services',
          '@theme': './src/theme',
          // '@env': ['node_modules/react-native-dotenv'],
        },
      },
    ],
  ],
};
