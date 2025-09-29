
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import { useCart } from "../services/cartContext";
import { numberFormat } from "../services/numberFormat";

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.infoSection}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{numberFormat(item.price)}</Text>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>×</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.qtyRow}>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.total}>{numberFormat(getTotalPrice())}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 18,
    padding: 12,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    color: '#007acc',
    marginBottom: 2,
  },
  removeBtn: {
    marginLeft: 8,
    backgroundColor: '#ff6b6b',
    borderRadius: 16,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  qtyBtn: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  qty: {
    fontSize: 16,
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  totalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fffbe6',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: '#f5d06f',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
    color: '#b8860b',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b8860b',
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
  },
});
