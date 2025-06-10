import AsyncStorage from '@react-native-async-storage/async-storage';

const MNEMONIC_KEY = 'mnemonic';

export const saveMnemonic = async (mnemonic: string) => {
    await AsyncStorage.setItem(MNEMONIC_KEY, mnemonic);
};

export const getMnemonic = async (): Promise<string> => {
    const mnemonic = await AsyncStorage.getItem(MNEMONIC_KEY);
    if (!mnemonic) {
        throw new Error('Mnemonic not found in storage');
    }
    return mnemonic;
};

export const clearMnemonic = async () => {
    await AsyncStorage.removeItem(MNEMONIC_KEY);
};
