import React, { Component } from "react";
import { Text, View, ScrollView, Image, StyleSheet, Dimensions, StatusBar, Animated } from "react-native";
import TEST_DATA from "../listingsArray.json";

export default class PropertyDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: Dimensions.get("window"),
      propertyList: []
    };
    // console.log(this.state.screen);
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({ screen: Dimensions.get("window") });
  }

  render() {
    const { address, description, contact_info } = TEST_DATA[0];
    return (
      <View style={styles.componentContainer} onLayout={this.onLayout}>
        <ScrollView vertical>
          <View style={styles.wrapCarousel}>
            <Carousel
              images={TEST_DATA[0].imgUrl}
              imageStyle={{
                width: this.state.screen.width,
                height: (this.state.screen.width * 9) / 16
              }}
            />
          </View>
          <View style={styles.wrapDescription}>
            <Text style={styles.building}>{description.building_name}</Text>
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

            <View style={styles.propInfoWrap}>
              <View style={styles.priceWrap}>
                <Text style={styles.propInfo}>{`$ ${description.price}`}</Text>
                <Text style={styles.propText}>Price</Text>
              </View>
              <View sytle={styles.bedsWrap}>
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

            <Text style={styles.descriptionText}>{description.text}</Text>
            <Text style={{ marginTop: 20, fontWeight: "bold" }}>
              email: {contact_info.email}
            </Text>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              phone: {contact_info.phone_number}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class Carousel extends Component {
  scrollX = new Animated.Value(0); 

  render() {
    const { width } = Dimensions.get("window");
    let position = Animated.divide(this.scrollX, width);

    return (
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] 
          )} 
          scrollEventThrottle={16} 
          showsHorizontalScrollIndicator={false}
        >
          {this.props.images.map(image => (
            <Image style={this.props.imageStyle} source={{ uri: image }} key={Math.random().toString(36).substr(2, 9)} />
          ))}
        </ScrollView>
        <View style={{ flexDirection: "row" }} >
          {this.props.images.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1], 
              outputRange: [0.3, 1, 0.3], 
              extrapolate: "clamp" 
            });
            return (
              <Animated.View key={i} style={{ opacity, height: 10, width: 10, backgroundColor: "#595959", margin: 8, borderRadius: 5 }} />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1
  },
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  wrapCarousel: {
    flex: 1
  },
  wrapDescription: {
    flex: 1,
    padding: 15
  },
  building: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  address: {
    fontSize: 16,
    marginBottom: 20
  },
  propInfoWrap: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30
  },
  priceWrap: {
    flex: 2
  },
  bedsWrap: {
    flex: 1,
    width: 150
  },
  bathWrap: {
    flex: 1,
    marginLeft: 30
  },
  sizeWrap: {
    flex: 1,
    marginLeft: 15
  },
  propInfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  propText: {
    fontStyle: "italic"
  },
  descriptionText: {
    fontSize: 18
  }
});
