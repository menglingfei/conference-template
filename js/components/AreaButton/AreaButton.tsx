import React from 'react';
import { TouchableOpacity } from 'react-native';
interface ButtonProps {
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    handleClick: any
}

export default function AreaButton(ButtonProps: ButtonProps) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'red',
                position: 'absolute',
                zIndex: 10000,
                top: ButtonProps.y,
                left: ButtonProps.x,
                width: ButtonProps.width,
                height: ButtonProps.height,
            }}
            activeOpacity={0}
            onPress={ButtonProps.handleClick}
        >
        </TouchableOpacity>
    );
}
