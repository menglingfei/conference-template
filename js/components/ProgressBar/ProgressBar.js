"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
class Nav extends react_1.default.PureComponent {
    render() {
        let width = this.props.width ? this.props.width : 10;
        return (react_1.default.createElement(react_native_1.View, { style: { position: 'relative', width: '100%', height: width } },
            react_1.default.createElement(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, borderRadius: width / 2, backgroundColor: '#acacad' } }),
            react_1.default.createElement(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, width: `${this.props.progress * 100}%`, height: '100%', zIndex: 100, borderRadius: width / 2, backgroundColor: this.props.color } })));
    }
}
exports.default = Nav;
