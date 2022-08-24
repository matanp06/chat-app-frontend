import react from "react";
import { ShadowPropTypesIOS,Text, StyleSheet, View } from "react-native";
import { user } from "./App";

function Message(props){

    return (
        <View style={[styles.container,props.username === user.username && {alignSelf:"flex-end"}]}>
             <Text style={[styles.name,styles.text]}>{props.username !== user.username ? props.username : "You"}</Text>
            <Text style={styles.text}>{props.content}</Text>
        </View>
    )

}

export default Message;

const styles = StyleSheet.create({

    container:{
        alignSelf:"flex-start",
        maxWidth:"70%",
        padding:20,
        margin:10,
        borderRadius: 5,
        backgroundColor:"green",
    },

    name:{
        
        fontWeight:"bold",

    },

    text:{
        color:"white"
    }

})