// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     StyleSheet,
//     TouchableOpacity,
//     Alert,
// } from 'react-native';
// import { getWalletClient } from '../../lib/viemConfig';
// import { parseEther } from 'viem';

// export default function SendScreen() {
//     const [recipient, setRecipient] = useState('');
//     const [amount, setAmount] = useState('');

//     const sendTransaction = async () => {
//         if (!recipient || !amount) {
//             Alert.alert('Error', 'Please enter recipient and amount.');
//             return;
//         }

//         try {
//             const walletClient = getWalletClient();
//             const valueInWei = parseEther(amount);

//             // viem WalletClient has sendTransaction method, use it
//             const hash = await walletClient.sendTransaction({
//                 to: recipient,
//                 value: valueInWei,
//             });

//             Alert.alert('Success', `Transaction sent! Hash: ${hash}`);
//         } catch (error: any) {
//             Alert.alert('Error', error?.message || 'Transaction failed');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Send ETH</Text>

//             <TextInput
//                 placeholder="Recipient Address"
//                 placeholderTextColor="#888"
//                 style={styles.input}
//                 value={recipient}
//                 onChangeText={setRecipient}
//                 autoCapitalize="none"
//             />

//             <TextInput
//                 placeholder="Amount in ETH"
//                 placeholderTextColor="#888"
//                 style={styles.input}
//                 value={amount}
//                 onChangeText={setAmount}
//                 keyboardType="numeric"
//             />

//             <TouchableOpacity style={styles.button} onPress={sendTransaction}>
//                 <Text style={styles.buttonText}>Send</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#000', padding: 20, justifyContent: 'center' },
//     title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 40, textAlign: 'center' },
//     input: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 12, marginBottom: 20, fontSize: 16 },
//     button: { backgroundColor: '#1fe15e', borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
//     buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
// });
