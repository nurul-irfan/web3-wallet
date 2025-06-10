import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInputProps 
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';

interface TextInputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function TextInputField({ 
  label, 
  error, 
  isPassword = false, 
  ...rest 
}: TextInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(!isPassword);
  
  const focusAnim = useSharedValue(0);
  
  const onFocus = () => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 200 });
  };
  
  const onBlur = () => {
    setIsFocused(false);
    if (!rest.value) {
      focusAnim.value = withTiming(0, { duration: 200 });
    }
  };
  
  const containerStyle = useAnimatedStyle(() => {
    return {
      borderColor: error 
        ? withTiming('#FF5252') 
        : interpolateColor(
            focusAnim.value,
            [0, 1],
            ['#333333', '#1FE15E']
          ),
    };
  });
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={[styles.inputContainer, containerStyle]}>
        <AnimatedTextInput
          style={styles.input}
          placeholderTextColor="#808080"
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={isPassword && !isVisible}
          selectionColor="#1FE15E"
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity 
            onPress={toggleVisibility} 
            style={styles.visibilityButton}
          >
            {isVisible ? (
              <EyeOff size={20} color="#808080" />
            ) : (
              <Eye size={20} color="#808080" />
            )}
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputContainer: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  visibilityButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#FF5252',
    marginTop: 4,
    marginLeft: 4,
  },
});