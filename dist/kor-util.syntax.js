(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./kor-util.core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fixPostPositions = fixPostPositions;
    var kor_util_core_1 = require("./kor-util.core");
    function fixPostPositions(str, options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        var returnValue = "";
        for (var loopLimit = (_a = options.loopLimit) !== null && _a !== void 0 ? _a : 100; loopLimit >= 0; loopLimit--) {
            var minIndex = void 0;
            var postPositionMatch = void 0;
            var _c = new Array(), target = _c[0], foundTarget = _c[1], lastSound = _c[2];
            for (var i = 0; i < POST_POSITION_MATCHES.length; i++) {
                var index = void 0;
                for (var j = 0; j < POST_POSITION_MATCHES[i].targets.length; j++) {
                    target = POST_POSITION_MATCHES[i].targets[j];
                    index = str.indexOf(target);
                    if (0 < index) {
                        if (minIndex === undefined || index < minIndex) {
                            minIndex = index;
                            postPositionMatch = POST_POSITION_MATCHES[i];
                            foundTarget = postPositionMatch.targets[j];
                        }
                    }
                }
                ;
            }
            if (postPositionMatch && minIndex && foundTarget) {
                var conditions = (_b = postPositionMatch.conditions) !== null && _b !== void 0 ? _b : [''];
                returnValue += str.substring(0, minIndex);
                lastSound = returnValue.substring(returnValue.length - 1);
                lastSound = (0, kor_util_core_1.isKoreanChar)(lastSound) ? (0, kor_util_core_1.split)(lastSound).charAt(2) : (0, kor_util_core_1.isConsonant)(lastSound) ? lastSound : '';
                returnValue += postPositionMatch.replacements[conditions.includes(lastSound) ? 0 : 1];
                str = str.substring(minIndex + foundTarget.length);
                continue;
            }
            else {
                break;
            }
        }
        returnValue += str;
        return returnValue;
    }
    var POST_POSITION_MATCHES = [
        {
            targets: ['은(는)', '는(은)'],
            conditions: undefined,
            replacements: ["는", "은"],
        },
        {
            targets: ['이(가)'],
            conditions: undefined,
            replacements: ["가", "이"],
        },
        {
            targets: ['을(를)', '를(을)'],
            conditions: undefined,
            replacements: ["를", "을"],
        },
        {
            targets: ['와(과)', '과(와)'],
            conditions: undefined,
            replacements: ["와", "과"],
        },
        {
            targets: ['(이)'],
            conditions: undefined,
            replacements: ["", "이"],
        },
        {
            targets: ['(으)로'],
            conditions: ["", "ㄹ"],
            replacements: ["로", "으로"],
        },
        {
            targets: ['율(률)', "률(율)"],
            conditions: ["", "ㄴ"], replacements: ["율", "률"],
        },
    ];
});
