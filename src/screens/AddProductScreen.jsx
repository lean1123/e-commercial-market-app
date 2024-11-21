import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import Picker from "react-native-picker-select";
import { TouchableOpacity } from "react-native";
import { app, db } from "../../src/configurations/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { MultipleSelectList } from "react-native-dropdown-select-list";

const subCategories = [
  {
    category: "Electronics",
    subCategory: [
      { label: "Mobile", value: "Mobile" },
      { label: "Laptop", value: "Laptop" },
      { label: "Headphone", value: "Headphone" },
    ],
  },
  {
    category: "Fashion",
    subCategory: [
      { label: "Clothes", value: "Clothes" },
      { label: "Shoe", value: "Shoe" },
      { label: "Accessories", value: "Accessories" },
    ],
  },
  {
    category: "Fresh Fruit",
    subCategory: [
      { label: "Vegetables", value: "Vegetables" },
      { label: "Fruits", value: "Fruits" },
    ],
  },
  {
    category: "Beauty",
    subCategory: [
      { label: "Makeup", value: "Makeup" },
      { label: "Skincare", value: "Skincare" },
      { label: "Haircare", value: "Haircare" },
    ],
  },
];

export default function AddProductScreen() {
  const [selectedImage, setSelectedImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);

  const [isShowSizeAndColor, setIsShowSizeAndColor] = useState(false);
  const [subCategory, setSubCategory] = useState([]);

  const handleCategoryChange = (value) => {
    setSubCategory(
      subCategories.find((item) => item.category === value).subCategory
    );
  };
  const [image, setImage] = useState([]);

  const handleClear = () => {
    setSelectedImage([]);
    setSelectedColor([]);
    setSelectedSize([]);
    setImage([]);
  };

  const storage = getStorage(app);

  const pickImageAsync = async () => {
    setSelectedImage([]); // Reset the image state before selecting new images
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        allowsMultipleSelection: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedUris = result.assets.map((asset) => asset.uri);
        setSelectedImage(selectedUris); // Cập nhật state một lần với mảng đầy đủ
      } else {
        ToastAndroid.show("No image selected", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Image selection error:", error);
      ToastAndroid.show("Failed to select image", ToastAndroid.SHORT);
    }
  };

  const handleSubmitProduct = async (values) => {
    setLoading(true);
    values.image = selectedImage;

    if (!values.name) {
      ToastAndroid.show("Name is required", ToastAndroid.SHORT);
      return;
    }
    if (!values.price) {
      ToastAndroid.show("Price is required", ToastAndroid.SHORT);
      return;
    }
    if (!values.description) {
      ToastAndroid.show("Description is required", ToastAndroid.SHORT);
      return;
    }
    if (!values.category) {
      ToastAndroid.show("Category is required", ToastAndroid.SHORT);
      return;
    }
    if (!values.subCategory) {
      ToastAndroid.show("Sub category is required", ToastAndroid.SHORT);
      return;
    }
    if (!values.qtyInStock) {
      ToastAndroid.show("Quantity in stock is required", ToastAndroid.SHORT);
      return;
    }
    if (!values.image) {
      ToastAndroid.show("Image is required", ToastAndroid.SHORT);
      return;
    }

    // Upload images first
    const uploadImages = async (selectedImages) => {
      try {
        const uploadedUrls = [];

        for (const element of selectedImages) {
          const response = await fetch(element);
          const blob = await response.blob();

          const storageRef = ref(storage, `productImages/${Date.now()}.jpg`);
          await uploadBytes(storageRef, blob);

          const url = await getDownloadURL(storageRef);
          uploadedUrls.push(url);
        }

        return uploadedUrls; // Return the list of uploaded image URLs
      } catch (error) {
        console.error("Error uploading images:", error);
        ToastAndroid.show("Image upload failed", ToastAndroid.SHORT);
        return []; // Return an empty array on error
      }
    };

    const uploadedImageUrls = await uploadImages(selectedImage); // Wait for image upload to complete
    setImage(uploadedImageUrls); // Update state with the uploaded image URLs

    // After image upload is done, proceed to create the product in Firestore
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...values,
        color: selectedColor,
        size: selectedSize,
        image: uploadedImageUrls, // Use the uploaded image URLs
      });

      if (docRef) {
        ToastAndroid.show("Product added successfully", ToastAndroid.SHORT);
        handleClear();
        setImage([]); // Clear the image state
      } else {
        ToastAndroid.show("Product not added", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      ToastAndroid.show("Error adding product", ToastAndroid.SHORT);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-center text-xl font-bold">Add new product</Text>
      <Formik
        initialValues={{
          name: "",
          price: "",
          description: "",
          category: "",
          image: [],
          rating: 0,
          subCategory: "",
          color: [] || null,
          size: [] || null,
          qtyInStock: 0,
          createDate: moment(Date.now()).format("hh:mm:ss DD/MM/YYYY"),
        }}
        onSubmit={(values) => {
          handleSubmitProduct(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <View>
            <View style={styles.select}>
              <Picker
                onValueChange={(value) => {
                  setFieldValue("category", value);
                  handleCategoryChange(value);
                  if (value === "Fashion") {
                    setIsShowSizeAndColor(true);
                  } else {
                    setIsShowSizeAndColor(false);
                  }
                }}
                placeholder={{ label: "Select category" }}
                items={[
                  { label: "Electronics", value: "Electronics" },
                  { label: "Fashion", value: "Fashion" },
                  { label: "Beauty", value: "Beauty" },
                  { label: "Fresh Fruit", value: "Fresh Fruit" },
                ]}
              />
            </View>
            <View style={styles.select}>
              <Picker
                style={styles.select}
                onValueChange={(value) => setFieldValue("subCategory", value)}
                placeholder={{ label: "Select sub category" }}
                items={subCategory}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={values?.name}
              onChangeText={handleChange("name")}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={values?.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values?.description}
              numberOfLines={5}
              onChangeText={handleChange("description")}
            ></TextInput>
            {/* size color  */}
            {isShowSizeAndColor && (
              <>
                <View style={styles.listCheck}>
                  <MultipleSelectList
                    setSelected={(val) => {
                      setSelectedColor(val);
                    }}
                    data={[
                      {
                        label: "Red",
                        value: "Red",
                      },
                      {
                        label: "Blue",
                        value: "Blue",
                      },
                      {
                        label: "Green",
                        value: "Green",
                      },
                      {
                        label: "Black",
                        value: "Black",
                      },
                      {
                        label: "White",
                        value: "White",
                      },
                    ]}
                    save="value"
                    label="Color"
                  />
                </View>
                <View style={styles.listCheck}>
                  <MultipleSelectList
                    setSelected={(value) => {
                      setSelectedSize(value);
                    }}
                    data={[
                      { label: "XS", value: "XS" },
                      { label: "S", value: "S" },
                      { label: "M", value: "M" },
                      { label: "L", value: "L" },
                      { label: "XL", value: "XL" },
                    ]}
                    save="value"
                    label="Size"
                  />
                </View>
              </>
            )}

            <TextInput
              style={styles.input}
              placeholder="Quantity in stock"
              value={values?.qtyInStock}
              keyboardType="number-pad"
              onChangeText={handleChange("qtyInStock")}
            ></TextInput>

            {/* image */}
            <TouchableOpacity
              onPress={pickImageAsync}
              className="bg-blue-400 p-2 rounded-md mt-2"
            >
              <Text className="text-white text-center">Select Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className={`p-5 bg-blue-500 rounded-full mt-10 ${
                loading ? "opacity-50" : ""
              }`}
              //   disabled={loading}
            >
              {/* {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : ( */}
              <Text className="text-white text-center text-[16px]">Submit</Text>
              {/* )} */}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    paddingHorizontal: 17,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 5,
    textAlignVertical: "top",
  },
  select: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 5,
    textAlignVertical: "center",
  },
});
