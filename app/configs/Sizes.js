import { Platform, Dimensions } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default {
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    // paddingBottom: 32,
  },
  text: {
    xl: {
      size: 40,
      line: 40,
    },
    l: {
      size: 26,
      line: 32,
    },
    m: {
      size: 18,
      line: 24,
    },
    s: {
      size: 14,
      line: 16,
    },
    ss: {
      size: 12,
      line: 14,
    },
  },
  isAndroid: Platform.OS !== 'ios',
  isIphoneX: isIphoneX(),
};
