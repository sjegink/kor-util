(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.korUtil = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var korUtil$2 = {exports: {}};

	var korUtil$1 = korUtil$2.exports;

	var hasRequiredKorUtil;

	function requireKorUtil () {
		if (hasRequiredKorUtil) return korUtil$2.exports;
		hasRequiredKorUtil = 1;
		(function (module, exports) {
			(function (global, factory) {
				module.exports = factory() ;
			})(korUtil$1, (function () {
				function getDefaultExportFromCjs (x) {
					return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
				}

				var korUtil_core = {exports: {}};

				var hasRequiredKorUtil_core;

				function requireKorUtil_core () {
					if (hasRequiredKorUtil_core) return korUtil_core.exports;
					hasRequiredKorUtil_core = 1;
					(function (module, exports) {
						(function (factory) {
						    {
						        var v = factory(createCommonjsRequire("/dist"), exports);
						        if (v !== undefined) module.exports = v;
						    }
						})(function (require, exports) {
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
						        let defaultValue;
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
						        const c = str.slice(-1).charCodeAt(0) || 0;
						        if (c < CHAR_CODE_AT_KO_CHAR_BEGIN)
						            return false;
						        if (c >= CHAR_CODE_AT_KO_CHAR_BEGIN + CHAR_COUNT__KO_CHAR)
						            return false;
						        const indexInKo = c - CHAR_CODE_AT_KO_CHAR_BEGIN;
						        return indexInKo % CHAR_COUNT_PER_KO_MID_SOUND > 0;
						    }
						    function koreanify(str) {
						        return _convertAlphabetsToKorean(str);
						    }
						    function qwerty(str) {
						        return split(str).split("").map(function (c) {
						            if (isKoreanChar(c))
						                return split(c).split("").map(c => qwerty(c)).join("");
						            if (isKoreanPhoneme(c))
						                return INDEXING_ARRAY__KO_PHONEME[c.charCodeAt(0) - CHAR_CODE_AT_KO_PHONEME_BEGIN];
						            return c;
						        }).join("");
						    }
						    function split(str) {
						        return str.split("").map((ch) => {
						            if (!isKoreanChar(ch))
						                return ch;
						            let a = ["", "", ""], n = ch.charCodeAt(0) - CHAR_CODE_AT_KO_CHAR_BEGIN, m;
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
						        return str.split("").map((ch) => {
						            if (!isKorean(ch))
						                return ch;
						            return qwerty(ch).split("").map(c => _convertAlphabetToPhoneme(c)).join("");
						        }).join("");
						    }
						    function compress(str) {
						        return _convertAlphabetsToKorean(str.split("").map(c => isKoreanPhoneme(c) ? _convertPhonemeToAlphabet(c) : c).join(""));
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
						            let n = CHAR_CODE_AT_KO_CHAR_BEGIN;
						            n += f * CHAR_COUNT_PER_KO_FIRST_SOUND;
						            n += m * CHAR_COUNT_PER_KO_MID_SOUND;
						            n += l !== null && l !== void 0 ? l : 0;
						            return String.fromCharCode(n);
						        }
						        if (!raw)
						            return "";
						        let returnValue = "";
						        let arrCode = new Array();
						        for (var i = 0; i < raw.length; i++) {
						            const char = raw.charAt(i);
						            const char2 = `${char}${i < raw.length - 1
				                ? raw.charAt(i + 1)
				                : "_"}`;
						            const char3 = i < raw.length - 2
						                ? raw.charAt(i + 2)
						                : "_";
						            if (arrCode.length != 1 && isVowel(char, true)) {
						                if (1 < arrCode.length) ;
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
						                returnValue += _compress(...arrCode);
						                arrCode = [];
						                i--;
						            }
						            else
						                returnValue += char;
						        }
						        return returnValue + _compress(...arrCode);
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
						    const CHAR_CODE_AT_KO_CHAR_BEGIN = 0xAC00;
						    const CHAR_COUNT__KO_CHAR = 0x2BA4;
						    const CHAR_COUNT_PER_KO_MID_SOUND = 0x001C;
						    const CHAR_COUNT_PER_KO_FIRST_SOUND = 0x024C;
						    const CHAR_CODE_AT_KO_PHONEME_BEGIN = 0x3131;
						    const CHAR_COUNT__KO_CONSONANT = 0x001E;
						    const INDEXING_ARRAY__KO_PHONEME = ["r", "R", "rt", "s", "sw", "sg", "e", "E", "f", "fr", "fa", "fq", "ft", "fx", "fv", "fg", "a", "q", "Q", "qt", "t", "T", "d", "w", "W", "c", "z", "x", "v", "g", "k", "o", "i", "O", "j", "p", "u", "P", "h", "hk", "ho", "hl", "y", "n", "nj", "np", "nl", "b", "m", "ml", "l"];
						    const INDEXING_ARRAY__KO_CONSONANT = ["r", "R", "s", "e", "E", "f", "a", "q", "Q", "t", "T", "d", "w", "W", "c", "z", "x", "v", "g"];
						    const INDEXING_ARRAY__KO_LAST_SOUND = ["", "r", "R", "rt", "s", "sw", "sg", "e", "f", "fr", "fa", "fq", "ft", "fx", "fv", "fg", "a", "q", "qt", "t", "T", "d", "w", "c", "z", "x", "v", "g"];
						}); 
					} (korUtil_core, korUtil_core.exports));
					return korUtil_core.exports;
				}

				var korUtil_syntax = {exports: {}};

				var hasRequiredKorUtil_syntax;

				function requireKorUtil_syntax () {
					if (hasRequiredKorUtil_syntax) return korUtil_syntax.exports;
					hasRequiredKorUtil_syntax = 1;
					(function (module, exports) {
						(function (factory) {
						    {
						        var v = factory(createCommonjsRequire("/dist"), exports);
						        if (v !== undefined) module.exports = v;
						    }
						})(function (require, exports) {
						    Object.defineProperty(exports, "__esModule", { value: true });
						    exports.fixPostPositions = fixPostPositions;
						    const kor_util_core_1 = require("./kor-util.core");
						    function fixPostPositions(str, options = {}) {
						        var _a, _b;
						        let returnValue = "";
						        for (let loopLimit = (_a = options.loopLimit) !== null && _a !== void 0 ? _a : 100; loopLimit >= 0; loopLimit--) {
						            let minIndex;
						            let postPositionMatch;
						            let [target, foundTarget, lastSound] = new Array();
						            for (let i = 0; i < POST_POSITION_MATCHES.length; i++) {
						                let index;
						                for (let j = 0; j < POST_POSITION_MATCHES[i].targets.length; j++) {
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
						            }
						            if (postPositionMatch && minIndex && foundTarget) {
						                let conditions = (_b = postPositionMatch.conditions) !== null && _b !== void 0 ? _b : [''];
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
						    const POST_POSITION_MATCHES = [
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
					} (korUtil_syntax, korUtil_syntax.exports));
					return korUtil_syntax.exports;
				}

				var dynamicModules;

				function getDynamicModules() {
					return dynamicModules || (dynamicModules = {
						"/dist/kor-util.core.js": requireKorUtil_core,
						"/dist/kor-util.syntax.js": requireKorUtil_syntax
					});
				}

				function createCommonjsRequire(originalModuleDir) {
					function handleRequire(path) {
						var resolvedPath = commonjsResolve(path, originalModuleDir);
						if (resolvedPath !== null) {
							return getDynamicModules()[resolvedPath]();
						}
						throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
					}
					handleRequire.resolve = function (path) {
						var resolvedPath = commonjsResolve(path, originalModuleDir);
						if (resolvedPath !== null) {
							return resolvedPath;
						}
						return createCommonjsRequire("/dist").resolve(path);
					};
					return handleRequire;
				}

				function commonjsResolve (path, originalModuleDir) {
					var shouldTryNodeModules = isPossibleNodeModulesPath(path);
					path = normalize(path);
					var relPath;
					if (path[0] === '/') {
						originalModuleDir = '';
					}
					var modules = getDynamicModules();
					var checkedExtensions = ['', '.js', '.json'];
					while (true) {
						if (!shouldTryNodeModules) {
							relPath = normalize(originalModuleDir + '/' + path);
						} else {
							relPath = normalize(originalModuleDir + '/node_modules/' + path);
						}

						if (relPath.endsWith('/..')) {
							break; // Travelled too far up, avoid infinite loop
						}

						for (var extensionIndex = 0; extensionIndex < checkedExtensions.length; extensionIndex++) {
							var resolvedPath = relPath + checkedExtensions[extensionIndex];
							if (modules[resolvedPath]) {
								return resolvedPath;
							}
						}
						if (!shouldTryNodeModules) break;
						var nextDir = normalize(originalModuleDir + '/..');
						if (nextDir === originalModuleDir) break;
						originalModuleDir = nextDir;
					}
					return null;
				}

				function isPossibleNodeModulesPath (modulePath) {
					var c0 = modulePath[0];
					if (c0 === '/' || c0 === '\\') return false;
					var c1 = modulePath[1], c2 = modulePath[2];
					if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\')) ||
						(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\'))) return false;
					if (c1 === ':' && (c2 === '/' || c2 === '\\')) return false;
					return true;
				}

				function normalize (path) {
					path = path.replace(/\\/g, '/');
					var parts = path.split('/');
					var slashed = parts[0] === '';
					for (var i = 1; i < parts.length; i++) {
						if (parts[i] === '.' || parts[i] === '') {
							parts.splice(i--, 1);
						}
					}
					for (var i = 1; i < parts.length; i++) {
						if (parts[i] !== '..') continue;
						if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
							parts.splice(--i, 2);
							i--;
						}
					}
					path = parts.join('/');
					if (slashed && path[0] !== '/') path = '/' + path;
					else if (path.length === 0) path = '.';
					return path;
				}

				var korUtil$2 = {exports: {}};

				var korUtil$1 = korUtil$2.exports;

				var hasRequiredKorUtil;

				function requireKorUtil () {
					if (hasRequiredKorUtil) return korUtil$2.exports;
					hasRequiredKorUtil = 1;
					(function (module, exports) {
						var __createBinding = (korUtil$1 && korUtil$1.__createBinding) || (Object.create ? (function(o, m, k, k2) {
						    if (k2 === undefined) k2 = k;
						    var desc = Object.getOwnPropertyDescriptor(m, k);
						    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
						      desc = { enumerable: true, get: function() { return m[k]; } };
						    }
						    Object.defineProperty(o, k2, desc);
						}) : (function(o, m, k, k2) {
						    if (k2 === undefined) k2 = k;
						    o[k2] = m[k];
						}));
						var __setModuleDefault = (korUtil$1 && korUtil$1.__setModuleDefault) || (Object.create ? (function(o, v) {
						    Object.defineProperty(o, "default", { enumerable: true, value: v });
						}) : function(o, v) {
						    o["default"] = v;
						});
						var __exportStar = (korUtil$1 && korUtil$1.__exportStar) || function(m, exports) {
						    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
						};
						var __importStar = (korUtil$1 && korUtil$1.__importStar) || (function () {
						    var ownKeys = function(o) {
						        ownKeys = Object.getOwnPropertyNames || function (o) {
						            var ar = [];
						            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
						            return ar;
						        };
						        return ownKeys(o);
						    };
						    return function (mod) {
						        if (mod && mod.__esModule) return mod;
						        var result = {};
						        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
						        __setModuleDefault(result, mod);
						        return result;
						    };
						})();
						(function (factory) {
						    {
						        var v = factory(createCommonjsRequire("/dist"), exports);
						        if (v !== undefined) module.exports = v;
						    }
						})(function (require, exports) {
						    Object.defineProperty(exports, "__esModule", { value: true });
						    exports.korUtil = void 0;
						    __exportStar(require("./kor-util.core"), exports);
						    const core = __importStar(require("./kor-util.core"));
						    __exportStar(require("./kor-util.syntax"), exports);
						    const syntax = __importStar(require("./kor-util.syntax"));
						    exports.korUtil = Object.assign(Object.assign({}, core), syntax);
						    exports.default = exports.korUtil;
						}); 
					} (korUtil$2, korUtil$2.exports));
					return korUtil$2.exports;
				}

				var korUtilExports = requireKorUtil();
				var korUtil = /*@__PURE__*/getDefaultExportFromCjs(korUtilExports);

				return korUtil;

			})); 
		} (korUtil$2));
		return korUtil$2.exports;
	}

	var korUtilExports = requireKorUtil();
	var korUtil = /*@__PURE__*/getDefaultExportFromCjs(korUtilExports);

	return korUtil;

}));
