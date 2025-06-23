import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function BrowserScreen() {
  const webViewRef = useRef(null);
  const [inputUrl, setInputUrl] = useState('https://mdcx.live');
  const [canGoBack, setCanGoBack] = useState(false);

  const formatUrl = (url: string) => {
    let formatted = url.trim();
    if (!formatted.startsWith('http')) {
      formatted = 'https://' + formatted;
    }
    try {
      new URL(formatted);
      return formatted;
    } catch {
      return null;
    }
  };

  const goToUrl = () => {
    const valid = formatUrl(inputUrl);
    if (valid && webViewRef.current) {
      webViewRef.current.loadUrl(valid);
    } else {
      Alert.alert('Invalid URL', 'Please enter a valid web address.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top URL bar */}
      <View style={styles.urlBar}>
        <TextInput
          style={styles.input}
          value={inputUrl}
          onChangeText={setInputUrl}
          onSubmitEditing={goToUrl}
          placeholder="Enter Dapp URL"
          placeholderTextColor="#888"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          returnKeyType="go"
        />
        <TouchableOpacity style={styles.goButton} onPress={goToUrl}>
          <Text style={styles.goText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: inputUrl }}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setInputUrl(navState.url);
        }}
        style={{ flex: 1 }}
      />

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => canGoBack && webViewRef.current.goBack()}>
          <Text style={styles.navText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => webViewRef.current.reload()}>
          <Text style={styles.navText}>⟳ Reload</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Multi-Dapp tabs feature is under development.')}>
          <Text style={[styles.navText, styles.addDapp]}>＋ Add Dapp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  urlBar: {
    flexDirection: 'row',
    padding: 25,
    backgroundColor: '#111',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#333',
    color: '#fff',
  },
  goButton: {
    marginLeft: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
  },
  goText: {
    color: '#000',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderColor: '#333',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  addDapp: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
