import { Sizes } from '../../../configs';

export default {
  grouper: {
    flex: -1,
    width: Sizes.screen.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.screen.paddingHorizontal,
  },

  button: {
    container: {
      flex: -1,
      width: 35,
      justifyContent: 'center',
    },
  },

  title: {
    container: {
      flex: 1,
    },
    centeredTitle: {
      alignItems: 'center',
      marginRight: -16,
    },
  },
};
