import React from 'react';
import { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import DataStore from "../../common/js/DataStorage";
import BgButton from "../BgButton/BgButton";
import { PLACE_ID } from "../../common/js/params";

interface AreaProps {
    commandList: any,
    setDevicesData: any,
    setCurrentAreaId: any
}
interface AreaStates {
}

export default class CommandListWrap extends Component<AreaProps, AreaStates> {
    public static dataStore:any = new DataStore();
    renderCommandList = (data: any) => {
        return (
            data.map((item: any) => {
                return (
                    <View key={item.id} style={{marginHorizontal: 1}}>
                        <BgButton
                            id={item.id}
                            title={item.device_model_function_name}
                            selected={false}
                            handlePress={() => {alert(1)}}
                        />
                    </View>
                );
            })
        )
    }
    render() {
        let commandList = this.props.commandList;
        let length = commandList.length;
        return (
            <View style={styles.container}>
                {
                    length > 0 && length <= 6 ?
                    <React.Fragment>
                        {this.renderCommandList(commandList)}
                    </React.Fragment> :
                    <ScrollView horizontal={true}>
                        {this.renderCommandList(commandList)}
                    </ScrollView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    commandWrap: {
        width: '100%',
        height: '100%'
    }
});
