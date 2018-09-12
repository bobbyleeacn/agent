import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Animated,
} from 'react-native';

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, labelStyling, textStyle, style, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
      }),
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [25, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 12],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ccc', '#c8c8c8'],
      }),
    };
    console.log(this.props.textStyle)
    return (
      <View style={[{position: 'relative', justifyContent: 'center'}, style]}>
        <Animated.Text style={[labelStyle, labelStyling]}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          multiline={false}
          style={[{height: 30 }, textStyle]}
          underlineColorAndroid="transparent"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref="text_input"
          onSubmitEditing={() => this.refs['text_input'].blur()}
        />
      </View>
    )
  }
}