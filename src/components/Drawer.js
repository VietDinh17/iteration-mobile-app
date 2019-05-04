import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from "galio-framework";

import Icon from './Icon';
import materialTheme from '../constants/Theme';

// Token from Okta


const notificationLabels = ['Test'];

class DrawerItem extends React.Component {

  logout = async () => {
    await console.log("THIS IS TESTTTTTTTTTTTTTTTTTTTT");
  }
  
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'Home':
        return (
          <Icon
            size={16}
            name="shop"
            family="GalioExtra"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Expenses':
        return (
          <Icon
            size={16}
            name="list-bullet"
            family="Galio"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Reports':
        return (
          <Icon
            size={16}
            name="list-bullet"
            family="Galio"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Trip':
        return (
          <Icon
            size={16}
            name="drag-31"
            family="Galio"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Settings':
        return (
          <Icon
            size={16}
            name="settings-gear-65"
            family="Galio"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Sign Out':
        return (
          <TouchableOpacity onPress={async () => {this.logout()}}>  
            <Icon
              size={16}
              name="log-out"
              family="Galio"
              color={focused ? 'white' : materialTheme.COLORS.MUTED} 
            />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  }

  renderLabel = () => {
    const { title } = this.props;

    if (notificationLabels.includes(title)) {
      return (
        <Block middle style={styles.pro}>
          <Text size={12} color="white">Number Here</Text>
        </Block>
      )
    }

    return null;
  }

  render() {
    const { focused, title } = this.props;
    const proScreen = notificationLabels.includes(title);
    return (
      <Block flex row style={[styles.defaultStyle, focused ? [styles.activeStyle, styles.shadow] : null]}>
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text size={18} color={focused ? 'white' : proScreen ? materialTheme.COLORS.MUTED : 'black'}>
            {title}
          </Text>  
          {this.renderLabel()}
        </Block>
      </Block>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36,
  },
})