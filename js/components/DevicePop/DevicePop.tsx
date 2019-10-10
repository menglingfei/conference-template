import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import DataStore from "../../common/js/DataStorage";

interface GroupProps {
    visible: boolean,
    cbCancel: any,
    deviceList: Array<any>,
    getScene: any
}
interface GroupStates {
}

export default class DevicePop extends Component<GroupProps, GroupStates> {
    private static dataStore = new DataStore();
    cancel = () => {
        this.props.cbCancel();
    }
    renderDeviceList = () => {
        let data = this.props.deviceList;
        return (
            data.map((item: any) => {
                return (
                    <TouchableOpacity key={item.id} onPress={() => {this.props.getScene(item.id, item.name, item.ip)}}>
                        <View key={item.id} style={styles.cmdItem}>
                            <Text style={{fontSize: 14}}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })
        )
    }
    render() {
        return (
            <Dialog
                visible={this.props.visible}
                dialogTitle={<DialogTitle textStyle={styles.dialogTitle} align="left" title="请选择一台播控：" />}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}
            >
                <DialogContent style={styles.content}>
                    <ScrollView>
                        {this.props.deviceList.length > 0 && this.renderDeviceList()}
                    </ScrollView>
                </DialogContent>
                <DialogFooter>
                    <DialogButton
                        text="关闭"
                        textStyle={{color: 'rgb(155, 155, 155)', fontSize: 14}}
                        onPress={() => {this.cancel()}}
                    />
                </DialogFooter>
            </Dialog>
        );
    }
}

const styles = StyleSheet.create({
    dialogTitle: {
        fontSize: 14,
        color: "rgb(51, 51, 51)"
    },
    content: {
        width: 400,
        height: 300
    },
    icon: {
        position: 'relative',
        top: 4
    },
    cmdItem: {
        flexDirection: 'row',
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ececec'
    }
});
