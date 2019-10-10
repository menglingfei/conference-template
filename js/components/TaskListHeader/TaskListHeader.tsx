import React from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
interface HeaderProps {
    title: string
}

export default class TaskListHeader extends React.PureComponent<HeaderProps> {
    render() {
        return (
            <LinearGradient
                colors={['rgba(48, 35, 174, 1)', 'rgba(200, 109, 215, 1)']}
                style={styles.LinearGradientStyle}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                locations={[0, 1]} >
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    LinearGradientStyle: {
        width: '100%',
        height: 50,
        fontSize: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    buttonText: {
        width: '100%',
        textAlign: 'center',
        lineHeight: 50,
        fontSize: 18,
        fontWeight: '600',
        color : '#fff',
    }
});
