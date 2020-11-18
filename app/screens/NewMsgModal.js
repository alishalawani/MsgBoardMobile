import React, { useState } from 'react';
import {
	TouchableOpacity,
	Modal,
	TextInput,
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';

function NewMsgModal({ modalVisible, setModalVisible, setMessages }) {
	const url = 'https://message-board-db.herokuapp.com/api/messages';
	const [message, setMessage] = useState('');
	const [subject, setSubject] = useState('');
	function clearInputs() {
		setMessage('');
		setSubject('');
	}
	const handleSend = () => {
		if (message && subject) {
			setModalVisible(false);
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ subject: subject, message: message }),
			}).then(res => res.json()).then((res) => {
				clearInputs();
				setMessages([...res])
			});
		}
	};

	return (
		<Modal animationType='slide' visible={modalVisible}>
			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
				style={styles.modalView}>
				<Text style={styles.header}>Create Your Message</Text>
				<Text style={styles.label}>Subject</Text>
				<TextInput
					style={styles.textBox}
					onChangeText={(text) => setSubject(text)}
					value={subject}
				/>
				<Text style={styles.label}>Message</Text>
				<TextInput
					style={styles.textBox}
					onChangeText={(text) => setMessage(text)}
					value={message}
				/>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={styles.postButton}
						onPress={() => {
							handleSend();
						}}>
						<Text>Post</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.cancelButton}
						onPress={() => {
							clearInputs();
							setModalVisible(false);
						}}>
						<Text>Cancel</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

export default NewMsgModal;

const styles = StyleSheet.create({
	header: {
		fontSize: 25,
		marginBottom: 70,
	},
	modalView: {
		flex: 1,
		padding: 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textBox: {
		height: 50,
		borderColor: 'dodgerblue',
		borderWidth: 1,
		width: '100%',
		marginBottom: 20,
		borderRadius: 15,
		paddingRight: 20,
		paddingLeft: 20,
	},
	label: {
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		marginLeft: 20,
		marginBottom: 10,
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	postButton: {
		backgroundColor: 'dodgerblue',
		color: 'white',
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginRight: 30,
		borderRadius: 10,
	},
	cancelButton: {
		backgroundColor: 'dodgerblue',
		color: 'white',
		padding: 10,
		borderRadius: 10,
	},
});
