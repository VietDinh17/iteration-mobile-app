import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Block } from 'galio-framework';
import Theme from '../constants/Theme';
import Icon from '../components/Icon';

const { width } = Dimensions.get('screen');

export default class MyCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <Block style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 5,
                }}>
                <TouchableOpacity onPress={async () => {
                    if (this.camera) {
                        this.camera.takePictureAsync()
                        .then(data => console.log(data))
                    }
                }}>
                {/* <TouchableOpacity onPress={() => {this.props.navigation.pop()}}> */}
                    <Icon
                        family="FontAwesome"
                        size={100}
                        name="circle"
                        color={Theme.COLORS.WHITE}
                    />
                </TouchableOpacity>        
              </Block>
              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity> */}
            </View>
          </Camera>
        </View>
      );
    }
  }
}
