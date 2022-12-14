import React from "react";
import { Pressable, StyleSheet ,Text ,View } from "react-native";

//This is the navigation bar at the button of the screen
function LobbyNavigator(props){
    
    return(<View style={styles.container}>

        {/* Chats screen selector */}
        <Pressable 
            style={[styles.button,props.mode===props.modes.Chats&&{backgroundColor:"white"}]}
            onPress={()=>{
                props.setMode(props.modes.Chats)}}>
            <Text style={styles.buttonText}>Chats</Text>
        </Pressable>

        {/* Search screen selector */}
        <Pressable 
            style={[styles.button,props.mode===props.modes.Search&&{backgroundColor:"white"}]}
            onPress={()=>{
                props.setMode(props.modes.Search)}}>
            <Text style={styles.buttonText}>Search users</Text>
        </Pressable>

        {/* Friends screen selector */}
        <Pressable 
            style={[styles.button,props.mode===props.modes.Friends&&{backgroundColor:"white"}]}
            onPress={()=>{props.setMode(props.modes.Friends)}}>
            <Text style={styles.buttonText}>Friends</Text>
        </Pressable>
    </View>)
    

}

export default LobbyNavigator;

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:70,
        position:"absolute",
        left:0,
        bottom:0,
        flexDirection:"row"
    },
    button:{
        width:"33.3%",
        height:70,
        alignItems:"center",
        justifyContent:"center"
    },
    buttonText: {
        fontSize: 25
    }
})