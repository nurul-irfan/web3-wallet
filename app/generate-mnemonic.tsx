import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { MnemonicDisplay } from '../components/MnemonicDisplay';
import { generateMnemonic } from '../utils/wallet';
import { useAppContext } from '../context/AppContext';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function GenerateMnemonicScreen() {
  const router = useRouter();
  const { setWallet, storeMnemonic } = useAppContext();
  const [mnemonic, setMnemonic] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      const newMnemonic = await generateMnemonic();
      setMnemonic(newMnemonic.split(' '));

      storeMnemonic(newMnemonic);
      setWallet({
        address: '',
        mnemonic: newMnemonic,
        account: undefined
      });
    };

    init();
  }, []);


  const handleContinue = () => {
    router.push('/create-password');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Animated.View entering={FadeIn.duration(600)}>
        <Text style={styles.title}>Create Your Wallet</Text>
        <Text style={styles.subtitle}>
          We've generated a unique 12-word recovery phrase for your wallet.
        </Text>

        <MnemonicDisplay mnemonic={mnemonic} />

        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>Important:</Text>
          <Text style={styles.warningText}>
            • Never share your recovery phrase with anyone{'\n'}
            • MFX3 will never ask for your recovery phrase{'\n'}
            • If you lose your recovery phrase, you'll lose access to your wallet
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
          />
          <Button
            title="Back"
            variant="outline"
            onPress={handleBack}
            style={styles.backButton}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 24,
    lineHeight: 24,
  },
  warningContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginVertical: 24,
  },
  warningTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  warningText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#B3B3B3',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 16,
  },
  continueButton: {
    marginBottom: 12,
  },
  backButton: {},
});