import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Clipboard 
} from 'react-native';
import { Eye, EyeOff, Copy, CircleCheck as CheckCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
  withDelay
} from 'react-native-reanimated';

interface MnemonicDisplayProps {
  mnemonic: string[];
}

export function MnemonicDisplay({ mnemonic }: MnemonicDisplayProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const opacity = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const copyToClipboard = () => {
    Clipboard.setString(mnemonic.join(' '));
    setCopied(true);
    
    // Animation sequence
    opacity.value = withSequence(
      withTiming(0.6, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
    
    // Reset copied status after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Recovery Phrase</Text>
        <TouchableOpacity onPress={toggleVisibility} style={styles.visibilityButton}>
          {isHidden ? (
            <Eye size={20} color="#1FE15E" />
          ) : (
            <EyeOff size={20} color="#1FE15E" />
          )}
        </TouchableOpacity>
      </View>
      
      <Text style={styles.warningText}>
        Write these words down on paper and keep them in a safe place. They are the only way to recover your wallet if you forget your password.
      </Text>
      
      <Animated.View style={[styles.mnemonicGrid, animatedStyle]}>
        {mnemonic.map((word, index) => (
          <View key={index} style={styles.wordContainer}>
            <Text style={styles.wordNumber}>{index + 1}</Text>
            <Text style={styles.wordText}>
              {isHidden ? '••••••' : word}
            </Text>
          </View>
        ))}
      </Animated.View>
      
      <TouchableOpacity 
        style={styles.copyButton} 
        onPress={copyToClipboard}
        disabled={copied}
      >
        {copied ? (
          <View style={styles.copyContent}>
            <CheckCircle size={16} color="#1FE15E" />
            <Text style={styles.copyText}>Copied!</Text>
          </View>
        ) : (
          <View style={styles.copyContent}>
            <Copy size={16} color="#1FE15E" />
            <Text style={styles.copyText}>Copy to clipboard</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  visibilityButton: {
    padding: 8,
  },
  warningText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 16,
    lineHeight: 20,
  },
  mnemonicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  wordContainer: {
    width: '30%',
    backgroundColor: '#242424',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordNumber: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#808080',
    marginRight: 8,
  },
  wordText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  copyButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#1F1F1F',
  },
  copyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#1FE15E',
    marginLeft: 8,
  },
});