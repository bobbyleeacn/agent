import React, { Component } from "react";
import { Text, View, ScrollView, Image, StyleSheet, Dimensions, StatusBar, Animated } from "react-native";
import TEST_DATA from "../listingArray.json";
import styles from '../style/propertyDetailStyle';
import Carousel from '../Components/ImageCarousel';

export default class PropertyDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: Dimensions.get("window"),
      propertyList: []
    };
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({ screen: Dimensions.get("window") });
    console.log('this is onLayout screen dimensions ', this.state.screen);
    
  }

  render() {
    const { address, description, contactInfo } = TEST_DATA.propertyList[0];
    return (
      <View style={styles.componentContainer} onLayout={this.onLayout}>
        <ScrollView vertical>
          <View style={styles.wrapCarousel}>
            <Carousel
              images={TEST_DATA.propertyList[0].imgUrl}
              imageStyle={{
                width: this.state.screen.width,
                height: (this.state.screen.width * 9) / 16
              }}
            />
          </View>
          <View style={styles.wrapDescription}>
            <Text style={styles.building}>{description.buildingName}</Text>
            <Text style={styles.address}>
              {address.street} - {address.district} {address.city}
            </Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 0.5,
                marginBottom: 20
              }}
            />

            {//Property information group
              <View style={styles.propInfoWrap}>
                <View style={styles.priceWrap}>
                  <Text style={styles.propInfo}>{`$ ${description.price}`}</Text>
                  <Text style={styles.propText}>Price</Text>
                </View>
                <View style={styles.bedsWrap}>
                  <Text style={styles.propInfo}>{`${description.bdrm}`}</Text>
                  <Text style={styles.propText}>Beds</Text>
                </View>
                <View style={styles.bathWrap}>
                  <Text style={styles.propInfo}>{`${description.bdrm}`}</Text>
                  <Text style={styles.propText}>Baths</Text>
                </View>
                <View style={styles.sizeWrap}>
                  <Text style={styles.propInfo}>{`${description.size}`}</Text>
                  <Text style={styles.propText}>Sq. m</Text>
                </View>
              </View>
            }

            <Text style={styles.descriptionText}>{description.text}</Text>
            <Text style={{ marginTop: 20, fontWeight: "bold" }}>
              Email: {contactInfo.email}
            </Text>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              Phone: {contactInfo.phoneNumber}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}