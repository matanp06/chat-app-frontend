import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View,Keyboard } from 'react-native';
import { AsyncStorageStatic } from 'react-native';
import Header from './Header';
import Lobby from './Lobby';
import Login from "./Login"
import Register from './Register';

const server = "http://10.0.0.89:4001/"
const user = {
  username:"",
  password:""
}

export default function App() {

  const [currentScreen,setCurrentScreen] = useState("Login")
  // const [user,setUser] = useState({}); 
  
  // Header backButton
  const [backButton,setBackButton] = useState({
    showBackButton:false,
    callback: null
  });
  const [customHeaderTitle, setCustomHeaderTitle] = useState(null)

  //Updating the heading properties
  function handleHeaderUpdate(title, backButtonCallback){

    setBackButton({
      showBackButton: backButtonCallback != null ? true : false,
      callback: backButtonCallback
    })
    title != null ? setCustomHeaderTitle(title) : setCustomHeaderTitle(null);

  }

  return (
    <SafeAreaView 
      style={styles.safeArea}>
    <View style={styles.container}>
      <Header customTitle={customHeaderTitle} backButton={backButton} updateHeader={handleHeaderUpdate}/>
      <View style={styles.container}>
        {currentScreen=="Login"&&<Login setScreen={setCurrentScreen}/>}
        {currentScreen=="Register"&&<Register setScreen={setCurrentScreen}/>}
        {currentScreen=="Lobby"&&<Lobby updateHeader={handleHeaderUpdate}/>}
      </View>
    </View>
    </SafeAreaView>
  );
}

export {server};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  safeArea:{
    flex:1,
    backgroundColor: "#7FCD91"
  }  
});

export {user}
