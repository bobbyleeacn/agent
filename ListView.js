import React, { Component } from "react";
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, Dimensions, Button } from "react-native";
import TEST_DATA from "../listingArray.json";
import styles from '../style/listViewStyle';
import Card from '../Components/Card';
import { SearchBar } from 'react-native-elements';
import SearchScreen from './SearchScreen.js';

export default class ListView extends Component {
  static navigationOptions = {
    title: 'Search',
    header: ({params}) => {
      right:
      <Button
      title = "Test"
      onPress = {() => console.log('button pressed')
       } />
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      screen: Dimensions.get('window'),
      mapView: false
    }

    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({screen: Dimensions.get('window')});
  }

  render() {
    return (
      <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
      <View style={{paddingTop:30, marginLeft:10, flexDirection:'row'}} >
        <SearchBar lightTheme clearIcon containerStyle={{width: 270}}  />
        <View style={{marginLeft: 20}}><Button title={this.state.mapView ? 'List' : 'Map'} onPress={()=>this.setState({mapView: !this.state.mapView})}/>></View>
      </View>

      { this.state.mapView ? <SearchScreen /> :
         <FlatList
         style={styles.flatList}
          data={TEST_DATA.propertyList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card {...item} navigation={this.props.navigation} />
          )}
        />
      }
      </View>
    );
  }
}