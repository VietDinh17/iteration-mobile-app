import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

// const ChatButton = ({isWhite, style, navigation}) => (
//   <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
//     <Icon
//       family="GalioExtra"
//       size={16}
//       name="chat-33"
//       color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
//     />
//     <Block middle style={styles.notify} />
//   </TouchableOpacity>
// );

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="FontAwesome"
      size={16}
      name="refresh"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle/>
  </TouchableOpacity>
);

const SaveButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('BlackHole')}>
    {/* <Icon
      family="FontAwesome"
      size={16}
      name="refresh"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    /> */}
    <Text size={16} bold={true}>Save</Text>
    <Block middle/>
  </TouchableOpacity>
);

const PlusButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('NewReport')}>
    <Icon
      family="FontAwesome"
      size={20}
      name="plus"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    {/* <Text size={16} bold={true}>Save</Text> */}
    <Block middle/>
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="Galio"
      name="zoom-split"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;

    switch (routeName) {
      case 'Home':
        return ([
          // <ChatButton key='chat-home' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-home' navigation={navigation} isWhite={white} />
        ]);
      case 'Expenses':
        return ([
          // <ChatButton key='chat-categories' navigation={navigation} />,
          <BasketButton key='basket-categories' navigation={navigation} />
        ]);
      case 'Reports':
        return ([
          // <ChatButton key='chat-categories' navigation={navigation} isWhite={white} />,
          <PlusButton key='basket-categories' navigation={navigation} isWhite={white} />
        ]);
      case 'Trip':
        return ([
          // <ChatButton key='chat-deals' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'NewExpense':
        return ([
          <SaveButton key='save' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

  // renderSearch = () => {
  //   const { navigation } = this.props;
  //   return (
  //     <Input
  //       right
  //       color="black"
  //       style={styles.search}
  //       placeholder="What are you looking for?"
  //       onFocus={() => navigation.navigate('Pro')}
  //       iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="zoom-split" family="Galio" />}
  //     />
  //   )
  // }

  renderTabs = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('NewExpense')}>
          <Block row middle>
            <Icon size={25} name="plus" family="FontAwesome" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Create Expenses'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Camera')}>
          <Block row middle>
            <Icon size={25} name="camera" family="FontAwesome" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Scan Receipt'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderHeader = () => {
    const { search, tabs } = this.props;
    if (search || tabs) {
      return (
        <Block center>
          {/* {search ? this.renderSearch() : null} */}
          {tabs ? this.renderTabs() : null}
        </Block>
      )
    }
    return null;
  }

  render() {
    const { back, title, white, transparent, navigation } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ["Reports", "Trip", "Settings"].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={styles.navbar}
          transparent={transparent}
          right={this.renderRight()}
          // right={null}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ paddingVertical: 12, flex: 0.3 }}
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
          titleStyle={[
            styles.title,
            {color: theme.COLORS[white ? 'WHITE' : 'ICON']},
          ]}
          onLeftPress={this.handleLeftPress}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  saveButton: {
    fontWeight: '300',
  },
})