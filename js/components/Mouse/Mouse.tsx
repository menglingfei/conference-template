import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default function Mouse() {
    return (
        <Image style={styles.back} source={require('./mouse.png')} />
    )
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
})
