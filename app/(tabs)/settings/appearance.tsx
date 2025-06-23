import { View, Text, StyleSheet } from 'react-native';

export default function AppearanceScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appearance</Text>
            <Text style={styles.subtitle}>Choose light/dark mode (coming soon).</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 90, color: '#fff', fontWeight: 'bold', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#aaa' },
});
