import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useAppContext } from '../../context/AppContext';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowUp, ArrowUpDown, Layers, ChevronDown } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { router } from 'expo-router';
import { getWalletBalance } from '../../utils/wallet';


interface Action {
  name: string;
  symbol: string;
  type: 'Sell' | 'Buy';
  icon: string;
}

interface Asset {
  name: string;
  symbol: string;
  amount: string;
  value: number;
  change: number;
  icon: string;
  network: string;
}

interface Chain {
  name: string;
  icon: string;
  rpcUrl: string;
  symbol: string; // Native token symbol (e.g., ETH, MATIC)
}

const chains: Chain[] = [
  {
    name: 'Ethereum',
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    rpcUrl: 'https://sepolia.infura.io/v3/f0309636a71c4936a1ad664486b7dc12',
    symbol: 'ETH',
  },
  {
    name: 'Polygon',
    icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    rpcUrl: 'https://polygon-mainnet.infura.io/v3/f0309636a71c4936a1ad664486b7dc12',
    symbol: 'MATIC',
  },
  {
    name: 'BSC',
    icon: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png',
    rpcUrl: 'https://bsc-mainnet.infura.io/v3/f0309636a71c4936a1ad664486b7dc12',
    symbol: 'BNB',
  },
];


const actions: Action[] = [
  { name: 'SOL', symbol: 'SOL  ->', type: 'Sell', icon: 'https://assets.coingecko.com/coins/images/4128/small/Solana.png' },
  { name: 'MELD', symbol: 'MELD  ->', type: 'Buy', icon: 'https://assets.coingecko.com/coins/images/20309/small/MELD_logo.png' },
  { name: 'USDC', symbol: 'USDC  ->', type: 'Buy', icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png' },
];

const mockAssets: Asset[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '1.421',
    value: 4532.62,
    change: 4.4,
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    network: 'Base',
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    amount: '3.234',
    value: 3124.85,
    change: 1.1,
    icon: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png',
    network: 'BSC',
  },
  {
    name: 'MATIC',
    symbol: 'MATIC',
    amount: '231.421',
    value: 732.73,
    change: -2.6,
    icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    network: 'POLYGON',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    amount: '500.12',
    value: 500.85,
    change: 0.1,
    icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    network: 'BSC',
  },
];

export default function WalletScreen() {
  const { wallet } = useAppContext();
  const [chainBalances, setChainBalances] = useState<{ [key: string]: string }>({});
  const totalValue = Object.values(chainBalances).reduce(
    (acc, val) => acc + parseFloat(val || '0'),
    0
  );

  // const totalValue = parseFloat(walletBalance) || 0;
  const [totalChange] = useState({ percent: 8.32, value: 775.42 });
  const [selectedTab, setSelectedTab] = useState('Assets');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0]);
  // const [chainBalances, setChainBalances] = useState<{ [key: string]: string }>({});




  const chartData = {
    labels: ['', '', '', '', '', ''],
    datasets: [{
      data: [19200, 19400, 19600, 19800, 19900, 19981.13],
      color: (opacity = 1) => `rgba(31, 225, 94, ${opacity})`,
    }]
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };


  const screenWidth = Dimensions.get('window').width;


  useEffect(() => {
    const fetchBalances = async () => {
      if (!wallet?.address) return;

      const balances: { [key: string]: string } = {};

      await Promise.all(
        chains.map(async (chain) => {
          const balance = await getWalletBalance(wallet.address, chain.rpcUrl);
          balances[chain.name] = balance;
        })
      );

      setChainBalances(balances);
    };

    fetchBalances();
  }, [wallet]);



  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={styles.header} entering={FadeIn.duration(600)}>
        {/* Address Header */}
        <View style={styles.addressContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
          <Text style={styles.address}>{formatAddress(wallet?.address || '')}</Text>
          <TouchableOpacity
            style={styles.chainSelector}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.chainText}>
              {selectedChain?.name || 'Select Chain'}
            </Text>
          </TouchableOpacity>


        </View>

        <Text style={styles.assetText}>36 Assets on 5 chains</Text>

        {/* Total Value */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Text style={styles.totalValue}>
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          {selectedChain ? (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 4 }}>
              <Image source={{ uri: selectedChain.icon }} style={{ width: 18, height: 18, marginRight: 6 }} />
              <Text style={{ color: '#fff', fontSize: 14 }}>
                {chainBalances[selectedChain.name] || '...'} {selectedChain.symbol}
              </Text>
            </View>
          ) : (
            chains.map((chain) => (
              <View key={chain.name} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 4 }}>
                <Image source={{ uri: chain.icon }} style={{ width: 18, height: 18, marginRight: 6 }} />
                <Text style={{ color: '#fff', fontSize: 14 }}>
                  {chainBalances[chain.name] || '...'} {chain.symbol}
                </Text>
              </View>
            ))
          )}
          <View style={styles.changeContainer}>
            <Text style={[styles.changeText, { color: '#1FE15E' }]}>
              +{totalChange.percent}%
            </Text>
            <Text style={[styles.changeValue, { color: '#1FE15E' }]}>
              (${totalChange.value})
            </Text>
          </View>
        </View>


        {/* Chart */}
        <LineChart
          data={chartData}
          width={500} // ✅ full screen width
          height={80}
          chartConfig={{
            backgroundColor: '#000000',
            backgroundGradientFrom: '#000000',
            backgroundGradientTo: '#000000',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(31, 225, 94, ${opacity})`,
            fillShadowGradient: '#1FE15E',
            fillShadowGradientOpacity: 0.7,
            propsForBackgroundLines: {
              stroke: 'transparent',
            },
          }}
          bezier
          style={{ marginVertical: 2 }}
          withDots={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={true}
          withScrollableDot={false}
          withVerticalLabels={false}
          withHorizontalLabels={false}
        />

        {/* ✅ Chains ScrollView */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(true)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#1A1A1A', margin: 20, borderRadius: 12, padding: 16 }}>
              <Text style={{ color: '#fff', fontSize: 18, marginBottom: 12, fontWeight: '600' }}>
                Select Chain
              </Text>

              {chains.map((chain, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: index !== chains.length - 1 ? 1 : 0,
                    borderBottomColor: '#333',
                  }}
                  onPress={() => {
                    setSelectedChain(chain);
                    setModalVisible(false);
                  }}
                >
                  <Image source={{ uri: chain.icon }} style={{ width: 24, height: 24, marginRight: 12 }} />
                  <Text style={{ color: '#fff', fontSize: 16 }}>{chain.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>





        {/* Modal for Chain Info */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' }}>
            <View style={{
              backgroundColor: '#1A1A1A',
              marginHorizontal: 30,
              borderRadius: 10,
              paddingVertical: 20,
              paddingHorizontal: 16,
            }}>
              {chains.map((chain, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedChain(chain);
                    setModalVisible(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: index !== chains.length - 1 ? 1 : 0,
                    borderBottomColor: '#333',
                  }}
                >
                  <Image source={{ uri: chain.icon }} style={{ width: 24, height: 24, marginRight: 12 }} />
                  <Text style={{ color: '#fff', fontSize: 16 }}>{chain.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>


        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/transactions/send')}
          >
            <ArrowUp size={24} color="#fff" />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              router.push('/transactions/receive'); // Navigate to the 'receive' screen
            }}
          >
            <Layers size={24} color="#fff" />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}
            onPress={() => {
              router.push('/transactions/swap'); // Navigate to the 'receive' screen
            }}
          >
            <ArrowUpDown size={24} color="#fff" />
            <Text style={styles.actionText}>Swap</Text>
          </TouchableOpacity>
        </View>

        {/* Action Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.actionsScroll}
        >
          {actions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionCard}>
              <Image source={{ uri: action.icon }} style={styles.actionIcon} />
              <View style={styles.actionInfo}>
                <Text style={styles.actionSymbol}>{action.symbol}</Text>
                <Text style={[
                  styles.actionType,
                  { color: action.type === 'Buy' ? '#1FE15E' : '#FF5252' }
                ]}>
                  {action.type}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Assets' && styles.selectedTab]}
            onPress={() => setSelectedTab('Assets')}
          >
            <Text style={[styles.tabText, selectedTab === 'Assets' && styles.selectedTabText]}>
              Assets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'NFTs' && styles.selectedTab]}
            onPress={() => setSelectedTab('NFTs')}
          >
            <Text style={[styles.tabText, selectedTab === 'NFTs' && styles.selectedTabText]}>
              NFTs
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Asset List */}
      {selectedTab === 'Assets' &&
        <View style={styles.assetsList}>
          {mockAssets.map((asset, index) => (
            <View key={index} style={styles.assetItem}>
              <View style={styles.assetInfo}>
                <Image source={{ uri: asset.icon }} style={styles.assetIcon} />
                <View>
                  <Text style={styles.assetName}>{asset.name}</Text>
                  <Text style={styles.assetDetails}>
                    {asset.amount} {asset.symbol} ({asset.network})
                  </Text>
                </View>
              </View>
              <View style={styles.assetValue}>
                <Text style={styles.assetValueText}>
                  ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={[
                  styles.assetChange,
                  { color: asset.change >= 0 ? '#1FE15E' : '#FF5252' }
                ]}>
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      }

      {selectedTab === 'NFTs' &&
        <View>
          <Text style={styles.assetName}>Coming Soon</Text>
        </View>

      }
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginTop: 40,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  address: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  chainSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chainText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 4,
  },

  chainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedChainButton: {
    backgroundColor: '#2A2A2A',
  },
  chainIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  chainButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#808080',
  },
  selectedChainText: {
    color: '#FFFFFF',
  },
  assetsCount: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#808080',
    textAlign: "center",
    marginBottom: 8,
  },
  totalValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 54,
    textAlign: "center",
    color: '#FFFFFF',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // ensures horizontal centering of row content
    alignItems: 'center',
    marginBottom: 2,
  },
  changeText: {
    fontFamily: 'Inter_600SemiBold',

    fontSize: 16,
    marginRight: 4,
  },
  changeValue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    width: '30%',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 8,
  },
  actionsScroll: {
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 12,
    marginRight: 8,
    width: 150,
  },
  actionIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  actionInfo: {
    flexDirection: 'row',
    gap: 15,
  },
  actionSymbol: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  actionType: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: '#2A2A2A',
  },
  tabText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#808080',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  assetsList: {
    marginTop: 8,
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  assetName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  assetDetails: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#808080',
  },
  assetValue: {
    alignItems: 'flex-end',
  },
  assetValueText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  assetChange: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  assetText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
});

