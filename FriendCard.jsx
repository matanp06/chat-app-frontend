import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

function FriendCard(props){

    return (
        <Pressable 
            style={[styles.card,props.isLast&&{borderBottomWidth:1}]}
            onPress={()=>{
                    props.goChat(props.username)
                }}>
            <Text style={styles.cardText}>{props.username}</Text>
        </Pressable>)

}

export default FriendCard;

const styles = StyleSheet.create({

    card:{
        alignSelf:"stretch",
        height:60,
        flexDirection:"row",
        borderTopWidth:1,
        alignItems:"center"
    },
    cardText:{
        fontSize:25,
        width:"100%",
        textAlign:"center",
    },

});