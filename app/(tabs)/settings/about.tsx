import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.description}>This wallet app is designed for security and simplicity.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: '#1FE15E',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#FFF',
    },
});
