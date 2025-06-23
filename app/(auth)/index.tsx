import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp
} from 'react-native-reanimated';

export default function WelcomeScreen() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/generate-mnemonic');
    };

    const handleImportWallet = () => {
        router.push('/import-wallet');
    };

    const handleTermsPress = () => {
        Linking.openURL('https://example.com/terms');
    };

    const handlePrivacyPress = () => {
        Linking.openURL('https://example.com/privacy');
    };



    return (
        <View style={styles.container}>
            <Animated.View
                style={styles.logoContainer}
                entering={FadeIn.delay(300).duration(800)}
            >
                <Image
                    source={{ uri: 'https://i.ibb.co/FsSqg91/mfx-logo.png' }}
                    style={styles.logo}
                />
            </Animated.View>

            <Animated.View
                style={styles.headerContainer}
                entering={FadeInDown.delay(500).duration(800)}
            >
                <Text style={styles.title}>MFX3 Pay</Text>
                <Text style={styles.subtitle}>
                    Your gateway to Web3 assets {'\n'}
                    and decentralized finance.
                </Text>
            </Animated.View>

            <Animated.View
                style={styles.buttonContainer}
                entering={FadeInUp.delay(700).duration(800)}
            >
                <Button
                    title="Get started"
                    onPress={handleGetStarted}
                    style={styles.button}
                />

                <Text
                    style={styles.importLink}
                    onPress={handleImportWallet}
                >
                    Import existing wallet
                </Text>

                <Text style={styles.termsText}>
                    By continuing, you agree to our{'\n'}
                    <Text style={styles.linkText} onPress={handleTermsPress}>
                        Terms of Service
                    </Text> and <Text style={styles.linkText} onPress={handlePrivacyPress}>
                        Privacy Policy
                    </Text>
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 24,
        justifyContent: 'space-between',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 80,
    },
    logo: {
        width: 100,
        height: 100,
    },
    headerContainer: {
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 36,
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: '#CCCCCC',
        textAlign: 'center',
        lineHeight: 26,
    },
    buttonContainer: {
        marginBottom: 40,
    },
    button: {
        width: '100%',
        marginBottom: 24,
    },
    importLink: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: '#1FE15E',
        textAlign: 'center',
        marginBottom: 32,
    },
    termsText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#808080',
        textAlign: 'center',
        lineHeight: 20,
    },
    linkText: {
        color: '#1FE15E',
    },
});