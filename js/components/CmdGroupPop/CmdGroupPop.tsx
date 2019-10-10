import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import DataStore from "../../common/js/DataStorage";

interface GroupProps {
    visible: boolean,
    cbCancel: any,
    headerText?: string,
    groupList: Array<any>,
    handleClick: any
}
interface GroupStates {
}

export default class CmdGroupPop extends Component<GroupProps, GroupStates> {
    private static dataStore = new DataStore();
    cancel = () => {
        this.props.cbCancel();
    }
    renderGroupList = () => {
        let data = this.props.groupList;
        return (
            data.map((item: any) => {
                return (
                    <TouchableOpacity key={item.id} onPress={() => {this.props.handleClick(item.id)}}>
                        <View style={styles.cmdItem}>
                            <Text style={{fontSize: 14}}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })
        )
    }
    render() {
        let headerText = this.props.headerText || "请选择一个指令组：";
        return (
            <Dialog
                visible={this.props.visible}
                dialogTitle={<DialogTitle textStyle={styles.dialogTitle} align="left" title={headerText} />}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'bottom'
                })}
            >
                <DialogContent style={styles.content}>
                    <ScrollView>
                        {this.props.groupList.length > 0 && this.renderGroupList()}
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
