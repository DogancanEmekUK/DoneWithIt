import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyComponent = ({ data }) => {
  if (!data) {
    return <Text>Loading...</Text>;
  }

  const renderItem = ({ item }) => {
    const imageUrl = item.multimedia?.[2]?.url;

    return (
      <View style={styles.item}>
        {imageUrl && ( // Conditionally render ImageBackground only if imageUrl exists
          <ImageBackground
            source={{ uri: imageUrl }}
            style={styles.image}
            imageStyle={{ borderRadius: 8 }} // Optional: Add border radius to image
          >
            <View style={styles.overlay}>
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
              <Text style={styles.abstract}>{item.abstract}</Text>
            </View>
          </ImageBackground>
        )}
        {!imageUrl && ( // Render a placeholder view if no image is available
          <View style={styles.itemWithoutImage}>
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={styles.abstract}>{item.abstract}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results} // Use optional chaining to handle potential null data
        renderItem={renderItem}
        keyExtractor={(item) => item.uri} // Use a unique identifier for keys
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=kSFHRHP836CGLAbKa7IvcNugxyApb6zr"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>THIS JUST IN!</Text>
      </View>
      <MyComponent data={data} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemWithoutImage: {
    padding: 10,
  },
  topBar: {
    backgroundColor: "red",
    padding: 10,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "white",
    textDecorationLine: "underline",
  },
  abstract: {
    fontSize: 14,
    color: "white",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    padding: 10,
  },
});
