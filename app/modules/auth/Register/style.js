import { Colors, Sizes } from '../../../configs';

export default {
  formContainer: {
    marginTop: 14,
    marginBottom: 35,
  },
  main: {
    title: {
      textAlign: 'left',
      color: Colors.main.baseFont,
      fontFamily: 'Poppins-Bold',
      letterSpacing: 1.8,
    },
    footer: {
      paddingTop: 30,
      flex: -1,
      position: 'absolute',
      fontFamily: 'Poppins-Medium',
      width: Sizes.screen.width,
      bottom: 0,
      justifyContent: 'space-between',
    },
  },
  input: {
    fullName: {
      marginBottom: 12,
    },
    email: {
      marginBottom: 12,
    },
    password: {
      marginBottom: 0,
    },
  },
};
