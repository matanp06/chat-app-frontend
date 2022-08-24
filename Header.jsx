import React, { useEffect } from "react";
import { View, StyleSheet, Text, Pressable,  } from "react-native";

function Header(props){

    return  (
        <View style={styles.header}>
            {props.backButton.showBackButton && <Pressable 
                style={styles.backButton}
                onPress={()=>{
                    props.updateHeader(null,null);
                    props.backButton.callback();
                }}
                ><Text style={styles.backButtonText}>back</Text>
            </Pressable>}
            <Text style={styles.text}>{props.customTitle !== null ? props.customTitle : "WhatsApp" }</Text>
        </View>)

}

export default Header

const styles = StyleSheet.create({
    header:{
        height: 50 ,
        alignSelf: "center",
        alignItems: "center" ,
        justifyContent: "center",
        width:"100%"

    },
    text:{
        color: "#fff",
        fontSize: 20
    },
    backButton:{
        position:"absolute",
        left:10,
        height:50,
        justifyContent:"center"
    },
    backButtonText:{
        color:"#fff",
        fontSize: 18
    }
})