import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { TextInputField } from '../components/TextInputField';
import { useAppContext } from '../context/AppContext';
import { validateMnemonic, getAddressFromMnemonic } from '../utils/wallet';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ImportWalletScreen() {
  const router = useRouter();
  const { setWallet, storeMnemonic, storePassword } = useAppContext();
  
  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mnemonicError, setMnemonicError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };
  
  const handleImportWallet = async () => {
    // Validate mnemonic
    if (!mnemonic.trim()) {
      setMnemonicError('Recovery phrase is required');
      return;
    }
    
    const trimmedMnemonic = mnemonic.trim();
    const words = trimmedMnemonic.split(/\s+/);
    
    if (words.length !== 12) {
      setMnemonicError('Recovery phrase must be 12 words');
      return;
    }
    
    if (!validateMnemonic(trimmedMnemonic)) {
      setMnemonicError('Invalid recovery phrase');
      return;
    } else {
      setMnemonicError('');
    }
    
    // Validate password
    const passError = validatePassword(password);
    setPasswordError(passError);
    
    // Validate password confirmation
    let confirmError = '';
    if (password !== confirmPassword) {
      confirmError = 'Passwords do not match';
    }
    setConfirmError(confirmError);
    
    // If there are any errors, don't proceed
    if (passError || confirmError) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Store mnemonic and password securely
      await storeMnemonic(trimmedMnemonic);
      await storePassword(password);
      
      // Get address from mnemonic
      const address = getAddressFromMnemonic(trimmedMnemonic);
      
      // Update wallet in context
      setWallet({
        address,
      });
      
      // Navigate to wallet screen
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error importing wallet:', error);
    } finally {
      setIsLoading(false);
    }
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
        <Text style={styles.title}>Import Wallet</Text>
        <Text style={styles.subtitle}>
          Enter your 12-word recovery phrase to import your existing wallet.
        </Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.mnemonicLabel}>Recovery Phrase</Text>
          <View style={[styles.mnemonicInput, mnemonicError ? styles.mnemonicInputError : null]}>
            <TextInput
              style={styles.mnemonicTextInput}
              placeholder="Enter your 12-word recovery phrase"
              placeholderTextColor="#808080"
              value={mnemonic}
              onChangeText={setMnemonic}
              multiline
              numberOfLines={3}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {mnemonicError ? <Text style={styles.errorText}>{mnemonicError}</Text> : null}
          
          <View style={styles.passwordSection}>
            <TextInputField
              label="Password"
              placeholder="Create a new password"
              value={password}
              onChangeText={setPassword}
              isPassword
              error={passwordError}
            />
            
            <TextInputField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
              error={confirmError}
            />
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Make sure you're entering your recovery phrase in a secure, private environment. Never share your recovery phrase with anyone.
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Import Wallet" 
            onPress={handleImportWallet}
            style={styles.importButton}
            isLoading={isLoading}
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
    marginBottom: 32,
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  mnemonicLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  mnemonicInput: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    padding: 16,
    marginBottom: 8,
  },
  mnemonicInputError: {
    borderColor: '#FF5252',
  },
  mnemonicTextInput: {
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    textAlignVertical: 'top',
    height: '100%',
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#FF5252',
    marginBottom: 16,
    marginLeft: 4,
  },
  passwordSection: {
    marginTop: 16,
  },
  infoContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  infoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#B3B3B3',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 16,
  },
  importButton: {
    marginBottom: 12,
  },
  backButton: {},
});