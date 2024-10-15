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
import InboxStack from "./InboxStack";
import MyInfoStack from "./MyInfoStack";
import SearchStack from "./SearchStack";

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === "Home") {
            icon = focused ? faHome : faHome;
          } else if (route.name === "Search") {
            icon = focused ? faSearch : faSearch;
          } else if (route.name === "Favourites") {
            icon = focused ? faHeart : faHeart;
          } else if (route.name === "Inbox") {
            icon = focused ? faMessage : faMessage;
          } else {
            icon = focused ? faInfo : faInfo;
          }

          return <FontAwesomeIcon icon={icon} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Favourites" component={FavouriteStack} />
      <Tab.Screen name="Inbox" component={InboxStack} />
      <Tab.Screen name="MyInfo" component={MyInfoStack} />
    </Tab.Navigator>
  );
}

export default MainTab;
