import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const DeleteButton = ({ onPress, selectedImage, setSelectedImage }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => {onPress({id: selectedImage?.id}); setSelectedImage({})}}>
      <Text style={styles.text}>X</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#003366",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeleteButton;