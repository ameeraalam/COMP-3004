import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "white",
	},
	inputBox: {
		height: 50,
		width: 300,
		borderColor: 'rgb(72, 110, 255)',
		borderWidth: 1,
		marginBottom:20,
		textAlign:'center',
		fontFamily: 'sans-serif'

	},
	submitButton: {
		position: "relative",
		bottom: -20,
		left: 50,
		width: 100,
		height: 25
	},
	registerContainer: {
		flexDirection:'row',
		flexWrap:'wrap',
		marginTop:10
	},
	submitButtonOnLogin: {
		backgroundColor:'rgb(72, 110, 255)',
		textAlign:'center',
		height:54,
		color:'#fff',
		fontSize:18,
		paddingTop:14,
		fontFamily: 'sans-serif'
	},
	loading: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, .2)"
	}
});

module.exports = styles;
