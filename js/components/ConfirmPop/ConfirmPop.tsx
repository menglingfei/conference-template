import React from 'react';
import { Text } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';

interface ConfirmProps {
    visible: boolean,
    cbCancel: any,
    cbConfirm: any,
    type: string
}

export default function ConfirmPop(props: ConfirmProps) {
    return (
        <Dialog
            visible={props.visible}
            dialogAnimation={new SlideAnimation({
                slideFrom: 'bottom'
            })}
        >
            <DialogContent style={{alignItems: 'center', paddingTop: 30}}>
                <Text>确认{props.type}展厅内所有设备？</Text>
            </DialogContent>
            <DialogFooter>
                <DialogButton
                    text="取消"
                    textStyle={{color: 'rgb(155, 155, 155)', fontSize: 14}}
                    onPress={() => {props.cbCancel()}}
                />
                <DialogButton
                    text="确认"
                    textStyle={{color: 'rgb(175, 0, 23)', fontSize: 14}}
                    onPress={() => {props.cbConfirm()}}
                />
            </DialogFooter>
        </Dialog>
    );
}

