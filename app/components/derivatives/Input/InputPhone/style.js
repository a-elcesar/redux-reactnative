export default {
  topContainer: {
    flex: -1,
    height: 65,
    flexDirection: 'row',
    marginBottom: 2,
  },

  input: {
    border: {
      borderWidth: 1,
      borderRadius: 5,
      height: 40,
    },
  },

  hint: {
    marginTop: 8,
  },

  left: {
    container: {
      flex: -1,
      width: 32,
      justifyContent: 'flex-end',
    },

    icon: {
      container: {
        flex: -1,
        height: 35,
        marginTop: 2,
      },
    },
  },

  right: {
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },

    input: {
      flex: -1,
      height: 35,
      marginTop: 2,
      paddingHorizontal: 5,
    },
  },
};
