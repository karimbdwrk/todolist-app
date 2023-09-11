import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
// import { Icon } from "native-base";
import { CiCircleCheck } from "react-icons/ci";

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
				<TouchableOpacity onPress={() => toggleTodo(index)}>
					<CiCircleCheck />
				</TouchableOpacity>
				<Text
					style={{
						textDecorationLine: todo.completed
							? "line-through"
							: "none",
					}}>
					{todo.title}
				</Text>
				<TouchableOpacity onPress={() => deleteTodo(index)}>
					<CiCircleCheck />
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Add a todo'
					value={inputValue}
					onChangeText={(text) => setInputValue(text)}
				/>
				<TouchableOpacity onPress={addTodo}>
					<CiCircleCheck />
				</TouchableOpacity>
			</View>
			<View style={styles.todosContainer}>{todos.map(renderTodo)}</View>
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
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
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
	},
	todo: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},
});

export default HomeScreen;
