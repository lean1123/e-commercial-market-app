// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import MainTab from "./src/navigations/MainTab";
import Login from "./src/screens/Login";
import AuthStack from "./src/navigations/AuthStack";
import { auth } from "./src/configurations/firebaseConfig";

export default function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.screen}>
        {user ? <MainTab /> : <AuthStack />}
        {/* <MainTab /> */}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignContent: "center",
  },
});
