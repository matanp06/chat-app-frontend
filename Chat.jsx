import React, { useEffect, useRef, useState } from "react";
import { Easing ,Dimensions, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View,TouchableWithoutFeedback, Animated } from "react-native";
import { server, user } from "./App";
import Message from "./Message";
import { connect, io } from "socket.io-client";

let chatId = null;
function Chat(props){
    

    const socket = useRef();

    // states
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(init,[]);
    useEffect(updateMessges,message);
    
    // updating the messages
    function updateMessges(){

        if(message!=null){

            setMessages((messages)=>[...messages,message]);
            setMessage(null);
        }

    }
    
    // when the chat is first loaded
    async function init(){
        
        // connenting to the web socket
        socket.current = io("http://10.0.0.89:4001",{
            autoConnect: false
        });
        socket.current.connect();

        // loading all the former messages
        loadMessages();

        socket.current.on("connect",()=>{
            //joining to the current chat room in the server
            socket.current.emit("joinChat",{
                currentUser:user.username,
                _chatId: chatId,
                otherUser:props.otherUser
            });
        })

        //message is received
        socket.current.on("chatMessage",(message)=>{
            setMessage(message);
        })
        
    }

    // loading messages from the server
    async function loadMessages(){

        try{
            //sending a get request
            const res =  await fetch(server+user.username+"/chat/"+props.otherUser,{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type": "application/json"
                }
            });
            const json = await res.json();

            // checking if the requset succeeded
            if(json.type === "ERR"){
                throw(json.message);
            } else {
                // extracting the chat _id and the messages
                const {chat} = json;
                chatId = chat._id;
                setMessages(chat.messages);
            }
        } 
        catch(err){
            alert(err);
        }
        
    }

    //when sending a message
    function handleMessageSend(){

        // using the socket to send a message
        socket.current.emit("chatMessage",{
            username:user.username,
            toUser: props.otherUser,
            message:inputText,
            _chatId:chatId
        });

        // converting the message to the proper format
        let message={
            senderUserName: user.username,
            message:inputText,
            date: new Date()
        }

        // adding the brand new message to the message list
        setMessages(function(messages){
            return [...messages,message];
        });

        setInputText("");
    }

    // changing the view when the keyboard is shown
    Keyboard.addListener("keyboardWillShow",(e)=>{
        setKeyboardHeight(e["endCoordinates"]["height"])
    })

    // changing the view when the keyboard is hidden
    Keyboard.addListener("keyboardWillHide",(e)=>{
        setKeyboardHeight(0)
    })


    return(
           <View style={[styles.container,{backgroundColor:"white"},
           { marginBottom:keyboardHeight}]}
        >
                {/* the messages view */}
                <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                >
                    {/* rendering messages */}
                    {
                        messages.length == 0 ? 
                            //representing a chat without messages 
                            [<Message username={user.username} content="hello!"/>,
                            <Message username={props.otherUser} content="hi, how are you doing?"/>] :
                            //rendering the chat messages
                            messages.map((message,key) => 
                                <Message 
                                    key={key} 
                                    username={message.senderUserName} 
                                    content={message.message}
                                />
                            ) 
                    }
                    
                </ScrollView>

                {/* the input section */}
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

// styles
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