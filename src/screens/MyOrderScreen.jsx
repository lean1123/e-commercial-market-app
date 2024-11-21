import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";
import CartItem from "../components/CartItem";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 20,
    quantity: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: 30,
    quantity: 2,
  },
  {
    id: 3,
    name: "Product 3",
    price: 40,
    quantity: 3,
  },
];

const MyOrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const ordersList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersList);
        } else {
          console.log("No user is logged in");
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView
      className="flex flex-col flex-1 p-5 bg-white"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text className="text-2xl font-bold mb-4">My Orders</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginTop: 40 }}
        scrollEnabled={false}
        style
      />

      <TouchableOpacity
        className="bg-sky-300 rounded-md w-full flex flex-row items-center justify-center py-3 mt-4"
        onPress={() => {
          navigation.navigate("myInfoScreen");
        }}
      >
        <Text className="text-white text-base font-semibold mr-2">
          BACK TO MY PROFILE
        </Text>
        <Icon source={"arrow-left"} color="white" size={18} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyOrderScreen;
