import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsList } from "./src/screens/ProductList";
import { ProductDetails } from "./src/screens/ProductDetails";
import { Cart } from "./src/screens/Cart";
import { CartIcon } from "./src/components/CartIcon";
import { CartProvider } from "./src/services/cartContext";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Products"
            component={ProductsList}
            options={({ navigation }) => ({
              title: "Produtos",
              headerTitleStyle: styles.headerTitle,
              headerRight: () => <CartIcon navigation={navigation} />, 
            })}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={({ navigation }) => ({
              title: "Detalhes do produto",
              headerTitleStyle: styles.headerTitle,
              headerRight: () => <CartIcon navigation={navigation} />, 
            })}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={({ navigation }) => ({
              title: "Meu carrinho",
              headerTitleStyle: styles.headerTitle,
              headerRight: () => <CartIcon navigation={navigation} />, 
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  },
});

export default App;
