import {
    AsyncStorage
} from 'react-native';

export default class Storage {
    static set(key, value, callback) {
        return AsyncStorage.setItem(key, value, callback);
    }
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            return value;
        })
    }
    static remove(key) {
        return AsyncStorage.removeItem(key)
    }
    static multiRemove(keys) {
        return AsyncStorage.multiRemove(keys)
    }
}