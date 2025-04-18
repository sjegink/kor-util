/*
 * 한글 관련 처리 라이브러리
 * @name korUtil_core
 * @author sjegink <sjegink@gmail.com>
 * @version 1.3 on 2025-04-17
 */



// #region 1 음소(;Phoneme)

/**
 * ## isKoreanPhoneme
 * 문자열의 첫 글자가 조합되지 않은 음소인 경우 true.
 * @param char 음소 하나를 받습니다. 문자열인 경우 첫글자만 판단.
 * @param autoConv 주어진 char값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
 **/
export function isKoreanPhoneme(char: string, autoConv?: boolean): boolean {
	char = char.charAt(0);
	return /^[\u3131-\u3163]/.test(char)
		|| autoConv && !!(INDEXING_ARRAY__KO_PHONEME.includes(char))
		|| false;
}

/**
 * ## isConsonant
 * 문자열의 첫 글자가 자음이면 true.
 * @param char 음소 하나를 밭습니다. 문자열인 경우 첫글자만 판단.
 * @param autoConv 주어진 char값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
 **/
export function isConsonant(char: string, autoConv?: boolean): boolean {
	char = char.charAt(0);
	return /^[\u3131-\u314e]/.test(char)
		|| autoConv && !!INDEXING_ARRAY__KO_CONSONANT.includes(char)
		|| false;
}

/**
 * ## isFirstSound
 * 자음이면서 초성에 위치할 수 있는 자음이면 true.
 * @param char 음소 하나를 밭습니다. 문자열인 경우 첫글자만 판단.
 * @param autoConv 주어진 char값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
 **/
export function isFirstSound(char: string, autoConv?: boolean): boolean {
	char = char.charAt(0);
	return autoConv && !!(1 + INDEXING_ARRAY__KO_CONSONANT.indexOf(char.charAt(0)))
		|| !!INDEXING_ARRAY__KO_CONSONANT.includes(_convertPhonemeToAlphabet(char.charAt(0)))
		|| false;
}

/**
 * ## isVowel
 * 모음이면 true.
 * @param char 음소 하나를 밭습니다. 문자열인 경우 첫글자만 판단.
 * @param autoConv 주어진 char값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
 **/
export function isVowel(char: string, autoConv?: boolean): boolean {
	char = char.charAt(0);
	return /^[\u314f-\u3163]/.test(char)
		|| autoConv && CHAR_COUNT__KO_CONSONANT <= INDEXING_ARRAY__KO_PHONEME.indexOf(char)
		|| false;
}

/**
 * ## isLastSound
 * 자음이면서 종성에 위치할 수 있는 자음이면 true.
 * @param char 음소 하나를 밭습니다. 문자열인 경우 첫글자만 판단.
 * @param autoConv 주어진 phon값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
 **/
export function isLastSound(char: string, autoConv?: boolean): boolean {
	char = char.charAt(0);
	return autoConv && !!(1 + INDEXING_ARRAY__KO_LAST_SOUND.indexOf(char))
		|| !!(1 + INDEXING_ARRAY__KO_LAST_SOUND.indexOf(_convertPhonemeToAlphabet(char)))
		|| false;
}

/**
 * ## convertAlphabetToPhoneme
 * 주어진 영문 알파벳 문자를 한글 음소로 변환.
 * @param char 영문 알파벳 문자
 * @param defaultValue 변환에 실패했을 때 반환할 기본값. 지정하지 않으면 원본 char 그대로.
 * @param caseInsencitive 대소문자 변환 상태에 대해서도 검사. 기본값=false
 **/
export function convertAlphabetToPhoneme(char: string, defaultValue?: string, caseInsencitive?: boolean): string;
export function convertAlphabetToPhoneme(char: string, caseInsencitive?: boolean): string;
export function convertAlphabetToPhoneme(char: string, arg2?: string | boolean, caseInsencitive?: boolean): string {
	let defaultValue: string | undefined;
	if (typeof arg2 === 'boolean') {
		caseInsencitive = arg2;
		defaultValue = undefined;
	} else {
		defaultValue = arg2;
	}
	if (INDEXING_ARRAY__KO_PHONEME.includes(char)) {
		return _convertAlphabetToPhoneme(char);
	}
	if (caseInsencitive && /^[A-Z]/.test(char))
		if (INDEXING_ARRAY__KO_PHONEME.includes(char.toLowerCase()))
			return _convertAlphabetToPhoneme(char.toLowerCase());
	return defaultValue ?? char;
}

/**
 * ## convertPhonemeToAlphabet
 * 주어진 한글 음소를 영문 알파벳 문자로 변환.
 * @param char 한글 음소 문자
 * @param defaultValue 변환에 실패했을 때 반환할 기본값. 지정하지 않으면 원본 char 그대로.
 **/
export function convertPhonemeToAlphabet(char: string, defaultValue?: string): string {
	return /^[\u3131-\u3163]$/i.test(char) ?
		_convertPhonemeToAlphabet(char) :
		defaultValue ?? char;
}



//	#region 2 음절(;Char)

/**
 * ## isKoreanChar
 * 조합된 정상적인 한글인 경우 true.
 * @param char 문자 하나를 받습니다. 여러 글자인 경우 무조건 맨 앞 자만 봅니다.
 **/
export function isKoreanChar(char: string): boolean {
	return /^[\uac00-\ud7a3]/.test(char);
}



// #region 3 문장(;String)

/**
 * ## isKorean
 * 입력된 모든 문자가 한글 문자인 경우 true.
 * @param str 문자열을 받습니다.
 **/
export function isKorean(str: string): boolean {
	return /^[\u3131-\u3163\uac00-\ud7a3]+$/.test(str);
}

/**
 * ## indexOfKorean
 * 주어진 문자열에서 한글 음절이나 음소가 발견된 위치를 반환.
 * @param str 문자열을 받습니다.
 **/
export function indexOfKorean(str: string): number {
	var m = str.match(/[\u3131-\u3163\uac00-\ud7a3]/);
	return (m && m.index) ?? -1;
}

/**
 * ## indexOfKoreanChar
 * 주어진 문자열에서 한글 음절이 처음으로 발견된 위치를 반환.
 * @param str 문자열을 받습니다.
 **/
export function indexOfKoreanChar(str: string): number {
	var m = str.match(/[\uac00-\ud7a3]/);
	return (m && m.index) ?? -1;
}

/**
 * ## indexOfKoreanPhoneme
 * 주어진 문자열에서 한글 음소가 처음으로 발견된 위치를 반환.
 * @param str 문자열을 받습니다.
 **/
export function indexOfKoreanPhoneme(str: string): number {
	var m = str.match(/[\u3131-\u3163]/);
	return (m && m.index) ?? -1;
}

/** 
 * ## hasLastSound
 * 주어진 문자의 마지막 글자가 받침이 있는 한글 음절이면 true를 반환.
 * @param str 한글이 들어있을 것으로 추정되는 부분
 **/
export function hasLastSound(str: string): boolean {
	const c = str.slice(-1).charCodeAt(0) || 0;
	if (c < CHAR_CODE_AT_KO_CHAR_BEGIN)
		return false;
	if (c >= CHAR_CODE_AT_KO_CHAR_BEGIN + CHAR_COUNT__KO_CHAR)
		return false;
	const indexInKo = c - CHAR_CODE_AT_KO_CHAR_BEGIN;
	return indexInKo % CHAR_COUNT_PER_KO_MID_SOUND > 0;
}

/**
 * ## koreanify
 * 입력된 문자열을, 영문qwerty 자판으로 인식하여 한글2벌식 자판으로 변환.
 * @param {sng}str 영문이 들어있는 문자열
 **/
export function koreanify(str: string): string {
	return _convertAlphabetsToKorean(str);
}

/**
 * ## qwerty
 * 입력된 문자열을 한글2벌식 자판으로 인식하여, 영문qwerty 자판으로 변환.
 * @param str 한글이 들어있는 문자열
 **/
export function qwerty(str: string): string {
	return split(str).split("").map(function (c) {
		if (isKoreanChar(c))
			return split(c).split("").map(c => qwerty(c)).join("");
		if (isKoreanPhoneme(c))
			return INDEXING_ARRAY__KO_PHONEME[c.charCodeAt(0) - CHAR_CODE_AT_KO_PHONEME_BEGIN];
		return c;
	}).join("");
}

/**
 * ## split
 * 한글을 초성 중성 종성으로 분리된 문자열로 분해. (겹자음/겹모음은 유지)
 * @param str 완성형 한글이 들어있는 문자열
 **/
export function split(str: string): string {
	return str.split("").map((ch) => {
		if (!isKoreanChar(ch)) return ch;
		let a = ["", "", ""], n = ch.charCodeAt(0) - CHAR_CODE_AT_KO_CHAR_BEGIN, m: number;
		// get LastSound
		m = n % CHAR_COUNT_PER_KO_MID_SOUND;
		a[2] = INDEXING_ARRAY__KO_LAST_SOUND[m];
		a[2] = a[2] && String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(a[2]))
			|| "";
		// get MidSound
		m = n % CHAR_COUNT_PER_KO_FIRST_SOUND;
		m = Math.floor(m / CHAR_COUNT_PER_KO_MID_SOUND);
		a[1] = String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + CHAR_COUNT__KO_CONSONANT + m);
		// get FirstSound
		m = Math.floor(n / CHAR_COUNT_PER_KO_FIRST_SOUND);
		a[0] = INDEXING_ARRAY__KO_CONSONANT[m];
		a[0] = String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(a[0]));
		//
		return a.join("");
	}).join("");
}

/**
 * ## spread
 * 한글이 모두 글쇠 단위로 분리된 문자열 (겹자음/겹모음은 분해되고, 쌍자음은 유지)
 * @param str 완성형 한글 또는 겹자음/겹모음이 포함된 문자열
 **/
export function spread(str: string): string {
	return str.split("").map((ch) => {
		if (!isKorean(ch)) return ch;
		return qwerty(ch).split("").map(c =>
			_convertAlphabetToPhoneme(c)
		).join("");
	}).join("");
}

/**
 * ## compress
 * 분해된 한글 음소들을 합쳐서, 완성형 한글 문자열로 변환.
 * @param str 한글 음소 문자가 들어있는 문자열
 **/
export function compress(str: string): string {
	return _convertAlphabetsToKorean(str.split("").map(c =>
		isKoreanPhoneme(c) ? _convertPhonemeToAlphabet(c) : c
	).join(""));
}

// #region _ Private...

/** 영문을 하나씩 살피면서 완성형 한글로 합쳐지겠다 싶으면 합치는 핵심 소스 */
function _convertAlphabetsToKorean(raw: string) {
	function _compress(firstSoundIndex?: number, midSoundIndex?: number, lastSoundIndex?: number): string;
	function _compress(f?: number, m?: number, l?: number): string {
		if (f == null) {
			return m == null
				? ""
				: String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + CHAR_COUNT__KO_CONSONANT + m);
		}
		if (m == null) {
			return String.fromCharCode(
				CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(INDEXING_ARRAY__KO_CONSONANT[f])
			);
		}
		let n = CHAR_CODE_AT_KO_CHAR_BEGIN;
		n += f * CHAR_COUNT_PER_KO_FIRST_SOUND;
		n += m * CHAR_COUNT_PER_KO_MID_SOUND;
		n += l ?? 0;
		return String.fromCharCode(n);
	}
	if (!raw) return "";
	let returnValue = "";
	let arrCode = new Array<number>();
	for (var i = 0; i < raw.length; i++) {
		const char: string = raw.charAt(i);
		const char2: string = `${char}${i < raw.length - 1
			? raw.charAt(i + 1)
			: "_"}`;
		const char3: string = i < raw.length - 2
			? raw.charAt(i + 2)
			: "_";
		if (arrCode.length != 1 && isVowel(char, true)) {
			if (1 < arrCode.length) { }
			else {
				if (isVowel(char2, true)) {
					++i;
					returnValue += _compress(undefined, _convertPhonemeToMidSoundIndex(char2));
				}
				else returnValue += _compress(undefined, _convertPhonemeToMidSoundIndex(char));
				continue;
			}
		} else switch (arrCode.length) {
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
				} else
					if (isLastSound(char, true) && !isVowel(char2[1], true)) {
						arrCode.push(_convertPhonemeToLastSoundIndex(char));
					}
				if (arrCode.length > 2) ++i;
				break;
		}
		if (arrCode.length) {
			returnValue += _compress(...arrCode);
			arrCode = [];
			i--;
		} else returnValue += char;
	}
	return returnValue + _compress(...arrCode);
}

/** 알파벳 문자를 한글 음소로 변환 */
function _convertAlphabetToPhoneme(char: string) {
	return String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(char));
}
/** 한글 음소를 알파벳 문자로 변환 */
function _convertPhonemeToAlphabet(char: string) {
	return INDEXING_ARRAY__KO_PHONEME[char.charCodeAt(0) - CHAR_CODE_AT_KO_PHONEME_BEGIN];
}
/** 주어진 음소가 초성으로서 몇 번째 순번인지, 초성으로 볼 수 없다면 -1를 반환 */
function _convertPhonemeToFirstSoundIndex(phon: string) {
	return INDEXING_ARRAY__KO_CONSONANT.indexOf(phon);
}
/** 주어진 음소가 중성으로서 몇 번째 순번인지, 중성으로 볼 수 없다면 -1를 반환 */
function _convertPhonemeToMidSoundIndex(phon: string) {
	var i = INDEXING_ARRAY__KO_PHONEME.indexOf(phon) - CHAR_COUNT__KO_CONSONANT;
	return i < 0 ? -1 : i;
}
/** 주어진 음소가 종성으로서 몇 번째 순번인지, 종성으로 볼 수 없다면 -1를 반환 */
function _convertPhonemeToLastSoundIndex(phon: string) {
	return INDEXING_ARRAY__KO_LAST_SOUND.indexOf(phon);
}

// 상수 모음

const CHAR_CODE_AT_KO_CHAR_BEGIN = 0xAC00;
const CHAR_COUNT__KO_CHAR = 0x2BA4;
const CHAR_COUNT_PER_KO_MID_SOUND = 0x001C;
const CHAR_COUNT_PER_KO_FIRST_SOUND = 0x024C;
const getCharCodeAtKoreanCharBegin = function () { return CHAR_CODE_AT_KO_CHAR_BEGIN; };
const getKoreanCharCount = function () { return CHAR_COUNT__KO_CHAR; };
const getKoreanCharCountPerFirstSound = function () { return CHAR_COUNT_PER_KO_FIRST_SOUND; };
const getKoreanCharCountPerMidSound = function () { return CHAR_COUNT_PER_KO_MID_SOUND; };

const CHAR_CODE_AT_KO_PHONEME_BEGIN = 0x3131;
const CHAR_COUNT__KO_CONSONANT = 0x001E;
const CHAR_COUNT__KO_VOWEL = 0x0015;
const getCharCodeAtKoreanPhonemeBegin = function () { return CHAR_CODE_AT_KO_PHONEME_BEGIN; };
const getKoreanConsonantCount = function () { return CHAR_COUNT__KO_CONSONANT; };
const getKoreanVowelCount = function () { return CHAR_COUNT__KO_VOWEL; };

const INDEXING_ARRAY__KO_PHONEME = ["r", "R", "rt", "s", "sw", "sg", "e", "E", "f", "fr", "fa", "fq", "ft", "fx", "fv", "fg", "a", "q", "Q", "qt", "t", "T", "d", "w", "W", "c", "z", "x", "v", "g", "k", "o", "i", "O", "j", "p", "u", "P", "h", "hk", "ho", "hl", "y", "n", "nj", "np", "nl", "b", "m", "ml", "l"];
const INDEXING_ARRAY__KO_CONSONANT = ["r", "R", "s", "e", "E", "f", "a", "q", "Q", "t", "T", "d", "w", "W", "c", "z", "x", "v", "g"];
const INDEXING_ARRAY__KO_LAST_SOUND = ["", "r", "R", "rt", "s", "sw", "sg", "e", "f", "fr", "fa", "fq", "ft", "fx", "fv", "fg", "a", "q", "qt", "t", "T", "d", "w", "c", "z", "x", "v", "g"];