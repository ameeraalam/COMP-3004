import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
	firstDivision: {
		flex: 1
	},

  profile: {
		flex: 1,
    backgroundColor: 'rgb(72, 110, 255)',
    alignItems:'center'
	},

  userPlaceholderImage: {
		height:90,
    width: 90,
    borderRadius: 64,
    marginTop:30
	},

  userName: {
		color:'#fff',
		fontSize:20,
		marginTop:20,
		fontFamily: 'sans-serif'
	},

  rating: {
		flexDirection:'row',
	flexWrap:'wrap'
	},

  star: {
    height:15,
		width: 15,
		marginTop:6
  },

  ratingNum: {
    color:'#fff',
		marginTop:5.5,
		fontSize:14,
		marginLeft:2,
		fontFamily: 'sans-serif'
  },

  drawerOptions: {
    flex: 2,
		backgroundColor: '#fff',
		marginTop:50
  },

  drawerIcons: {
    color: 'rgb(72, 110, 255)'
  },

  drawerOptionsMargin: {
    marginTop:20
  },

  drawerItems: {
    color:'black',
		fontSize:18,
		fontFamily: 'sans-serif' // Corbert
  },

});

module.exports = styles;
