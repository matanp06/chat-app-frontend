import react, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { user } from "./App";
import { goToChatContext } from "./Lobby";


function ChatCard({chatId, username, lastMessage,isLast}){
    const goToChat = useContext(goToChatContext);

    // When the chat is selected
    function handleChatPress(){

        goToChat(username);

    }

    return(
        <Pressable
            onPress={handleChatPress}
             style={[styles.container,isLast&&{borderBottomWidth:1}]}>

            {/* Presenting with who the user speaks */}
            <View style={styles.textContainer}>
                <Text style={[styles.bold,styles.text]}>{username}</Text>
            </View>

            {/* presenting the last message in the chat */}
            <View style={styles.textContainer}>
                <Text style={[styles.text,{fontStyle:"italic"}]}>{lastMessage.senderUserName === user.username ? "You" : username}:</Text>
                <Text style={styles.text}> {lastMessage.message}</Text>    
            </View>

        </Pressable>
    )

}


export default ChatCard;

// styles
const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        paddingHorizontal:20,
        paddingVertical:10,
        width:"100%",
        height:80,
        backgroundColor:"white",
        borderTopWidth:1
    }, 
    textContainer:{
        height:"50%",
        flexDirection:"row"
    },
    text:{
        fontSize:20
    },
    bold:{
        fontWeight:"bold"
    }

})