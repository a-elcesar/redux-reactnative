import { AsyncStorage } from 'react-native';
import createEncryptor from 'redux-persist-transform-encrypt';
import { createBlacklistFilter } from 'redux-persist-transform-filter';

const encryptor = createEncryptor({
  secretKey: 'jakarta-bike-hub-super-secret-key',
  onError(error) {
    console.error(`createEncryptor error ${error}`);
  },
});

const saveAuthSubsetBlacklistFilter = createBlacklistFilter(['auth']);

const PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['session'],
    transforms: [saveAuthSubsetBlacklistFilter, encryptor],
  },
};

export default PERSIST;
