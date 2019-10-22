import { Colors, Sizes } from '../../../configs';

export default {
  container: {
    flex: 1,
  },
  main: {
    title: {
      textAlign: 'left',
      color: Colors.main.baseFont,
      fontFamily: 'Poppins-Bold',
      letterSpacing: 1.8,
    },
    padder: {
      marginTop: 14,
      marginBottom: 35,
    },
    footer: {
      // paddingTop: 30,
      flex: -1,
      position: 'absolute',
      width: Sizes.screen.width,
      bottom: 0,
      justifyContent: 'flex-end',
    },
  },
  input: {
    email: {
      marginBottom: 32,
    },
    password: {
      marginBottom: 12,
    },
  },
};
