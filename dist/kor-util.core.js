(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isKoreanPhoneme = isKoreanPhoneme;
    exports.isConsonant = isConsonant;
    exports.isFirstSound = isFirstSound;
    exports.isVowel = isVowel;
    exports.isLastSound = isLastSound;
    exports.convertAlphabetToPhoneme = convertAlphabetToPhoneme;
    exports.convertPhonemeToAlphabet = convertPhonemeToAlphabet;
    exports.isKoreanChar = isKoreanChar;
    exports.isKorean = isKorean;
    exports.indexOfKorean = indexOfKorean;
    exports.indexOfKoreanChar = indexOfKoreanChar;
    exports.indexOfKoreanPhoneme = indexOfKoreanPhoneme;
    exports.hasLastSound = hasLastSound;
    exports.koreanify = koreanify;
    exports.qwerty = qwerty;
    exports.split = split;
    exports.spread = spread;
    exports.compress = compress;
    function isKoreanPhoneme(char, autoConv) {
        char = char.charAt(0);
        return /^[\u3131-\u3163]/.test(char)
            || autoConv && !!(INDEXING_ARRAY__KO_PHONEME.includes(char))
            || false;
    }
    function isConsonant(char, autoConv) {
        char = char.charAt(0);
        return /^[\u3131-\u314e]/.test(char)
            || autoConv && !!INDEXING_ARRAY__KO_CONSONANT.includes(char)
            || false;
    }
    function isFirstSound(char, autoConv) {
        char = char.charAt(0);
        return autoConv && !!(1 + INDEXING_ARRAY__KO_CONSONANT.indexOf(char.charAt(0)))
            || !!INDEXING_ARRAY__KO_CONSONANT.includes(_convertPhonemeToAlphabet(char.charAt(0)))
            || false;
    }
    function isVowel(char, autoConv) {
        char = char.charAt(0);
        return /^[\u314f-\u3163]/.test(char)
            || autoConv && CHAR_COUNT__KO_CONSONANT <= INDEXING_ARRAY__KO_PHONEME.indexOf(char)
            || false;
    }
    function isLastSound(char, autoConv) {
        char = char.charAt(0);
        return autoConv && !!(1 + INDEXING_ARRAY__KO_LAST_SOUND.indexOf(char))
            || !!(1 + INDEXING_ARRAY__KO_LAST_SOUND.indexOf(_convertPhonemeToAlphabet(char)))
            || false;
    }
    function convertAlphabetToPhoneme(char, arg2, caseInsencitive) {
        var defaultValue;
        if (typeof arg2 === 'boolean') {
            caseInsencitive = arg2;
            defaultValue = undefined;
        }
        else {
            defaultValue = arg2;
        }
        if (INDEXING_ARRAY__KO_PHONEME.includes(char)) {
            return _convertAlphabetToPhoneme(char);
        }
        if (caseInsencitive && /^[A-Z]/.test(char))
            if (INDEXING_ARRAY__KO_PHONEME.includes(char.toLowerCase()))
                return _convertAlphabetToPhoneme(char.toLowerCase());
        return defaultValue !== null && defaultValue !== void 0 ? defaultValue : char;
    }
    function convertPhonemeToAlphabet(char, defaultValue) {
        return /^[\u3131-\u3163]$/i.test(char) ?
            _convertPhonemeToAlphabet(char) :
            defaultValue !== null && defaultValue !== void 0 ? defaultValue : char;
    }
    function isKoreanChar(char) {
        return /^[\uac00-\ud7a3]/.test(char);
    }
    function isKorean(str) {
        return /^[\u3131-\u3163\uac00-\ud7a3]+$/.test(str);
    }
    function indexOfKorean(str) {
        var _a;
        var m = str.match(/[\u3131-\u3163\uac00-\ud7a3]/);
        return (_a = (m && m.index)) !== null && _a !== void 0 ? _a : -1;
    }
    function indexOfKoreanChar(str) {
        var _a;
        var m = str.match(/[\uac00-\ud7a3]/);
        return (_a = (m && m.index)) !== null && _a !== void 0 ? _a : -1;
    }
    function indexOfKoreanPhoneme(str) {
        var _a;
        var m = str.match(/[\u3131-\u3163]/);
        return (_a = (m && m.index)) !== null && _a !== void 0 ? _a : -1;
    }
    function hasLastSound(str) {
        var c = str.slice(-1).charCodeAt(0) || 0;
        if (c < CHAR_CODE_AT_KO_CHAR_BEGIN)
            return false;
        if (c >= CHAR_CODE_AT_KO_CHAR_BEGIN + CHAR_COUNT__KO_CHAR)
            return false;
        var indexInKo = c - CHAR_CODE_AT_KO_CHAR_BEGIN;
        return indexInKo % CHAR_COUNT_PER_KO_MID_SOUND > 0;
    }
    function koreanify(str) {
        return _convertAlphabetsToKorean(str);
    }
    function qwerty(str) {
        return split(str).split("").map(function (c) {
            if (isKoreanChar(c))
                return split(c).split("").map(function (c) { return qwerty(c); }).join("");
            if (isKoreanPhoneme(c))
                return INDEXING_ARRAY__KO_PHONEME[c.charCodeAt(0) - CHAR_CODE_AT_KO_PHONEME_BEGIN];
            return c;
        }).join("");
    }
    function split(str) {
        return str.split("").map(function (ch) {
            if (!isKoreanChar(ch))
                return ch;
            var a = ["", "", ""], n = ch.charCodeAt(0) - CHAR_CODE_AT_KO_CHAR_BEGIN, m;
            m = n % CHAR_COUNT_PER_KO_MID_SOUND;
            a[2] = INDEXING_ARRAY__KO_LAST_SOUND[m];
            a[2] = a[2] && String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(a[2]))
                || "";
            m = n % CHAR_COUNT_PER_KO_FIRST_SOUND;
            m = Math.floor(m / CHAR_COUNT_PER_KO_MID_SOUND);
            a[1] = String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + CHAR_COUNT__KO_CONSONANT + m);
            m = Math.floor(n / CHAR_COUNT_PER_KO_FIRST_SOUND);
            a[0] = INDEXING_ARRAY__KO_CONSONANT[m];
            a[0] = String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(a[0]));
            return a.join("");
        }).join("");
    }
    function spread(str) {
        return str.split("").map(function (ch) {
            if (!isKorean(ch))
                return ch;
            return qwerty(ch).split("").map(function (c) {
                return _convertAlphabetToPhoneme(c);
            }).join("");
        }).join("");
    }
    function compress(str) {
        return _convertAlphabetsToKorean(str.split("").map(function (c) {
            return isKoreanPhoneme(c) ? _convertPhonemeToAlphabet(c) : c;
        }).join(""));
    }
    function _convertAlphabetsToKorean(raw) {
        function _compress(f, m, l) {
            if (f == null) {
                return m == null
                    ? ""
                    : String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + CHAR_COUNT__KO_CONSONANT + m);
            }
            if (m == null) {
                return String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(INDEXING_ARRAY__KO_CONSONANT[f]));
            }
            var n = CHAR_CODE_AT_KO_CHAR_BEGIN;
            n += f * CHAR_COUNT_PER_KO_FIRST_SOUND;
            n += m * CHAR_COUNT_PER_KO_MID_SOUND;
            n += l !== null && l !== void 0 ? l : 0;
            return String.fromCharCode(n);
        }
        if (!raw)
            return "";
        var returnValue = "";
        var arrCode = new Array();
        for (var i = 0; i < raw.length; i++) {
            var char = raw.charAt(i);
            var char2 = "".concat(char).concat(i < raw.length - 1
                ? raw.charAt(i + 1)
                : "_");
            var char3 = i < raw.length - 2
                ? raw.charAt(i + 2)
                : "_";
            if (arrCode.length != 1 && isVowel(char, true)) {
                if (1 < arrCode.length) { }
                else {
                    if (isVowel(char2, true)) {
                        ++i;
                        returnValue += _compress(undefined, _convertPhonemeToMidSoundIndex(char2));
                    }
                    else
                        returnValue += _compress(undefined, _convertPhonemeToMidSoundIndex(char));
                    continue;
                }
            }
            else
                switch (arrCode.length) {
                    case 0:
                        if (isFirstSound(char, true)) {
                            arrCode.push(_convertPhonemeToFirstSoundIndex(char));
                            continue;
                        }
                        break;
                    case 1:
                        if (isVowel(char2, true) && convertAlphabetToPhoneme(char2).length == 1) {
                            ++i;
                            arrCode.push(_convertPhonemeToMidSoundIndex(char2));
                            continue;
                        }
                        if (isVowel(char, true)) {
                            arrCode.push(_convertPhonemeToMidSoundIndex(char));
                            continue;
                        }
                        break;
                    case 2:
                        if (isLastSound(char2, true) && convertAlphabetToPhoneme(char2).length == 1 && !isVowel(char3, true)) {
                            ++i;
                            arrCode.push(_convertPhonemeToLastSoundIndex(char2));
                        }
                        else if (isLastSound(char, true) && !isVowel(char2[1], true)) {
                            arrCode.push(_convertPhonemeToLastSoundIndex(char));
                        }
                        if (arrCode.length > 2)
                            ++i;
                        break;
                }
            if (arrCode.length) {
                returnValue += _compress.apply(void 0, arrCode);
                arrCode = [];
                i--;
            }
            else
                returnValue += char;
        }
        return returnValue + _compress.apply(void 0, arrCode);
    }
    function _convertAlphabetToPhoneme(char) {
        return String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(char));
    }
    function _convertPhonemeToAlphabet(char) {
        return INDEXING_ARRAY__KO_PHONEME[char.charCodeAt(0) - CHAR_CODE_AT_KO_PHONEME_BEGIN];
    }
    function _convertPhonemeToFirstSoundIndex(phon) {
        return INDEXING_ARRAY__KO_CONSONANT.indexOf(phon);
    }
    function _convertPhonemeToMidSoundIndex(phon) {
        var i = INDEXING_ARRAY__KO_PHONEME.indexOf(phon) - CHAR_COUNT__KO_CONSONANT;
        return i < 0 ? -1 : i;
    }
    function _convertPhonemeToLastSoundIndex(phon) {
        return INDEXING_ARRAY__KO_LAST_SOUND.indexOf(phon);
    }
    var CHAR_CODE_AT_KO_CHAR_BEGIN = 0xAC00;
    var CHAR_COUNT__KO_CHAR = 0x2BA4;
    var CHAR_COUNT_PER_KO_MID_SOUND = 0x001C;
    var CHAR_COUNT_PER_KO_FIRST_SOUND = 0x024C;
    var getCharCodeAtKoreanCharBegin = function () { return CHAR_CODE_AT_KO_CHAR_BEGIN; };
    var getKoreanCharCount = function () { return CHAR_COUNT__KO_CHAR; };
    var getKoreanCharCountPerFirstSound = function () { return CHAR_COUNT_PER_KO_FIRST_SOUND; };
    var getKoreanCharCountPerMidSound = function () { return CHAR_COUNT_PER_KO_MID_SOUND; };
    var CHAR_CODE_AT_KO_PHONEME_BEGIN = 0x3131;
    var CHAR_COUNT__KO_CONSONANT = 0x001E;
    var CHAR_COUNT__KO_VOWEL = 0x0015;
    var getCharCodeAtKoreanPhonemeBegin = function () { return CHAR_CODE_AT_KO_PHONEME_BEGIN; };
    var getKoreanConsonantCount = function () { return CHAR_COUNT__KO_CONSONANT; };
    var getKoreanVowelCount = function () { return CHAR_COUNT__KO_VOWEL; };
    var INDEXING_ARRAY__KO_PHONEME = ["r", "R", "rt", "s", "sw", "sg", "e", "E", "f", "fr", "fa", "fq", "ft", "fx", "fv", "fg", "a", "q", "Q", "qt", "t", "T", "d", "w", "W", "c", "z", "x", "v", "g", "k", "o", "i", "O", "j", "p", "u", "P", "h", "hk", "ho", "hl", "y", "n", "nj", "np", "nl", "b", "m", "ml", "l"];
    var INDEXING_ARRAY__KO_CONSONANT = ["r", "R", "s", "e", "E", "f", "a", "q", "Q", "t", "T", "d", "w", "W", "c", "z", "x", "v", "g"];
    var INDEXING_ARRAY__KO_LAST_SOUND = ["", "r", "R", "rt", "s", "sw", "sg", "e", "f", "fr", "fa", "fq", "ft", "fx", "fv", "fg", "a", "q", "qt", "t", "T", "d", "w", "c", "z", "x", "v", "g"];
});
