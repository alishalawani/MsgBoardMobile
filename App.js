import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';

export default function App() {
	const url = 'https://message-board-db.herokuapp.com/api/messages';
	const [messages, setMessages] = useState([]);
	const fetchMessages = () => {
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
        setMessages([...res]);
        console.log(res)
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
    fetchMessages();
  }, []);

	return (<SafeAreaView style={styles.container}>
    {messages ? 
      messages.map((message)=>{
      return <Text style={styles.text}>{message.message}</Text>
      }) : <Text>Messages loading...</Text>
    }
  </SafeAreaView>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text:{
    color:'black',
    padding:20,
    backgroundColor:'dodgerblue',
    marginTop: 20,
    width:'90%',
  }
});
