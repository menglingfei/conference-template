import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
interface ButtonProps {
    title: string,
    current?: boolean,
    handlePress: any
}
export default function TaskButton(ButtonProps: ButtonProps) {
    let current = ButtonProps.current;
    return (
        <TouchableOpacity activeOpacity = { .5 } onPress={() => {ButtonProps.handlePress()}}>
            <LinearGradient
                colors={current ?['rgba(175, 0, 23, 0.35)', 'rgba(175, 0, 23, 1)']: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
                style={{
                    borderRadius: 12,
                    textAlign:'center',
                    alignItems:'center',
                    justifyContent:'center',
                    textAlignVertical:'center',
                    height: 35,
                    width: 120,
                    borderWidth: current ? 0 : 1,
                    borderColor: current ? '#fff' : 'rgba(155, 155, 155, 1)'
                }}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0, 1]} >
                <Text style={{
                    fontSize: 16,
                    color : current ? '#fff' : 'rgba(51, 51, 51, 1)',
                    backgroundColor: 'transparent',
                    textAlignVertical: 'center',
                    textAlign: 'center'
                }}>
                    {ButtonProps.title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}
