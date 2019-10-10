import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
interface ButtonProps {
    title: string,
    current?: boolean,
    handlePress: any
}
import { BoxShadow } from 'react-native-shadow';
const shadowOpt = {
    width: 190, //包裹的子内容多宽这里必须多宽
    height: 40, //同上
    color: "#2a8cff", //阴影颜色
    border: 8, //阴影宽度
    radius: 10, //包裹的子元素圆角多少这里必须是多少
    opacity: 0.5, //透明度
    x: 0,
    y: 0,
    style: {marginVertical: 5}
}

export default function TaskButton(ButtonProps: ButtonProps) {
    let current = ButtonProps.current;
    return (
        current ?
        <BoxShadow setting={shadowOpt}>
            <TouchableOpacity activeOpacity = { .5 } onPress={() => {ButtonProps.handlePress()}}>
                <Text style={{
                    position: 'absolute',
                    top: -8,
                    left: 30,
                    color: 'rgba(82, 180, 221, 1)',
                    fontSize: 40,
                    zIndex: 100
                }}>•</Text>
                <Text style={{
                    width: 190,
                    height: 40,
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    borderRadius: 14,
                    fontSize: 16,
                    color : 'rgba(51, 51, 51, 1)',
                    backgroundColor: '#fff',
                }}>
                    {ButtonProps.title}
                </Text>
            </TouchableOpacity>
        </BoxShadow> :
        <TouchableOpacity activeOpacity = { .5 } onPress={() => {ButtonProps.handlePress()}}>
            <Text style={{
                position: 'absolute',
                top: -8,
                left: 30,
                color: 'rgba(82, 180, 221, 1)',
                fontSize: 40,
                zIndex: 100
            }}>•</Text>
            <Text style={{
                width: 190,
                height: 40,
                textAlignVertical: 'center',
                textAlign: 'center',
                borderRadius: 14,
                fontSize: 16,
                color : 'rgba(51, 51, 51, 1)',
                backgroundColor: 'transparent',
            }}>
                {ButtonProps.title}
            </Text>
        </TouchableOpacity>
    );
}
