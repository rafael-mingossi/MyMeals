module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: ['SUPABASE_URL', 'SUPABASE_ANON_KEY'],
        safe: true,
        allowUndefined: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
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
          '@infra': './src/infra',
          '@test': './src/test',
          '@assets': './src/assets',
          '@form': './src/form',
          '@domain': './src/domain',
          '@routes': './src/routes',
        },
      },
    ],
  ],
};
