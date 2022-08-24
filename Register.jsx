import React, { useState } from "react";
import { StyleSheet,Text,View,TextInput,Button,CheckBox, Pressable } from "react-native";
import {server,user} from "./App"

function Register(props){

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    function handleRegister(){

        if(username==="")
            alert("username field can't left empty");
        else if (password==="")
            alert("password field can't left empty");
        else if (confirmPassword==="")
            alert("you must confirm you'r password");
        else if(password!==confirmPassword)
            alert("passwords aren't matching");
        else{
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
                if(jsonRes.type === "ERR"){
                    alert(jsonRes.message);
                } else {
                    user.username = username;
                    user.password = password;
                    setUserName("");
                    setPassword("");
                    setConfirmPassword("");
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
            <TextInput
                style={styles.input} 
                placeholder="Username" 
                value={username}
                onChangeText={(value)=>{setUserName(value)}}>
            </TextInput>
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                secureTextEntry={true}
                value={password}
                onChangeText={(value)=>{setPassword(value)}}>
            </TextInput>
            <TextInput 
                style={styles.input} 
                placeholder="Confirm password" 
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(value)=>{setConfirmPassword(value)}}>
            </TextInput>
            <View style={styles.buttonsContainer}>
                <Pressable onPress={()=>{props.setScreen("Login")}} style={[styles.button,styles.buttonBlack]}>
                    <Text style={[styles.buttonText,styles.buttonTextWhite]}>Login</Text>
                </Pressable>
                <Pressable onPress={handleRegister} style={[styles.button,styles.buttonWhite]}>
                    <Text style={[styles.buttonText]}>Register</Text>
                </Pressable>
            </View>
            
        </View>)

}

export default Register

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
