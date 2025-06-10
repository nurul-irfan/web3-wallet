import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { Copy, CircleCheck as CheckCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence
} from 'react-native-reanimated';

interface WalletAddressCardProps {
  address: string;
}

export function WalletAddressCard({ address }: WalletAddressCardProps) {
  const [copied, setCopied] = useState(false);
  
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 8)}...${addr.substring(addr.length - 8)}`;
  };
  
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const copyToClipboard = () => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(address);
    } else {
      // Use Clipboard API for native platforms
      // Note: Import Clipboard from react-native at the top if needed
      Clipboard.setString(address);
    }
    
    setCopied(true);
    
    // Animation sequence
    scale.value = withSequence(
      withTiming(1.05, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
    
    // Reset copied status after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Wallet Address</Text>
      </View>
      
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{formatAddress(address)}</Text>
        <TouchableOpacity 
          style={styles.copyButton} 
          onPress={copyToClipboard}
        >
          {copied ? (
            <CheckCircle size={20} color="#1FE15E" />
          ) : (
            <Copy size={20} color="#1FE15E" />
          )}
        </TouchableOpacity>
      </View>
      
      {copied && (
        <View style={styles.copiedNotification}>
          <Text style={styles.copiedText}>Address copied to clipboard</Text>
        </View>
      )}
      
      <Text style={styles.balanceLabel}>Balance</Text>
      <Text style={styles.balanceAmount}>0.00 ETH</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  addressContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addressText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  copyButton: {
    padding: 8,
  },
  copiedNotification: {
    backgroundColor: '#1FE15E20',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  copiedText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#1FE15E',
  },
  balanceLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 4,
  },
  balanceAmount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
  }
});