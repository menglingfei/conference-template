import React, { Component } from 'react';
import { AsyncStorage, Text, TextInput, ToastAndroid } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';

interface URLProps {
    prevWebType: string
    visible: boolean,
    cbCancel: any,
    cbConfirm: any
}

interface URLStates {
    url: string
}

export default class URLPop extends Component<URLProps, URLStates> {
    state = {
        url: 'http://'
    }
    verifyUrl = () => {
        const that = this;
        const { url } = this.state;
        if (!url) {
            ToastAndroid.showWithGravity(
                'URL不能为空！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return;
        }
        ToastAndroid.showWithGravity(
            `已切换`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        AsyncStorage.setItem('URL', url).then(() => {
            that.props.cbConfirm('OFFLINE');
        })
    }
    switchToWIFI = () => {
        const that = this;
        ToastAndroid.showWithGravity(
            `已切换`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        AsyncStorage.removeItem('URL').then(() => {
            that.props.cbConfirm('WIFI');
        })
    }
    render() {
        const { visible, cbCancel, prevWebType } = this.props;
        return (
            <Dialog
                visible={visible}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}
            >
                <DialogContent style={{alignItems: 'center', paddingTop: 30}}>
                    {
                        prevWebType === 'WIFI' ?
                        <>
                            <Text
                                style={{
                                    color: '#888',
                                    marginBottom: 10
                                }}
                            >
                                请输入URL：
                            </Text>
                            <TextInput
                                style={{
                                    width: 200,
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: '#666',
                                    borderRadius: 2
                                }}
                                defaultValue='http://'
                                onChangeText={(value) => {
                                    this.setState({
                                        url: value
                                    })
                                }}
                            />
                        </> :
                        <Text
                            style={{
                                color: '#888',
                                marginBottom: 10
                            }}
                        >
                            确认切换为WIFI模式？
                        </Text>
                    }


                </DialogContent>
                <DialogFooter>
                    <DialogButton
                        text="取消"
                        textStyle={{color: 'rgb(155, 155, 155)', fontSize: 14}}
                        onPress={() => {cbCancel()}}
                    />
                    <DialogButton
                        text="确认"
                        textStyle={{color: 'rgb(175, 0, 23)', fontSize: 14}}
                        onPress={prevWebType === 'WIFI' ? this.verifyUrl : this.switchToWIFI}
                    />
                </DialogFooter>
            </Dialog>
        );
    }
}

