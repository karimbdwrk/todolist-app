import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
// import { Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const addTodo = () => {
		if (inputValue) {
			setTodos([...todos, { title: inputValue, completed: false }]);
			setInputValue("");
		}
	};

	const deleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	const toggleTodo = (index) => {
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	const renderTodo = (todo, index) => {
		return (
			<View key={index} style={styles.todo}>
				<Text
					style={{
						textDecorationLine: todo.completed
							? "line-through"
							: "none",
					}}>
					{todo.title}
				</Text>
				<View style={styles.btnContainer}>
					<TouchableOpacity onPress={() => toggleTodo(index)}>
						<AntDesign name='check' size={24} color='black' />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => deleteTodo(index)}>
						<AntDesign name='close' size={24} color='black' />
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			<View style={styles.container}>
				<View style={styles.todosContainer}>
					{todos.map(renderTodo)}
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Add a todo'
						value={inputValue}
						onChangeText={(text) => setInputValue(text)}
					/>
					<TouchableOpacity onPress={addTodo}>
						<AntDesign name='plus' size={24} color='black' />
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		backgroundColor: "lightgreen",
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 5,
		padding: 10,
		flex: 1,
		marginRight: 10,
	},
	todosContainer: {
		width: "100%",
		backgroundColor: "lightblue",
	},
	todo: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},
	btnContainer: {
		flexDirection: "row",
	},
});

export default HomeScreen;
