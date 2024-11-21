import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../configurations/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { fetchNumOfUnreadNotifications } from "../hooks/slices/notificationSlice";

const data = [
  {
    id: 1,
    title: "Notification 1",
    content: "Content 1",
    seen: false,
  },
  {
    id: 2,
    title: "Notification 2",
    content: "Content 2",
    seen: true,
  },
  {
    id: 3,
    title: "Notification 3",
    content: "Content 3",
    seen: false,
  },
  {
    id: 4,
    title: "Notification 4",
    content: "Content 4",
    seen: true,
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const { numOfUnreadNotifications } = useSelector(
    (state) => state.notification
  );

  const fetchNotifications = async () => {
    try {
      if (user) {
        const notificationsRef = collection(db, "notifications"); // Tham chiếu tới collection
        const q = query(
          notificationsRef,
          where("userId", "==", user.uid)
          // orderBy("read", "desc")
        ); // Tạo query theo userId

        const querySnapshot = await getDocs(q); // Lấy dữ liệu từ Firestore
        const notificationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Lấy ID của document
          ...doc.data(), // Lấy dữ liệu của document
        }));

        console.log("Fetched Notifications:", notificationsData);
        setNotifications(notificationsData); // Lưu vào state
      } else {
        console.log("User is not logged in.");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [numOfUnreadNotifications]);

  const handleRead = async (item) => {
    try {
      const notificationRef = doc(db, "notifications", item.id);
      await updateDoc(notificationRef, {
        read: true,
      });
      dispatch(fetchNumOfUnreadNotifications({ userId: user.uid }));
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <View className="flex-1 bg-white p-5">
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border rounded-md mb-2 border-gray-200 p-4 flex-row justify-between items-start"
            onPress={() => {
              navigation.navigate("NotificationDetail", { item: item });
              handleRead(item);
            }}
          >
            <View>
              <Text className="font-bold text-lg">{item.title}</Text>
              <Text className="text-gray-400">{item.message}</Text>
            </View>
            <View className={`${!item.read} && "bg-red-50 p-2 rounded-xl"`}>
              <Text
                className={`${item.read ? "text-gray-400" : "text-red-500"}`}
              >
                {item.read ? "" : "New"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default NotificationScreen;
