import { View, Text, StyleSheet } from 'react-native';

export default function RecoveryScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Backup Recovery Phrase</Text>
            <Text style={styles.subtitle}>Show or regenerate your seed phrase securely.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, color: '#fff', fontWeight: 'bold', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#aaa' },
});
