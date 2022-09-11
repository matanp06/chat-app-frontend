import React, { useState } from "react";
import { StyleSheet,Text,View,TextInput,Button,CheckBox, Pressable } from "react-native";
import {server,user} from "./App";

function Login(props){

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    //Handle the login client proccess
    async function handleLogin(){

        //fields verification
        if(username==="")
            alert("username field can't left empty");
        else if (password==="")
            alert("password field can't left empty");
        else{
            
            try{

                //Sending the credentials to the server and getting back response
                const res = await fetch(server+"login",{
                    method:"POST",
                    headers:{
                        Accept:"application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });
                //converting respone to json
                const json = await res.json();

                //checking if the validation proccess pass
                if(json.type === "ERR"){
                    throw({
                        isKnown:true,
                        message:json.message
                    });
                } else {
                    user.username = username;
                    user.password = password;
                    props.setScreen("Lobby");
                }

            } catch (err){
                if(err["isKnown"])
                    alert(err.message);
                else
                    alert("we had a problem please try again");
            }
        }
    }
    
    return(
        <View>
            <Text style={styles.header}>Login</Text>
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
            <View style={styles.buttonsContainer}>
                <Pressable
                    onPress={handleLogin} 
                    style={[styles.button,styles.buttonBlack]}
                    >
                    <Text style={[styles.buttonText,styles.buttonTextWhite]}>Login</Text>
                </Pressable>
                <Pressable 
                    onPress={()=>{props.setScreen("Register")}} 
                    style={[styles.button,styles.buttonWhite]}
                    >
                    <Text style={[styles.buttonText]}>Register</Text>
                </Pressable>
            </View>
            
        </View>)

}

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


export default Login;