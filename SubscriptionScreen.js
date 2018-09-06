import React, { Component } from 'react'
import { Text, View, Image, FlatList, Button } from 'react-native'


export default class SubscriptionScreen extends Component {
  render() {
    const subscriptions = [
      {text: 'For Rent Near Thao Dien', imgUrl: require('../images/map1_edit.png'), notification: 'On'},
      {text: 'For Rent Near Binh Thanh', imgUrl: require('../images/map2_edit2.png'), notification: 'Off'},
      {text: 'For Rent Near Binh Thanh', imgUrl: require('../images/map2_edit2.png'), notification: 'On'},
    ]

    return (
      <View>
         <FlatList
          style={{paddingRight: 15}}
          data={subscriptions}
          keyExtractor={item => Math.random().toString(36).substr(2, 9)}
          renderItem={({ item }) => (
            <SavedItem {...item} navigation={this.props.navigation} />
          )}
        />
      </View>
    )
  }
}

const SavedItem = (props) => {
  return (
    <View>
      <View style={{flexDirection: 'row', margin: 10, width:375}} >
        <Image
          style={{width: 200, height: 180}}
          source={props.imgUrl}
        />
        <View style={{flex:1, justifyContent:'center', marginRight: 20}}>
          <Text style={{marginLeft: 20, fontWeight: 'bold', }}>{props.text}</Text>
          <Text style={{marginLeft: 20, marginTop: 20, fontWeight: 'bold', marginBottom:5}}>Requirements: </Text>
          <Text style={{marginLeft: 20, }}>2 Beds, 1 Bath, Balcony, $400-$700</Text>
          <Text style={{marginLeft: 20, marginTop: 20, marginBottom:5}}>Notifications: <Text style={{color: 'blue'}}>{props.notification}</Text></Text>
        </View>
      </View>
        <View style={{
          borderBottomColor: "black",
          borderBottomWidth: 0.5,
          marginBottom: 20 }}
        />
    </View>
  )
}