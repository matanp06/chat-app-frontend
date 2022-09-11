import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import {server,user} from "./App"
import FriendCard from "./FriendCard";

let userFriends = [];
let friendsFetched = false;

async function getFriends(){
    try{
        const res = await fetch(server+"friends/"+user.username,{
            method:"Get",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            }
        })
        json = await res.json();
        if(json.type == "ERR"){

            throw json.message;

        }
        return json;
        
        
    }
    catch(err){
        throw err;
    }
    
}
function LobbyFriends(props){

    const [friends,setFriends] = useState(userFriends)

    useEffect(init,[])

    async function init(){
        if(!friendsFetched){
            try{
                const friends = await getFriends();
                userFriends = [...friends];
                setFriends([...friends]);
                friendsFetched = true;
            } catch(err){
                alert("we had a problem please try again later");
            }
        }
    }

    // useEffect(async function(){
    //     if(!friendsFetched){ 
    //         try{
    //             const friends = await getFriends();
    //             userFriends = [...friends];
    //             setFriends([...friends]);
    //             friendsFetched = true;
    //         } catch(err){
    //             alert("we had a problem please try again later");
    //         }
    //     }
        
    // },[])

    return (<View style={styles.container}>
        <ScrollView>
            {friends.map(({username},key)=> {
                return <FriendCard 
                            key={key} 
                            username={username} 
                            isLast={key==friends.length-1}/>
            })}
        </ScrollView>
    </View>)

}

export default LobbyFriends;
export {userFriends};

const styles = StyleSheet.create({

    container:{
        flexGrow:1,
        marginBottom:70,
        backgroundColor:"white"
    }

});