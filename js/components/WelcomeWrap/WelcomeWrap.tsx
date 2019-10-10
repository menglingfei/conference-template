import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WelcomeButton from "../../components/WelcomeButton/WelcomeButton";
import DataStore from '../../common/js/DataStorage';

interface AreaProps {
    cbCancel: any,
    cbConfirm: any,
    taskId: number
}
interface AreaStates {
    welcomeText: string,
    fontSize: number
}
const FONT_SIZE = 140;
export default class WelcomeWrap extends Component<AreaProps, AreaStates> {
    state = {
        welcomeText: '',
        fontSize: FONT_SIZE
    }
    public static dataStore:any = new DataStore();
    componentDidMount() {

    }
    sendWelcomeText = () => {
        /*
        if (!this.state.welcomeText) {
            ToastAndroid.showWithGravity(
                '欢迎词不能为空!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
        */
        WelcomeWrap.dataStore.beforeFetchNetData('/api/ctrl_cmd/show_text', {
            task_id: this.props.taskId,
            text: this.state.welcomeText,
            size: this.state.fontSize,
            color: '#ffffff',
            horizon: 2,
            vertical: 2
        })
            .then((data: any) => {
                this.setState({
                    welcomeText: '',
                    fontSize: FONT_SIZE
                }, () => {
                    this.props.cbConfirm();
                })
            })
            .catch((error: any) => {
                error && console.log(error.toString());
            })
    }
    adjustFontSize = (type: string) => {
        let fontSize = this.state.fontSize;
        if ('PLUS' === type) {
            this.setState({
                fontSize: fontSize + 5
            });
        } else if ('MINUS' === type) {
            this.setState({
                fontSize: fontSize - 5
            });
        }
    }
    cancel = () => {
        this.props.cbCancel();
        this.setState({
            welcomeText: '',
            fontSize: FONT_SIZE
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.welcomeText}
                    onChangeText={(welcomeText) => this.setState({welcomeText})}
                    value={this.state.welcomeText}
                    multiline={true}
                ></TextInput>
                <View style={styles.sizeWrap}>
                    <Text style={styles.font}>字体大小：</Text>
                    <View style={styles.adjustWrap}>
                        <Icon style={styles.icon} name='minus' size={18} color="rgba(51, 51, 51, 1)" onPress={() => {this.adjustFontSize('MINUS')}} />
                        <Text style={[styles.size, styles.font]}>{this.state.fontSize}</Text>
                        <Icon style={styles.icon} name='plus' size={18} color="rgba(51, 51, 51, 1)" onPress={() => {this.adjustFontSize('PLUS')}} />
                    </View>
                </View>
                <View style={styles.manipulate}>
                    <WelcomeButton title='确认' color={['rgba(175, 0, 23, 0.35)', 'rgba(175, 0, 23, 1)']} handleClick={this.sendWelcomeText}/>
                    <WelcomeButton title='取消' color={['rgba(0, 0, 0, 0.15)', 'rgba(67, 67, 67, 1)']} handleClick={this.cancel}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    manipulate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 35,
        marginTop: 36,
        paddingHorizontal: 280
    },
    sizeWrap: {
        flexDirection: 'row',
        marginTop: 8,
        width: '100%',
        paddingHorizontal: 10
    },
    size: {
        marginHorizontal: 10
    },
    font: {
        fontSize: 18,
        fontWeight: '600',
        color: 'rgba(51, 51, 51, 1)'
    },
    icon: {
        position: 'relative',
        top: 4
    },
    adjustWrap: {
        flexDirection: 'row',
        marginHorizontal: 8
    },
    welcomeText: {
        height: 290,
        width: 820,
        marginTop: 30,
        borderColor: "#ddd",
        borderWidth: 1,
        color: 'rgb(51, 51, 51)',
        paddingHorizontal: 10,
        textAlignVertical: 'top'
    }
})
