"use strict";
/** 键盘上的按钮组件
 * props
 * type        {Number}    按钮类型，分为了三类(默认为1);1-正常按钮;2-长按按钮，包括shift，Windows，Ctrl，Alt;3-状态记忆按钮，caps
 * title       {Array}     按钮上显示的文本
 * flex        {Number}    按钮的长度比例
 * size        {String}    按钮的高度(默认为空); 'small'-小按钮，如F1，F12等
 * handleClick {Function}  点击后的执行函数
 * value       {Array}     按钮文本的ASCII码值
 * isDown      {Boolean}   按钮是否处于被按下的状态
 * current     {Number}    当前value数组中高亮的值的索引
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const LINE_HEIGHT = 50;
class KeyBoardBtnItem extends react_1.Component {
    constructor(props) {
        super(props);
        this.renderTexts = (data, size) => {
            let count = 0;
            return (data.map((item, index) => {
                return (react_1.default.createElement(react_native_1.Text, { style: size === 'small' ? styles.textSmall : styles.text }, item));
            }));
        };
    }
    render() {
        let props = this.props;
        let flex = props.flex || 1;
        let size = props.size || '';
        let isDown = props.isDown || false;
        let currentIndex = props.current || 0;
        return (react_1.default.createElement(react_native_1.View, { style: {
                flex: flex,
                margin: 4,
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            } },
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: isDown ? styles.touchClicked : styles.touch, onPress: () => {
                    this.props.handleClick(props.value[currentIndex]);
                } }, props.title.length > 0 && this.renderTexts(props.title, size))));
    }
}
exports.default = KeyBoardBtnItem;
const styles = react_native_1.StyleSheet.create({
    keyItem: {
        flex: 1,
        margin: 4,
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    touch: {
        height: '100%',
        borderRadius: 8,
        flexDirection: 'column-reverse'
    },
    touchClicked: {
        height: '100%',
        backgroundColor: '#0076d7',
        borderRadius: 8,
        flexDirection: 'column-reverse'
    },
    text: {
        flex: 1,
        textAlign: "center"
    },
    textSmall: {
        flex: 1,
        height: LINE_HEIGHT * 2 / 3 - 4,
        lineHeight: LINE_HEIGHT * 2 / 3 - 4,
        textAlign: "center"
    }
});
