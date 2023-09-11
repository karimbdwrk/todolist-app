import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";

const EditScreen = ({ route, navigation }) => {
	const { todo, index } = route.params;
	const [inputValue, setInputValue] = useState(todo.title);

	const saveTodo = () => {
		if (inputValue) {
			navigation.navigate("Home", {
				action: "edit",
				index,
				title: inputValue,
			});
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='Edit todo'
				value={inputValue}
				onChangeText={(text) => setInputValue(text)}
			/>
			<TouchableOpacity style={styles.button} onPress={saveTodo}>
				<Text style={styles.buttonText}>Save</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		padding: 10,
		width: "80%",
		marginBottom: 20,
	},
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default EditScreen;
