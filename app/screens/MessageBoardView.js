import React, {useState} from 'react';
import { Text, StyleSheet, ScrollView, View, Button } from 'react-native';
import NewMsgModal from './NewMsgModal';
function MessageBoardView({ messages, fetchMessages }) {
    const [modalVisible, setModalVisible] = useState(false);
	return (
		<View style={{marginTop:100}}>
			<Button title=' + New Message' style={styles.button} onPress={()=>{
                setModalVisible(true);
            }} />
			<ScrollView>
				<View style={styles.container}>
					{messages ? (
						messages.map((message) => {
							return <Text style={styles.text}>{message.message}</Text>;
						})
					) : (
						<Text style={styles.text}>Messages loading...</Text>
					)}
				</View>
                <NewMsgModal modalVisible={modalVisible} setModalVisible={setModalVisible} fetchMessages={fetchMessages}/>
			</ScrollView>
		</View>
	);
}

export default MessageBoardView;
const styles = StyleSheet.create({
	text: {
		color: 'black',
		padding: 20,
		backgroundColor: 'dodgerblue',
		marginTop: 20,
		width: '90%',
	},
	container: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
    },
    button:{
        marginTop:40,
    }
});
