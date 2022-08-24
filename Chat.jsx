import React, { useEffect, useRef, useState } from "react";
import { Easing ,Dimensions, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View,TouchableWithoutFeedback, Animated } from "react-native";
import { server, user } from "./App";
import Message from "./Message";
import { connect, io } from "socket.io-client";

let chatId = null;
let counter = 0;
function Chat(props){
    

    const socket = useRef();

    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [message, setMessage] = useState(null);
    useEffect(init,[]);
    useEffect(updateMessges,message);
    
    function updateMessges(){

        if(message!=null){

            setMessages((messages)=>[...messages,message]);
            setMessage(null);
        }

    }
    
    async function init(){
        
        socket.current = io("http://10.0.0.89:4001",{
            autoConnect: false
        });

        socket.current.connect();

        loadMessages();
        socket.current.on("connect",()=>{
            socket.current.emit("joinChat",{
                currentUser:user.username,
                _chatId: chatId,
                otherUser:props.otherUser
            });
        })

        socket.current.on("chatMessage",(message)=>{
            setMessage(message);
        })
        
    }


    async function loadMessages(){
        try{
            const res =  await fetch(server+user.username+"/chat/"+props.otherUser,{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type": "application/json"
                }
            });
            const json = await res.json();
            if(json.type === "ERR"){
                throw(json.message);
            } else {
                const {chat} = json;
                chatId = chat._id;
                setMessages(chat.messages);
            }
        } 
        catch(err){
            alert(err);
        }
        
    }

    function handleMessageSend(){

        socket.current.emit("chatMessage",{
            username:user.username,
            toUser: props.otherUser,
            message:inputText,
            _chatId:chatId
        });

        let message={
            senderUserName: user.username,
            message:inputText,
            date: new Date()
        }

        setMessages(function(messages){
            return [...messages,message];
        });

        setInputText("");
    }

    Keyboard.addListener("keyboardWillShow",(e)=>{
        setKeyboardHeight(e["endCoordinates"]["height"])
    })

    Keyboard.addListener("keyboardWillHide",(e)=>{
        setKeyboardHeight(0)
    })


    return(
           <View style={[styles.container,{backgroundColor:"white"},
           { marginBottom:keyboardHeight}]}
        >
                <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                >
                    {
                        messages.length == 0 ? 
                            [<Message username={user.username} content="sdfkl;sdfsdlfjk"/>,
                            <Message username="testing" content="lorem ipsum"/>] :
                            messages.map((message,key) => 
                                <Message 
                                    key={key} 
                                    username={message.senderUserName} 
                                    content={message.message}
                                />
                            ) 
                    }
                    
                </ScrollView>
                <View style={[styles.inputConatiner]}>
                    <TextInput value={inputText} 
                    onChangeText={(text)=>{setInputText(text)}}
                    multiline={true} style={styles.textArea}>
                        
                    </TextInput>
                    <Pressable onPress={handleMessageSend} style={styles.subminButton}>
                        <Text style={styles.buttonText}>send</Text>
                    </Pressable>
                </View>
        </View>
        
    )

}

export default Chat;

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#fff",
        alignSelf:"stretch",
        flexGrow:1,
        zIndex:2,


    },
    
    inputConatiner:{
        paddingHorizontal:20,
        flexDirection:"row",
        alignItems:"flex-end",
        justifyContent:"space-between",
        backgroundColor: "#7FCD91",
        paddingVertical:10
    },
    textArea: {
        maxHeight:100,
        borderColor:"black",
        minHeight:25,
        overflow:"scroll",
        width:"75%",
        borderWidth:1,
        fontSize:20,
        paddingHorizontal:10,
    },
    subminButton:{
        backgroundColor:"lightblue",
        width:"20%",
        height:30,
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
    },
    buttonText:{
        fontSize:20
    }

})