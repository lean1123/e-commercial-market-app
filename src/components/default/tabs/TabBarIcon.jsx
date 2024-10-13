import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const TabBarIcon = ({ name }) => {
  if (route.name === "Home") {
    iconName = focused ? "home" : "details";
  } else if (route.name === "details") {
    iconName = focused ? "ios-list" : "ios-list-outline";
  }

  return <FontAwesomeIcon icon={name} />;
};

export default TabBarIcon;
