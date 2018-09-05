import React, { Component } from "react";
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
import TEST_DATA from "../listingArray.json";
import styles from '../style/listViewStyle';
import Card from '../Components/Card';

export default class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {screen: Dimensions.get('window')};
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({screen: Dimensions.get('window')});
  }

  render() {
    return (
      <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
         <FlatList
         style={styles.flatList}
          data={TEST_DATA.propertyList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card {...item} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}

