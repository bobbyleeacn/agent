import React, { Component } from "react";
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
import TEST_DATA from "../listingsArray.json";

export default class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {screen: Dimensions.get('window')};
    // console.log(this.state.screen);
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({screen: Dimensions.get('window')});
  }

  render() {
    let screenWidth = this.state.screen.width - 30;
    return (
      <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
         <FlatList
         style={styles.flatList}
          data={TEST_DATA}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem {...item} navigation={this.props.navigation} imageStyle={Object.assign({}, {width: screenWidth, height: (screenWidth * 9 / 16)})}/>
          )}
        />
      </View>
    );
  }
}

const ListItem = (props) => {
  // console.log(props);
  
  return (
    <TouchableOpacity onPress={()=> console.log('take me to PropertyDetailScreen')} style={styles.card}>
      <Image
        style={props.imageStyle}
        source={{ uri: props.imgUrl[0] }}
      />
      <View style={styles.cardDesc}>
        <Text style={styles.building}>{props.description.building_name}</Text>
        <Text>{props.address.street} - {props.address.district} {props.address.city}</Text>
        <Text>${props.description.price}/month | {props.description.bdrm} bdrm | {props.description.bdrm} bath | {props.description.size}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ededed",
    justifyContent: "center",
    paddingTop: 20
  },
  flatList: {   
    paddingLeft: 15,
    paddingRight: 15
  },
  card: {
    marginBottom: 20,
    shadowOffset:{  width: 5,  height: 5,  },
    shadowColor: '#ccc',
    shadowOpacity: 0.7,
  },
  cardDesc: {
    padding: 15,
    backgroundColor: '#f7f7f7'
  },
  building: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  cardText: {
    flex: 1,
  }
});
