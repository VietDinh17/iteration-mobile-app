import React from 'react';
import {
  Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Platform,
} from 'react-native';

// galio component
import {
  Block, Button, Input, NavBar, Text,
} from 'galio-framework';
import theme from '../constants/Theme';

// AWS Amplify
import Auth from '@aws-amplify/auth'

const { height, width } = Dimensions.get('window');

class Signin extends React.Component {
  state = {
    username: '',
    password: '',
  }

  async signIn() {
    const { username, password } = this.state
    await Auth.signIn(username, password)
      .then(user => {
        this.setState({ user })
        this.props.navigation.navigate('Home')
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when signing in: ', err)
          Alert.alert('Error when signing in: ', err)
        } else {
          console.log('Error when signing in: ', err.message)
          Alert.alert('Error when signing in: ', err.message)
        }
      })
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
          <Block flex center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>
            <Text muted center size={theme.SIZES.FONT * 0.875} style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}>
              This is the perfect place to write a short description
              of this step and even the next steps ahead
            </Text>
            <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 1.875 }}>
              <Block flex middle middle>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="github"
                  iconFamily="FontAwesome"
                  color={theme.COLORS.GITHUB}
                  shadowColor={theme.COLORS.GITHUB}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                  onPress={() => Alert.alert('Not implemented')}
                />
              </Block>
            </Block>
            <Text muted center size={theme.SIZES.FONT * 0.875}>
              or be classical
            </Text>
          </Block>

          <Block flex={2} center space="evenly">
            <Block flex={2}>
              <Input
                rounded
                // type="email-address"
                placeholder="Username"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={text => this.handleChange('username', text)}
              />
              <Input
                rounded
                password
                viewPass
                placeholder="Password"
                style={{ width: width * 0.9 }}
                onChangeText={text => this.handleChange('password', text)}
              />
              <Text
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
                onPress={() => Alert.alert('Not implemented')}
                style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
              >
                Forgot your password?
              </Text>
            </Block>
            <Block flex center>
              <Button
                round
                color="error"
                onPress={() => this.signIn()}
              >
                Sign in
              </Button>
              <Button color="transparent" shadowless onPress={() => navigation.navigate('Signup')}>
                <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.75}>
                  {"Don't have an account? Sign Up"}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});

export default Signin;
