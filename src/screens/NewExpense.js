import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, Input, Text, theme } from 'galio-framework'; 

const { width } = Dimensions.get('screen');

export default class NewExpense extends React.Component{
    render(){
        return(
            <Block>
                <Text>Expenses Creation</Text>
            </Block>
        )
    }
}