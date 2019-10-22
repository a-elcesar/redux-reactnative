import { Platform } from 'react-native';
import { Colors } from '../../../configs';

export default {
  main: {
    flex: -1,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins-Regular',
    lineHeight: 16,
    letterSpacing: 0,
    color: Colors.main.baseBlack,
  },
};
