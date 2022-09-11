import React, { useState } from "react";
import { StyleSheet,Text,View,TextInput,Button,CheckBox, Pressable } from "react-native";
import {server,user} from "./App"

function Register(props){

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // when register is pressed
    function handleRegister(){

        // verifing that all the fields are filled
        if(username==="")
            alert("username field can't left empty");
        else if (password==="")
            alert("password field can't left empty");
        else if (confirmPassword==="")
            alert("you must confirm you'r password");
        // making sure that the repeated password matches the original
        else if(password!==confirmPassword) 
            alert("passwords aren't matching");
        else{ // all fields are OK, registerting a new user
            // sending a post request to the server
            fetch(server+"user",{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then((res)=>{
                return res.json();
            }).then((jsonRes)=>{
                // checking if the user registration succeeded
                if(jsonRes.type === "ERR"){
                    alert(jsonRes.message);
                } else {
                    //setting the user details in the app
                    user.username = username;
                    user.password = password;

                    // cleaning all input fields
                    setUserName("");
                    setPassword("");
                    setConfirmPassword("");

                    //going to lobby screen
                    props.setScreen("Lobby");
                }
            }).catch((err)=>{
                console.log(err);
            })
        }

    }

    return(
        <View>
            <Text style={styles.header}>Register</Text>
            {/* username input */}
            <TextInput
                style={styles.input} 
                placeholder="Username" 
                value={username}
                onChangeText={(value)=>{setUserName(value)}}>
            </TextInput>
            {/* password input */}
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                secureTextEntry={true}
                value={password}
                onChangeText={(value)=>{setPassword(value)}}>
            </TextInput>
            {/* repeat password input */}
            <TextInput 
                style={styles.input} 
                placeholder="Confirm password" 
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(value)=>{setConfirmPassword(value)}}>
            </TextInput>
            {/* buttons container */}
            <View style={styles.buttonsContainer}>
                {/* go to login screen button */}
                <Pressable onPress={()=>{props.setScreen("Login")}} style={[styles.button,styles.buttonBlack]}>
                    <Text style={[styles.buttonText,styles.buttonTextWhite]}>Login</Text>
                </Pressable>
                {/* register button */}
                <Pressable onPress={handleRegister} style={[styles.button,styles.buttonWhite]}>
                    <Text style={[styles.buttonText]}>Register</Text>
                </Pressable>
            </View>
            
        </View>)

}

export default Register

// styles
const styles = StyleSheet.create({
    header:{
        textAlign:"center",
        fontSize:50,
        justifyContent:"flex-start",
    },  
    input:{
        width: 300,
        fontSize: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 1.5,
        borderRadius: 10,
        margin: 10
    },
    buttonsContainer:{
        display:"flex",
        flexDirection:"row",
        width:300,
        marginHorizontal:10,
        justifyContent:"space-between"
    },  
    button:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1.5,
        borderRadius: 10,
    },
    buttonBlack:{
        backgroundColor: "black",
    },
    buttonText:{
        fontSize: 20,
        textAlign:"center"
    },
    buttonTextWhite:{
        color:"white"
    },
    buttonWhite:{
        backgroundColor:"#fff"
    },
})
