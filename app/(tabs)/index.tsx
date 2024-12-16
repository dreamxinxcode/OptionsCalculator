import { useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, Card, Date } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates'

export default function TabOneScreen() {
  const [symbol, setSymbol] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState(Date);
  const [strikePrice, setStrikePrice] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [premiumPaid, setPremiumPaid] = useState('');
  const [contracts, setContracts] = useState('');
  const [result, setResult] = useState(null);

  const calculateProfitLoss = () => {
    const strike = parseFloat(strikePrice);
    const stock = parseFloat(stockPrice);
    const premium = parseFloat(premiumPaid);
    const numContracts = parseInt(contracts);

    if (isNaN(strike) || isNaN(stock) || isNaN(premium) || isNaN(numContracts)) {
      setResult('Please enter valid numbers.');
      return;
    }

    const intrinsicValue = Math.max(stock - strike, 0); // For call options
    const profitLoss = (intrinsicValue - premium) * 100 * numContracts;

    setResult(`Profit/Loss: $${profitLoss.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
  <Card style={styles.card}>
        <Card.Title title="Options Contract Calculator" />
        <Card.Content>
          <TextInput
            label="Symbol"
            value={symbol}
            onChangeText={setSymbol}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Strike Price"
            value={strikePrice}
            onChangeText={setStrikePrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Stock Current Price"
            value={stockPrice}
            onChangeText={setStockPrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Premium Paid (Per Share)"
            value={premiumPaid}
            onChangeText={setPremiumPaid}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Number of Contracts"
            value={contracts}
            onChangeText={setContracts}
            keyboardType="numeric"
            style={styles.input}
          />
          <DatePickerInput 
            label={'Expiration Date'}
            value={expirationDate}
            onChange={setExpirationDate}
          />
          <Button mode="contained" onPress={calculateProfitLoss} style={styles.button}>
            Calculate
          </Button>
        </Card.Content>
      </Card>
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
