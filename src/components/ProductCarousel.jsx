// import * as React from "react";
// import { Dimensions, Text, View } from "react-native";
// import { useSharedValue } from "react-native-reanimated";
// // import Carousel from "react-native-reanimated-carousel";
// // import Carousel from "react-native-reanimated-carousel";

// const images = [
//   "https://picsum.photos/200/300",
//   "https://picsum.photos/seed/picsum/200/300",
//   "https://picsum.photos/200/300?grayscale",
// ];

// const a = useSharedValue();

// const ProductCarousel = () => {
//   const width = Dimensions.get("window").width;

//   return (
//     <View className="flex-1">
//       <Carousel
//         loop
//         width={width}
//         height={width / 2}
//         autoPlay={true}
//         data={images}
//         scrollAnimationDuration={1000}
//         onSnapToItem={(index) => console.log("current index:", index)}
//         renderItem={({ index }) => (
//           <View
//             style={{
//               flex: 1,
//               borderWidth: 1,
//               justifyContent: "center",
//             }}
//           >
//             <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default ProductCarousel;
