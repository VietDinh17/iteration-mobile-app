import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { Button, Block, Input, Text, theme } from 'galio-framework'; 
const { width } = Dimensions.get('screen');

export default class NewExpense extends React.Component{
    render(){
        return(
            <Block style={{paddingLeft: '2.5%', paddingRight: '2.5%',}}>
                <Block card flex style={[styles.product, styles.shadow]}>
                    <Block flex space="between" style={styles.productDescription}>
                        <Text size={14} style={styles.productTitle}>Hello</Text>
                        <Text size={12}>$20</Text>
                    </Block>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    product: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: theme.SIZES.BASE,
      borderWidth: 0,
      minHeight: 400,
    },
    productTitle: {
      flex: 1,
      flexWrap: 'wrap',
      paddingBottom: 6,
    },
    productDescription: {
      padding: theme.SIZES.BASE / 2,
    },
    imageContainer: {
      elevation: 1,
    },
    image: {
      borderRadius: 3,
      marginHorizontal: theme.SIZES.BASE / 2,
      marginTop: -16,
    },
    horizontalImage: {
      height: 122,
      width: 'auto',
    },
    fullImage: {
      height: 215,
      width: width - theme.SIZES.BASE * 3,
    },
    shadow: {
      shadowColor: theme.COLORS.BLACK,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 2,
    },
  });