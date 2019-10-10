import React from 'react';
import { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { filterArrayFromName } from '../../common/js/utils';
interface SceneListProps {
    currentSceneId: number,
    sceneList: Array<any>,
    onSceneChange: any
}
interface SceneListState {
}
export default class SceneList extends Component<SceneListProps, SceneListState> {
    constructor(props: any) {
        super(props);
    }
    onSceneChange = (sceneId: number, sceneName: string) => {
        this.props.onSceneChange(sceneId, sceneName);
    }
    renderSceneList = (data: Array<any>) => {
        return (
            data.map((item) => {
                return (
                    <TouchableOpacity key={item.id} onPress={() => {this.onSceneChange(item.id, item.name)}}>
                        <View style={styles.sceneItem} key={item.id}>
                            <Text ellipsizeMode='middle' numberOfLines={1} style={this.props.currentSceneId === item.id ? styles.sceneNameLight : styles.sceneName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        )
    }
    render() {
        let sceneList = this.props.sceneList;
        return (
            <ScrollView style={{
                backgroundColor: '#fff',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
            }} showsVerticalScrollIndicator={true}>
                {sceneList.length > 0 && this.renderSceneList(sceneList)}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    sceneItem: {
        width: "100%",
        height: 40
    },
    sceneName: {
        textAlign: "center",
        color: "rgb(51, 51, 51)",
        height: 40,
        lineHeight: 40,
        fontSize: 16
    },
    sceneNameLight: {
        textAlign: "center",
        color: "rgba(175, 0, 23, 1)",
        height: 40,
        lineHeight: 40,
        fontSize: 16
    }
});
