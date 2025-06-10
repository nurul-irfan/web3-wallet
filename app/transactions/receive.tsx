import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Share,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Copy, Share as ShareIcon } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { useAppContext } from '@/context/AppContext'; // Make sure this is the correct path

export default function ReceiveScreen() {
    const { wallet } = useAppContext(); // 👈 get wallet from context
    const walletAddress = wallet?.address || '';

    const copyToClipboard = async () => {
        try {
            await Clipboard.setStringAsync(walletAddress);
            Alert.alert('Copied!', 'Address copied to clipboard');
        } catch (error) {
            Alert.alert('Error', 'Failed to copy address');
        }
    };

    const shareAddress = async () => {
        try {
            await Share.share({
                message: `My wallet address: ${walletAddress}`,
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to share address');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Receive</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                {walletAddress ? (
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={walletAddress}
                            size={200}
                            color="black"
                            backgroundColor="white"
                        />
                    </View>
                ) : (
                    <Text style={styles.loadingText}>Generating QR Code...</Text>
                )}

                <Text style={styles.addressLabel}>Your Wallet Address</Text>
                <View style={styles.addressContainer}>
                    <Text style={styles.address} selectable>
                        {walletAddress}
                    </Text>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.actionButton} onPress={copyToClipboard}>
                        <Copy size={20} color="#000" />
                        <Text style={styles.actionButtonText}>Copy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={shareAddress}>
                        <ShareIcon size={20} color="#000" />
                        <Text style={styles.actionButtonText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    qrContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 12,
        marginBottom: 20,
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
    },
    addressLabel: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    addressContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 15,
        width: '100%',
        marginBottom: 20,
    },
    address: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'monospace',
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1fe15e',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        marginHorizontal: 10,
    },
    actionButtonText: {
        color: '#000',
        marginLeft: 8,
        fontSize: 16,
    },
});