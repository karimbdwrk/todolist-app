import React, { useEffect, useReducer } from "react";
import { StyleSheet, View, Text, LogBox } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Icon, NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./src/pages/HomeScreen";
import EditScreen from "./src/pages/EditScreen";

import { AntDesign } from "@expo/vector-icons";

LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

const Stack = createStackNavigator();

const reducer = (state, action) => {
	switch (action.type) {
		case "init":
			return action.payload;
		case "add":
			return [...state, { title: action.payload, completed: false }];
		case "delete":
			const newState = [...state];
			newState.splice(action.payload, 1);
			return newState;
		case "toggle":
			const toggleState = [...state];
			toggleState[action.payload].completed =
				!toggleState[action.payload].completed;
			return toggleState;
		case "edit":
			const editState = [...state];
			editState[action.payload.index].title = action.payload.title;
			return editState;
		default:
			return state;
	}
};

const App = () => {
	const [todos, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const getTodos = async () => {
			try {
				const jsonValue = await AsyncStorage.getItem("todos");
				if (jsonValue != null) {
					dispatch({ type: "init", payload: JSON.parse(jsonValue) });
				}
			} catch (e) {
				console.log(e);
			}
		};
		getTodos();
	}, []);

	useEffect(() => {
		const saveTodos = async () => {
			try {
				await AsyncStorage.setItem("todos", JSON.stringify(todos));
			} catch (e) {
				console.log(e);
			}
		};
		saveTodos();
	}, [todos]);

	return (
		// <SafeAreaView>
		<View style={styles.container}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={({ navigation }) => ({
							title: "Todo List",
							headerRight: () => (
								<AntDesign
									name='check'
									size={24}
									color='black'
								/>
							),
						})}
						initialParams={{ todos, dispatch }}
					/>
					<Stack.Screen name='Edit' component={EditScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
		// </SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightpink",
		padding: 15,
	},
});

export default App;
