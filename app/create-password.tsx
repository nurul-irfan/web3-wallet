import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { TextInputField } from '../components/TextInputField';
import { useAppContext } from '../context/AppContext';
import { getAddressFromMnemonic } from '../utils/wallet';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function CreatePasswordScreen() {
  const router = useRouter();
  const { wallet, setWallet, storePassword } = useAppContext();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };
  
  const handleCreateWallet = async () => {
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
      // Store password securely
      await storePassword(password);
      
      // Get address from mnemonic
      if (wallet?.mnemonic) {
        const address = getAddressFromMnemonic(wallet.mnemonic);
        
        // Update wallet in context
        setWallet({
          address,
          // Don't keep mnemonic in memory longer than needed
          mnemonic: undefined,
          account: undefined
        });
        
        // Navigate to wallet screen
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
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
        <Text style={styles.title}>Create Password</Text>
        <Text style={styles.subtitle}>
          Create a password to secure your wallet. You'll need this password to access your wallet.
        </Text>
        
        <View style={styles.formContainer}>
          <TextInputField
            label="Password"
            placeholder="Enter your password"
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
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            This password will be used to unlock your wallet on this device. Make sure it's strong and that you remember it.
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Create Wallet" 
            onPress={handleCreateWallet}
            style={styles.createButton}
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
  createButton: {
    marginBottom: 12,
  },
  backButton: {},
});