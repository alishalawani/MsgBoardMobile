import React, { useState, useRef } from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import NewMsgModal from './NewMsgModal';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
function MessageBoardView({ messages, setMessages }) {
    const [modalVisible, setModalVisible] = useState(false);
	const scrollViewRef = useRef();
	dayjs.extend(relativeTime);
	return (
		<View style={{ marginTop: 100, paddingBottom: 40, flex: 1 }}>
			
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setModalVisible(true);
				}}>
				<Text style={{ color: 'white', fontWeight: 'bold' }}>
					+ New Message
				</Text>
			</TouchableOpacity>
			<ScrollView
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef.current.scrollToEnd({ animated: true })
				}>
				<View style={styles.container}>
					{messages ? (
						messages.map((message, index) => {
							return (
								<View style={{ width: '90%' }} key={index}>
									<Text>{dayjs(message['created_at']).fromNow()}</Text>
									<Text style={styles.subject}>{message.subject}</Text>
									<Text style={styles.text}>{message.message}</Text>
								</View>
							);
						})
					) : (
						<Text style={styles.text}>Messages loading...</Text>
					)}
				</View>
				<NewMsgModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					setMessages={setMessages}
				/>
			</ScrollView>
		</View>
	);
}

export default MessageBoardView;
const styles = StyleSheet.create({
	text: {
		color: 'black',
		padding: 10,
		backgroundColor: 'dodgerblue',
		marginBottom: 20,
        width: '100%',
        fontSize:16,
	},
	container: {
        flex:1,
		width: '100%',
		alignItems: 'center',
        justifyContent: 'center',
        marginBottom:'10%',
	},
	button: {
        marginBottom:30,
        alignSelf:'flex-start',
        marginLeft:'10%',
        backgroundColor:'dodgerblue',
        padding:15,
        borderRadius:15,
    },
    subject:{
        backgroundColor:'rgb(9,90,900)',
        padding:5,
        color:'white',
        fontSize:16,
        fontWeight:'bold',
    }
});
