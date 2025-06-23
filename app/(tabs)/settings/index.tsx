import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
    Shield,
    Key,
    Moon,
    Info as InfoIcon,
    LogOut,
    ChevronRight,
} from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SettingsScreen() {
    const router = useRouter();

    const handleLogout = () => {
        // You can add logic here to clear user session or wallet state
        router.replace('/');

    };

    const renderSettingItem = (
        icon: React.ReactNode,
        title: string,
        onPress: () => void
    ) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <View style={styles.settingIconContainer}>{icon}</View>
            <Text style={styles.settingText}>{title}</Text>
            <ChevronRight size={20} color="#808080" />
        </TouchableOpacity>
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <Animated.View style={styles.header} entering={FadeIn.duration(600)}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>Manage your wallet preferences</Text>
            </Animated.View>

            <View style={styles.settingsContainer}>
                <Text style={styles.sectionTitle}>Security</Text>

                {renderSettingItem(
                    <Shield size={22} color="#1FE15E" />,
                    'Security Settings',
                    () => router.push('/settings/security')
                )}

                {renderSettingItem(
                    <Key size={22} color="#1FE15E" />,
                    'Backup Recovery Phrase',
                    () => router.push('/settings/recovery')
                )}
            </View>

            <View style={styles.settingsContainer}>
                <Text style={styles.sectionTitle}>Preferences</Text>

                {renderSettingItem(
                    <Moon size={22} color="#3385FF" />,
                    'Appearance',
                    () => router.push('/settings/appearance') // ✅
                )}

                {renderSettingItem(
                    <InfoIcon size={22} color="#3385FF" />,
                    'About',
                    () => router.push('/settings/about') // ✅
                )}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <LogOut size={20} color="#FF5252" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>Version 1.0.0</Text>
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
    header: {
        marginBottom: 32,
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 28,
        color: '#FFFFFF',
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#B3B3B3',
    },
    settingsContainer: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    settingIconContainer: {
        width: 40,
        alignItems: 'center',
        marginRight: 16,
    },
    settingText: {
        flex: 1,
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#FFFFFF',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F1F1F',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        marginBottom: 24,
    },
    logoutText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: '#FF5252',
        marginLeft: 12,
    },
    versionText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#808080',
        textAlign: 'center',
    },
});
