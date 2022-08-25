import React,{useState}from "react";
import { StyleSheet, View } from "react-native";
import LobbyFriends from "./LobbyFriends";
import LobbyNavigator from "./LobbyNavigation";
import LobbySearch from "./LobbySearch";
import Chat from "./Chat"
import LobbyChat from "./LobbyChat";

function Lobby(props){
    
    const modes = {
        Chats: "Chats",
        Search: "Search",
        Friends: "Friends",
        OnChat: "OnChat",
    }
    const [mode,setMode] = useState(modes.Chats)
    const [currentChatWith, setCurrentChatWith] = useState("")
    function handleGoChat(otherUser){

        props.updateHeader(
            otherUser,
            function(){setMode(mode.toString())}
        );
        setCurrentChatWith(otherUser)
        setMode(modes.OnChat);

    }

    return (<View style={{position:"relative",flex:1}} >
        {mode === modes.Chats && <LobbyChat />}
        {mode === modes.Search && <LobbySearch />}
        {mode === modes.Friends && <LobbyFriends goChatting={handleGoChat} />}
        {mode === modes.OnChat && <Chat otherUser={currentChatWith} />}
        <LobbyNavigator mode={mode} modes={modes} setMode={setMode} />
    </View>)

}

export default Lobby;

const styles = StyleSheet.create({

    flex:1

})