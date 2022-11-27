import { View, TextInput, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const CustomInput = ({value, onChangeText, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
      />
    </View>
  );
};  

styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        width: width * .85,
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginLeft: 12
    }, 
    input: {
      padding: 15,

    }
});

export default CustomInput