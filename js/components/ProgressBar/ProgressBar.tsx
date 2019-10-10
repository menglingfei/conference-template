import React from 'react';
import { View } from 'react-native';
interface ProgressProps {
    width?: number,
    color: string,
    progress: number
}

export default class Nav extends React.PureComponent<ProgressProps> {
    render() {
        let width = this.props.width ? this.props.width : 10;
        return (
            <View style={{position: 'relative', width: '100%', height: width}}>
                <View style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000000, borderRadius: width / 2, backgroundColor: '#acacad'}}></View>
                <View style={{position: 'absolute', top: 0, left: 0, width: `${this.props.progress * 100}%` , height: '100%', zIndex: 100000000, borderRadius: width / 2, backgroundColor: this.props.color}}></View>
            </View>
        );
    }
}
