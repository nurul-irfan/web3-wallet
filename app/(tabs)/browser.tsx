import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function BrowserScreen() {
  const [url, setUrl] = useState('https://example.com');
  const [inputUrl, setInputUrl] = useState(url);
  const webviewRef = useRef(null);

  const goToUrl = () => {
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http')) {
      finalUrl = `https://${finalUrl}`;
    }
    setUrl(finalUrl);
  };

  return (
    <View style={{ flex: 1, marginTop:20, }}>
      {/* Top URL bar */}
      <View style={styles.urlBar}>
        <TextInput
          style={styles.input}
          value={inputUrl}
          onChangeText={setInputUrl}
          onSubmitEditing={goToUrl}
          placeholder="Enter URL"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={goToUrl} style={styles.goButton}>
          <Text style={styles.goText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Web content */}
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </View>
  );
}

const styles = StyleSheet.create({
  urlBar: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#222',
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
    backgroundColor: '#1FE15E',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 5,
  },
  goText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
