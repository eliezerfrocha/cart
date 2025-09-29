import { useEffect, useState } from "react";
import { Text, Image, View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import { getProduct } from "../services/productsService";
import { numberFormat } from "../services/numberFormat";
import { useCart } from "../services/cartContext";

export const ProductDetails = ({ route }) => {
	const { productId } = route.params;
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const [imageError, setImageError] = useState(false);
	const { addToCart } = useCart();
	const [isAdding, setIsAdding] = useState(false);
	const [added, setAdded] = useState(false);
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		const loadProduct = async () => {
			try {
				setLoading(true);
				const productData = await getProduct(productId);
				setProduct(productData || {});
			} catch (error) {
				console.error("Erro ao carregar produto:", error);
			} finally {
				setLoading(false);
			}
		};

		loadProduct();
	}, [productId]);

		function onAddToCart() {
			if (isAdding) return;
			setIsAdding(true);
			addToCart(product);
			setTimeout(() => {
				setIsAdding(false);
				setAdded(true);
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}).start(() => {
					setTimeout(() => {
						Animated.timing(fadeAnim, {
							toValue: 0,
							duration: 200,
							useNativeDriver: true,
						}).start(() => setAdded(false));
					}, 1200);
				});
			}, 700);
		}

		return (
			<View>
				<ScrollView>
					<Image style={styles.image} source={product.image} resizeMode="contain" />
					<View style={styles.infoContainer}>
						<Text style={styles.name}>{product.name}</Text>
						<Text style={styles.price}>{numberFormat(product.price)}</Text>
						<Text style={styles.description}>{product.description}</Text>
						<TouchableOpacity
							style={[styles.buyButton, isAdding && styles.buyButtonDisabled]}
							onPress={onAddToCart}
							activeOpacity={0.8}
							disabled={isAdding}
						>
							{isAdding ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={styles.buyButtonText}>Comprar</Text>
							)}
						</TouchableOpacity>
						{added && (
							<Animated.View style={[styles.addedMsgBox, { opacity: fadeAnim }]}> 
								<Text style={styles.addedMsg}>Adicionado ao carrinho!</Text>
							</Animated.View>
						)}
					</View>
				</ScrollView>
			</View>
		);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 16,
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowColor: "black",
		shadowOffset: {
			height: 0,
			width: 0,
		},
		elevation: 1,
		marginVertical: 20,
	},
	image: {
		width: "100%",
		aspectRatio: 16 / 9, // Proporção 16:9 (widescreen)
		backgroundColor: "#f5f5f5", // Cor de fundo enquanto carrega
	},
	infoContainer: {
		padding: 16,
	},
	name: {
		fontSize: 22,
		fontWeight: "bold",
	},
	price: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		fontWeight: "400",
		color: "#787878",
		marginBottom: 16,
	},
	imageWarning: {
		fontSize: 12,
		color: "#ff6b6b",
		fontStyle: "italic",
		marginBottom: 8,
	},
	buyButton: {
		backgroundColor: '#ff6b00',
		borderRadius: 12,
		paddingVertical: 16,
		alignItems: 'center',
		marginTop: 8,
		marginBottom: 8,
		width: '100%',
		shadowColor: '#ff6b00',
		shadowOpacity: 0.15,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2,
	},
	buyButtonDisabled: {
		backgroundColor: '#ffb380',
	},
	buyButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 18,
		letterSpacing: 1,
	},
	addedMsgBox: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: '90%',
		alignItems: 'center',
		zIndex: 10,
	},
	addedMsg: {
		backgroundColor: '#4BB543',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
		paddingHorizontal: 18,
		paddingVertical: 8,
		borderRadius: 20,
		overflow: 'hidden',
		shadowColor: '#4BB543',
		shadowOpacity: 0.15,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2,
	},
});
