import React,{useState} from "react";
import { View,StyleSheet,TextInput,Pressable,Text,ScrollView } from "react-native";
import { server,user } from "./App";
import SearchUserCard from "./SearchUserCard";

function LobbySearch(){

    //states
    const [chats, setChats] = useState([])
    const [searchText,setSearchText] = useState("") 

    // updating removing a user from the search result list when adding the user as a friend
    function updateSearchList(username){
        setChats((oldChats) => {
            return (oldChats.filter((chat) => {return chat.username!=username}));
        })
    }

    // searching for a user
    function handleChatSearch(){

        //sending a get requeset to the server
        fetch(server+"user/"+searchText+"/"+user.username,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
        .then(json => { //updateing found users
            setChats(json);
        })
        .catch((err) => {
            alert("we had an error please try again");
            console.log(err)
        })


    }

    return (<View>        
    {/* the search box */}
        <View style={styles.searchBox} >
            <TextInput 
                style={styles.searchInput} 
                placeholder="search"
                onChangeText={value => {setSearchText(value)}}
                value={searchText}
                ></TextInput>
                {/* search button */}
            <Pressable style={styles.button} onPress={handleChatSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </Pressable>
        </View>
        {/* search result */}
        <ScrollView>
            {chats.map((chat,key) => {
                return  <SearchUserCard 
                            key={key} 
                            username={chat.username} 
                            updateSearchList={updateSearchList}
                        />})}
        </ScrollView>
    </View>)

}

export default LobbySearch;

// styles
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