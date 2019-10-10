import React, { Component } from 'react';
import { Text, TextInput, ToastAndroid } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import {PASSWORD} from "../../common/js/params";

interface PasswordProps {
    visible: boolean,
    cbCancel: any,
    cbConfirm: any,
    /**
     * 1 - only 'confirm'
     * 2 - 'confirm' and 'cancel'
     */
    footType: number
}

interface PasswordStates {
    password: string
}

export default class PasswordPop extends Component<PasswordProps, PasswordStates> {
    state = {
        password: ''
    }
    verifyPwd = () => {
        const { password } = this.state;
        if (!password) {
            ToastAndroid.showWithGravity(
                '密码不能为空！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return;
        }
        if (password !== PASSWORD) {
            ToastAndroid.showWithGravity(
                '密码错误！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return;
        }
        this.props.cbConfirm();
    }
    render() {
        const { visible, cbCancel } = this.props;
        return (
            <Dialog
                visible={visible}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}
            >
                <DialogContent style={{alignItems: 'center', paddingTop: 30}}>
                    <Text
                        style={{
                            color: '#888',
                            marginBottom: 10
                        }}
                    >
                        请输入密码：
                    </Text>
                    <TextInput
                        style={{
                            width: 200,
                            height: 40,
                            borderWidth: 1,
                            borderColor: '#666',
                            borderRadius: 2
                        }}
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            this.setState({
                                password: value
                            })
                        }}
                    />
                </DialogContent>
                {
                    this.props.footType === 2 ?
                        <DialogFooter>
                            <DialogButton
                                text="取消"
                                textStyle={{color: 'rgb(155, 155, 155)', fontSize: 14}}
                                onPress={() => {cbCancel()}}
                            />
                            <DialogButton
                                text="确认"
                                textStyle={{color: 'rgb(175, 0, 23)', fontSize: 14}}
                                onPress={() => {this.verifyPwd()}}
                            />
                        </DialogFooter> :
                        <DialogFooter>
                            <DialogButton
                                text="确认"
                                textStyle={{color: 'rgb(175, 0, 23)', fontSize: 14}}
                                onPress={() => {this.verifyPwd()}}
                            />
                        </DialogFooter>
                }
            </Dialog>
        );
    }
}

