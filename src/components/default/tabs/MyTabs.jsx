import {
  faAdd,
  faAnchor,
  faHome,
  faHomeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetailsScreen from "../../../screens/DetailsScreen";
import HomeIndex from "../../../screens/home/HomeIndex";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === "Home") {
            icon = focused ? faHome : faHomeAlt;
          } else if (route.name === "DetailsScreen") {
            icon = focused ? faAnchor : faAdd;
          }

          return <FontAwesomeIcon icon={icon} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeIndex}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        initialParams={{ content: "Day la trang chi tiet" }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
