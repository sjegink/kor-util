# kor-util

Utilities of Korean language ver 1.3.2

## Usage

- Using Node.js (ESM)
```javascript
	import korUtil, { qwerty } from 'kor-util';
	
	let end = qwerty("둥");
	let right = korUtil.qwerty("꺄홋");
	let sun = korUtil.koreanify("go");
```
- Browser
```html
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/kor-util/dist/kor-util.js"></script>
	<script type="text/javascript">
		let curry = korUtil.qwerty("쳑교");
		let luck = korUtil.koreanify("dns");
	</script>
```

## References (Core)

### 음소 ; Phoneme

#### isKoreanPhoneme
* 주어진 문자가 한글 음소면 `true`를 반환합니다.
* 두번째 인수를 `true`로 지정할 경우, 자동으로 `convertAlphabetToPhoneme`처리를 해서 판단합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
* 완성된 한글은 음소가 아닙니다.
```javascript
korUtil.isKoreanPhoneme("ㄱ"); // : true
korUtil.isKoreanPhoneme("ㅏ"); // : true
korUtil.isKoreanPhoneme("가"); // : false
korUtil.isKoreanPhoneme("rk"); // (=="r") : false
korUtil.isKoreanPhoneme("rk", true); // (=="ㄱ") : true
```
---

#### isConsonant
* 주어진 문자가 한글 자음이면 `true`를 반환합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
* 두번째 인수를 `true`로 지정할 경우, 자동으로 `convertAlphabetToPhoneme`처리를 해서 판단합니다.
```javascript
korUtil.isConsonant("ㄱ"); // : true
korUtil.isConsonant("ㅏ"); // : false
korUtil.isConsonant("가"); // : false
korUtil.isConsonant("rk"); // (=="r") : false
korUtil.isConsonant("rk", true); // (=="ㄱ") : true
```
---

#### isFirstSound
* 주어진 문자가 한글 초성에 위치할 수 있는 음소면 `true`를 반환합니다.
* 두번째 인수를 `true`로 지정할 경우, 자동으로 `convertAlphabetToPhoneme`처리를 해서 판단합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
```javascript
korUtil.isFirstSound("ㄸ"); // : true
korUtil.isFirstSound("ㄶ"); // : false
korUtil.isFirstSound("가"); // : false
korUtil.isFirstSound("sw", true); // (=="ㄴ") : true
```
---

#### isMidSound
#### isVowel
* 주어진 문자가 모음 음소면 `true`를 반환합니다.
* 두번째 인수를 `true`로 지정할 경우, 자동으로 `convertAlphabetToPhoneme`처리를 해서 판단합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
```javascript
korUtil.isVowel("ㄱ"); // : false
korUtil.isVowel("ㅝ"); // : true
korUtil.isVowel("iam", true); // (=="ㅑ므") : false
```
---

#### isLastSound
* 주어진 문자가 한글 받침에 위치할 수 있는 음소면 `true`를 반환합니다.
* 두번째 인수를 `true`로 지정할 경우, 자동으로 `convertAlphabetToPhoneme`처리를 해서 판단합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
```javascript
korUtil.isLastSound("ㄲ"); // : true
korUtil.isLastSound("ㄸ"); // : false
korUtil.isLastSound("Ro", true); // (=="ㄲ") : true
```
---

#### convertAlphabetToPhoneme
* 주어진 영문 알파벳 문자를 한글 음소로 변환합니다.
* 변환에 실패했을 경우, 두 번째 인자에 `string`형을 지정했다면 그 값을, 아니면 원본 그대로를 반환합니다.
* 다음 인수를 `true`로 지정할 경우, 대문자를 소문자로 취급해서라도 변환합니다.
```javascript
korUtil.convertAlphabetToPhoneme("a"); // : "ㅁ"
korUtil.convertAlphabetToPhoneme("FAIL"); // : "FAIL"
korUtil.convertAlphabetToPhoneme("A", "FAIL"); // : "FAIL"
korUtil.convertAlphabetToPhoneme("A", true); // : "ㅁ"
korUtil.convertAlphabetToPhoneme("가", "FAIL", true); // : "FAIL"
```
---

#### convertPhonemeToAlphabet
* 주어진 한글 음소를 영문 알파벳 문자로 변환합니다.
* 변환에 실패했을 경우, 두 번째 인자에 `string`형을 지정했다면 그 값을, 아니면 원본 그대로를 반환합니다.
* 완성된 한글은 음소가 아니므로, qwerty()를 사용해야 합니다.
```javascript
korUtil.convertPhonemeToAlphabet("ㅞ"); // : "np"
korUtil.convertPhonemeToAlphabet("FAIL"); // : "FAIL"
korUtil.convertPhonemeToAlphabet("ㅏ긴문자열", "FAIL"); // : "FAIL"
```
---

### 음절 ; Character

#### isKoreanChar
* 주어진 문자가 한글이면 `true`를 반환합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
```javascript
korUtil.isKoreanChar("가foo"); // : true
korUtil.isKoreanChar("rk가"); // : false
korUtil.isKoreanChar("ㅑ가"); // : false
korUtil.isKoreanChar("字가"); // : false
```
---

#### hasLastSound
* 주어진 문자의 마지막 글자가 받침이 있는 한글 음절이면 `true`를 반환합니다.
* 자음 음소는 음절이 아닙니다.
```javascript
korUtil.hasLastSound("개"); // : false
korUtil.hasLastSound("나의 책상"); // : true
korUtil.hasLastSound("twin"); // : false
korUtil.hasLastSound("특문!"); // : false
```
---

#### hasLastSound
* 주어진 문자의 마지막 글자가 받침이 있는 한글 음절이면 `true`를 반환합니다.
* 자음 음소는 음절이 아닙니다.
```javascript
KorUtil.hasLastSound("개"); // : false
KorUtil.hasLastSound("나의 책상"); // : true
KorUtil.hasLastSound("twin"); // : false
KorUtil.hasLastSound("특문!"); // : false
```
---

### 문장 ; String

#### isKorean
* 주어진 문자열이 모두 한글이면 `true`를 반환합니다.
```javascript
korUtil.isKorean("하늘"); // : true
korUtil.isKorean("띄어쓴 문장"); // : false
korUtil.isKorean("마침표."); // : false
korUtil.isKorean("알파벳A"); // : false
```
---

#### indexOfKorean
* 주어진 문자열에서 한글 음절이나 음소가 발견된 위치를 반환합니다.
* 발견되지 않은 경우 `-1`을 반환합니다.
```javascript
korUtil.indexOfKorean("012345"); // : -1
korUtil.indexOfKorean("가ㅉ234"); // : 0
korUtil.indexOfKorean("0ㅉ234"); // : 1
```
---

#### indexOfKoreanChar
* 주어진 문자열에서 한글 음절이 처음으로 발견된 위치를 반환합니다.
* 발견되지 않은 경우 `-1`을 반환합니다.
```javascript
korUtil.indexOfKoreanChar("012345"); // : -1
korUtil.indexOfKoreanChar("0ㄱ짝34"); // : 2
```
---

#### indexOfKoreanPhoneme
* 주어진 문자열에서 한글 음소가 처음으로 발견된 위치를 반환합니다.
* 발견되지 않은 경우 `-1`을 반환합니다.
* 완성된 한글은 음소가 아닙니다.
```javascript
korUtil.indexOfKoreanPhoneme("012345"); // : -1
korUtil.indexOfKoreanPhoneme("0가ㅉ34"); // : 2
```
---

#### qwerty
* 입력된 문자열을 한글2벌식 자판으로 인식하여, 영문qwerty 자판으로 변환합니다.
```javascript
korUtil.qwerty("닭 쫓던 개X 지붕 쳐다본다."); // : ekfr Whcejs roX wlqnd cuekqhsek.
```
---

#### koreanify
* 입력된 문자열을 영문qwerty 자판으로 인식하여, 한글2벌식 자판으로 변환합니다.
```javascript
korUtil.koreanify("dlfgdjqjflrh Rkajrdms Svps?"); // : 잃어버리고 까먹은 S펜?
```

## References (Syntax)

### 문법 ; Grammar

#### fixPostPositions
* 받침 상태에 따라 달라지는 조사를 확정시켜줍니다.
* 원본에서는 `"은(는)"` 또는 `"는(은)"`으로 표시할 수 있습니다.
* 그러나 `"이(가)"`는 되지만 `"가(이)"`는 허용되지 않습니다. `"(이)와"` `"(이)는"` `"(이)고"` 등의 용법을 위해서입니다.
```javascript
korUtil.fixPostPositions(`${'길동'}은(는) ${'어른'}(이)고, ${'희동'}(이)는 ${'어린이'}(이)다.`); // 길동은 어른이고, 희동이는 어린이다.
korUtil.fixPostPositions(`하늘가(이) 땅이(가)`); // 하늘가 땅이
korUtil.fixPostPositions(`${'확'}율(률) ${'할인'}률(율)`); // 확률 할인율
```