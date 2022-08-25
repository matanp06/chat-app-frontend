import React from "react";
import { StyleSheet, View,Text, Pressable } from "react-native";
import {server,user} from "./App";
import {userFriends} from "./LobbyFriends";

function SearchUserCard(props) {
    
    function handleAddFriends(){
        fetch(server+"user/"+user.username,{
            method:"patch",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                friend: props.username
            })
        }).then(res => res.json())
        .then(json => {
            if(json.type=="ERR"){
                alert(json.message);
            } else {
                props.updateSearchList(props.username);
                userFriends.push(json.userDetails);
            }
        })

    }

    return (<View style={styles.card}>
        <Text style={styles.cardText}>{props.username}</Text>
        <Pressable style={styles.addButton} onPress={handleAddFriends}>
            <Text>Add</Text>
        </Pressable>
    </View>)

}


export default SearchUserCard;

const styles = StyleSheet.create({

    card:{
        marginHorizontal:20,
        alignSelf:"stretch",
        height:60,
        backgroundColor:"white",
        flexDirection:"row",
    },
    cardText:{
        fontSize:25,
        alignContent:"center",
        width:"75%",
        textAlign:"center",
        alignSelf:"center"
    },
    addButton:{
        width:"25%",
        height:60,
        backgroundColor:"lightblue",
        justifyContent:"center",
        alignItems:"center"
    }

})