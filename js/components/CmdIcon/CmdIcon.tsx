import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

export default function CmdIcon() {
    return (
        <Image style={styles.back} source={require('./cmd.png')} />
    )
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
})