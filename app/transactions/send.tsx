import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { ethers } from 'ethers';


export default function SendScreen() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const sendTransaction = async () => {
        if (!recipient || !amount) {
            Alert.alert('Error', 'Please enter recipient and amount.');
            return;
        }

        if (!ethers.utils.isAddress(recipient)) {
            Alert.alert('Invalid address', 'Please enter a valid Ethereum address.');
            return;
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            Alert.alert('Invalid amount', 'Please enter a valid ETH amount.');
            return;
        }

        try {
            const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/eb4fdaf55eee452ba8dd80f7cb107ef0');

            // For testing only — DO NOT use in production
            const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

            const tx = await wallet.sendTransaction({
                to: recipient,
                value: ethers.utils.parseEther(amount),
            });

            Alert.alert('Success', `Transaction sent! Hash: ${tx.hash}`);
        } catch (error) {
            Alert.alert('Error', error?.message || 'Transaction failed');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.title}>Send ETH</Text>

                {/* placeholder to balance the header */}
                <View style={styles.placeholder} />
            </View>

            {/* Form Inputs */}
            <TextInput
                placeholder="Recipient Address"
                placeholderTextColor="#888"
                style={styles.input}
                value={recipient}
                onChangeText={setRecipient}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TextInput
                placeholder="Amount in ETH"
                placeholderTextColor="#888"
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={sendTransaction}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
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
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginHorizontal: 20,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1fe15e',
        borderRadius: 12,
        paddingVertical: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
