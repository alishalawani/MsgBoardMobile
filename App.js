import React, { useState, useEffect } from 'react';
import { StyleSheet,SafeAreaView, Platform, StatusBar } from 'react-native';
import MessageBoardView from './app/screens/MessageBoardView';

export default function App() {
	const url = 'https://message-board-db.herokuapp.com/api/messages';
	const [messages, setMessages] = useState([]);
	const fetchMessages = () => {
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
        setMessages([...res]);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
    fetchMessages();
  }, []);

	return (<SafeAreaView style={styles.container}>
    <MessageBoardView messages={messages} fetchMessages={fetchMessages}/>
  </SafeAreaView>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
 
});
