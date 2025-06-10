import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CHAINS = [
    { name: 'Ethereum', logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png' },
    { name: 'Polygon', logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/matic.png' },
    { name: 'Binance Smart Chain', logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bnb.png' },
];

const TOKENS = [
    { symbol: 'ETH', logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png' },
    { symbol: 'UNI', logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/uni.png' },
    { symbol: 'USDT', logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdt.png' },
];

export default function SwapScreen() {
    const router = useRouter();

    const [fromAmount, setFromAmount] = useState('0');
    const [toAmount, setToAmount] = useState('0');
    const [fromToken, setFromToken] = useState(TOKENS[1]);
    const [toToken, setToToken] = useState(TOKENS[0]);
    const [fromChain, setFromChain] = useState(CHAINS[0]);
    const [toChain, setToChain] = useState(CHAINS[0]);

    const handleSwitch = () => {
        setFromToken(toToken);
        setToToken(fromToken);
        setFromChain(toChain);
        setToChain(fromChain);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Swap</Text>
                <TouchableOpacity>
                    <Feather name="settings" size={22} color="white" />
                </TouchableOpacity>
            </View>

            {/* From Token Card */}
            <View style={styles.card}>
                <View style={styles.chainRow}>
                    <Text style={styles.label}>From</Text>
                    <TouchableOpacity style={styles.chainSelect}>
                        <Image source={{ uri: fromChain.logo }} style={styles.chainLogo} />
                        <Text style={styles.chainName}>{fromChain.name}</Text>
                        <Feather name="chevron-down" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.tokenRow}>
                    <View style={styles.tokenLeft}>
                        <Image source={{ uri: fromToken.logo }} style={styles.tokenLogo} />
                        <Text style={styles.tokenSymbol}>{fromToken.symbol}</Text>
                        <Feather name="chevron-right" size={16} color="#fff" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="0"
                        placeholderTextColor="#999"
                        value={fromAmount}
                        onChangeText={setFromAmount}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.balanceRow}>
                    <Text style={styles.balanceText}>0</Text>
                    <Text style={styles.buyText}>Buy</Text>
                </View>
            </View>

            {/* Switch Icon */}
            <TouchableOpacity style={styles.switchIconWrapper} onPress={handleSwitch}>
                <Ionicons name="swap-vertical" size={24} color="#fff" />

            </TouchableOpacity>

            {/* To Token Card */}
            <View style={styles.card}>
                <View style={styles.chainRow}>
                    <Text style={styles.label}>To</Text>
                    <TouchableOpacity style={styles.chainSelect}>
                        <Image source={{ uri: toChain.logo }} style={styles.chainLogo} />
                        <Text style={styles.chainName}>{toChain.name}</Text>
                        <Feather name="chevron-down" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.tokenRow}>
                    <View style={styles.tokenLeft}>
                        <Image source={{ uri: toToken.logo }} style={styles.tokenLogo} />
                        <Text style={styles.tokenSymbol}>{toToken.symbol}</Text>
                        <Feather name="chevron-right" size={16} color="#fff" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="0"
                        placeholderTextColor="#999"
                        value={toAmount}
                        onChangeText={setToAmount}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.balanceRow}>
                    <Text style={styles.balanceText}>0</Text>
                    <Text style={styles.usdText}>$0.00</Text>
                </View>
            </View>

            {/* Exchange Rate */}
            <View style={styles.rateRow}>
                <Feather name="refresh-ccw" size={14} color="#aaa" />
                <Text style={styles.rateText}> 1 {toToken.symbol} ≈ 403.53 {fromToken.symbol} </Text>
                <Feather name="arrow-right" size={14} color="#aaa" />
            </View>

            {/* Continue Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 16,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    chainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chainSelect: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chainLogo: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 6,
    },
    chainName: {
        color: '#fff',
        fontSize: 14,
        marginRight: 4,
    },
    label: {
        color: '#aaa',
        fontSize: 14,
    },
    tokenRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        justifyContent: 'space-between',
    },
    tokenLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tokenLogo: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    tokenSymbol: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 6,
    },
    input: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'right',
        minWidth: 60,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    balanceText: {
        fontSize: 20,
        color: '#aaa',
    },
    buyText: {
        fontSize: 12,
        backgroundColor: '#2E7D32',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 6,
        overflow: 'hidden',
    },
    usdText: {
        color: '#555',
        fontSize: 12,
    },
    switchIconWrapper: {
        alignSelf: 'center',
        marginVertical: 8,
        padding: 6,
        backgroundColor: '#1e1e1e',
        borderRadius: 20,
    },
    rateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    rateText: {
        color: '#aaa',
        fontSize: 13,
    },
    button: {
        marginTop: 24,
        backgroundColor: '#1fe15e',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});
