import React from 'react';
import { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { filterArrayFromName } from '../../common/js/utils';
interface TaskListProps {
    currentTaskId: number,
    taskList: Array<any>,
    onTaskChange: any
}
interface TaskListState {
}
export default class TaskList extends Component<TaskListProps, TaskListState> {
    onTaskChange = (taskId: number, taskName: string) => {
        this.props.onTaskChange(taskId, taskName);
    }
    renderTaskList = (data: Array<any>) => {
        return (
            data.map((item) => {
                return (
                    <TouchableOpacity key={item.id} onPress={() => {this.onTaskChange(item.id, item.name)}}>
                        <View style={styles.taskItem} key={item.id}>
                            <Text ellipsizeMode='middle' numberOfLines={1} style={this.props.currentTaskId === item.id ? styles.taskNameLight : styles.taskName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        )
    }
    render() {
        // let taskList = filterArrayFromName(this.props.taskList);
        const taskList = this.props.taskList;
        return (
            <ScrollView style={{
                backgroundColor: '#fff',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
            }} showsVerticalScrollIndicator={true}>
                {taskList.length > 0 && this.renderTaskList(taskList)}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    taskItem: {
        width: "100%",
        height: 40
    },
    taskName: {
        textAlign: "center",
        color: "rgb(51, 51, 51)",
        height: 40,
        lineHeight: 40,
        fontSize: 16
    },
    taskNameLight: {
        textAlign: "center",
        color: "rgba(175, 0, 23, 1)",
        height: 40,
        lineHeight: 40,
        fontSize: 16
    }
});
