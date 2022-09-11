import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { server, user } from "./App";
import ChatCard from "./ChatCard";

let userChats=[];

async function getChats(){

    try{
        // getting all the user's chat from the server
        const res = await fetch(server+user.username+"/chats",
        {

            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }

        });

        const json = await res.json();

        
        if(json.type === "ERR"){
            throw(json.message);
        } else {// successfully got all the chats
            return json.chats;
        }
        
    } catch (err){

        throw(err);

    }
    

} 

function LobbyChat(props){

    const [chats, setChats] = useState([])
    useEffect(init,[]);

    // when the component is loaded
    async function init(){

        try{
            
            //getting chats from the server
            const chats = await getChats();
            setChats([...chats]);

        } catch (err){

            alert(err);

        }

    }

    return(
        <ScrollView style={styles.container}>
            {/* rendering all the chats as cards */}
            {chats.map(({username,chatId,lastMessage},key) => {
                return <ChatCard 
                        username={username}
                        chatId={chatId}
                        lastMessage={lastMessage}
                        isLast={key === chats.length-1}
                    />
                })
            }
        </ScrollView>
    )

}

export default LobbyChat;

const styles = StyleSheet.create({

    container:{
        flexGrow:1,
        marginBottom:70,
        backgroundColor:"white"
    }

});