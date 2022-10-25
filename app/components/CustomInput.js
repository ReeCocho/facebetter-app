import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

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
        width:'100%',
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 15,
    }, 
    input: {
      padding: 15,

    }
});

export default CustomInput