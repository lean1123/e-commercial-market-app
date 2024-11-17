import {
  faHeart,
  faHome,
  faInfo,
  faMessage,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavouriteStack from "./FavouriteStack";
import HomeStack from "./HomeStack";
import InboxStack from "./NotificationStack";
import MyInfoStack from "./MyInfoStack";
import SearchStack from "./SearchStack";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome6,
} from "@expo/vector-icons";
import { Text } from "react-native";
import NotificationStack from "./NotificationStack";

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingBottom: 15,
          paddingTop: 15,
        },
        tabBarActiveTintColor: "cyan",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Search
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Favourites
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={size} color={color} />
          ),
          //tabBarBadge: "99+",
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Notification
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={size}
              color={color}
            />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfoStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Account
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="circle-user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
