import React from 'react';
import { View, ScrollView, Image,  Dimensions, Animated } from "react-native";
import styles from '../style/propertyDetailStyle';

export default class Carousel extends React.Component {
  scrollX = new Animated.Value(0);
  constructor(props) {
    super(props);
    state = {
      imageStyle:{width: 0, height: 0}
    };
    this.scrollX = new Animated.Value(0);
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    const { width } = Dimensions.get('window');
    let sizes = {
      width,
      height: width * 9/16
    }
    this.setState({imageStyle: sizes});
  }

  render() {
    const { width } = Dimensions.get("window");
    let position = Animated.divide(this.scrollX, width);

    return (
      <View style={styles.carouselContainer} onLayout={this.onLayout}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
          )}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.images.map(image => ( // Image style changed from this.state.imageStyle -- ?? Also image carousel should be bigger
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