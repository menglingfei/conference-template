import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default function Back() {
    return (
        <Image style={styles.back} source={require('./back.png')} />
    )
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
})