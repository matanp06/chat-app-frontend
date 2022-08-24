import React,{useState} from "react";
import { View,StyleSheet,TextInput,Pressable,Text,ScrollView } from "react-native";
import { server,user } from "./App";
import ChatCard from "./ChatCard";

function LobbySearch(){
    const [chats, setChats] = useState([])
    const [searchText,setSearchText] = useState("") 

    function updateSearchList(username){
        setChats((oldChats) => {
            return (oldChats.filter((chat) => {return chat.username!=username}));
        })
    }

    function handleChatSearch(){

        fetch(server+"user/"+searchText+"/"+user.username,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
        .then(json => {
            setChats(json);
        })
        .catch((err) => {
            alert("we had an error please try again");
            console.log(err)
        })


    }

    return (<View>        
        <View style={styles.searchBox} >
            <TextInput 
                style={styles.searchInput} 
                placeholder="search"
                onChangeText={value => {setSearchText(value)}}
                value={searchText}
                ></TextInput>
            <Pressable style={styles.button} onPress={handleChatSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </Pressable>
        </View>
        <ScrollView>
            {chats.map((chat,key) => {
                return  <ChatCard 
                            key={key} 
                            username={chat.username} 
                            updateSearchList={updateSearchList}
                        />})}
        </ScrollView>
    </View>)

}

export default LobbySearch;

const styles = StyleSheet.create({
    searchBox:{
        marginHorizontal:10,
        flexDirection:"row",
        alignSelf:"stretch",
        overflow:"hidden",
        borderWidth:1,
        borderRadius:25,
        backgroundColor:"white"
    },
    searchInput:{
        width:'75%',
        height:50,        
        fontSize:15,
        paddingLeft:20,
        
        
    },
    button:{
        backgroundColor:"lightblue",
        borderRadius:25,
        width:"25%",
        height:50,
        justifyContent:"center",
        alignItems:"center"
    },
})