import { View, Text, StyleSheet } from 'react-native';

export default function SecurityScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Security Settings</Text>
            <Text style={styles.subtitle}>Coming soon: biometric auth, pin lock, etc.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, color: '#fff', fontWeight: 'bold', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#aaa' },
});
