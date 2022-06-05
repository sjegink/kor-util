# kor-util

Utilities of Korean language ver 1.0

## Usage

> WEB: const KorUtil = window.KorUtil;
> Node: const KorUtil = require('korutil');

## References (Core)

### 음소 ; Phoneme

#### isKoreanPhoneme
* 주어진 문자가 한글 음소면 true를 반환합니다.
* 두번째 인수를 true로 지정할 경우, 자동으로 convertAlphabetToPhoneme처리를 해서 판단합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
* 완성된 한글은 음소가 아닙니다.
```javascript
KorUtil.isKoreanPhoneme("ㄱ"); // : true
KorUtil.isKoreanPhoneme("ㅏ"); // : true
KorUtil.isKoreanPhoneme("가"); // : false
KorUtil.isKoreanPhoneme("rk"); // (=="r") : false
KorUtil.isKoreanPhoneme("rk", true); // (=="ㄱ") : true
```
---

#### isConsonant
* 주어진 문자가 한글 자음이면 true를 반환합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
* 두번째 인수를 true로 지정할 경우, 자동으로 convertAlphabetToPhoneme처리를 해서 판단합니다.
```javascript
KorUtil.isConsonant("ㄱ"); // : true
KorUtil.isConsonant("ㅏ"); // : false
KorUtil.isConsonant("가"); // : false
KorUtil.isConsonant("rk"); // (=="r") : false
KorUtil.isConsonant("rk", true); // (=="ㄱ") : true
```
---

#### isFirstSound
* 주어진 문자가 한글 초성에 위치할 수 있는 음소면 true를 반환합니다.
* 두번째 인수를 true로 지정할 경우, 자동으로 convertAlphabetToPhoneme처리를 해서 판단합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
```javascript
KorUtil.isFirstSound("ㄸ"); // : true
KorUtil.isFirstSound("ㄶ"); // : false
KorUtil.isFirstSound("가"); // : false
KorUtil.isFirstSound("sw", true); // (=="ㄴ") : true
```
---

#### isMidSound
#### isVowel
* 주어진 문자가 모음 음소면 true를 반환합니다.
* 두번째 인수를 true로 지정할 경우, 자동으로 convertAlphabetToPhoneme처리를 해서 판단합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
```javascript
KorUtil.isVowel("ㄱ"); // : false
KorUtil.isVowel("ㅝ"); // : true
KorUtil.isVowel("iam", true); // (=="ㅑ므") : false
```
---

#### isLastSound
* 주어진 문자가 한글 받침에 위치할 수 있는 음소면 true를 반환합니다.
* 두번째 인수를 true로 지정할 경우, 자동으로 convertAlphabetToPhoneme처리를 해서 판단합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
```javascript
KorUtil.isLastSound("ㄲ"); // : true
KorUtil.isLastSound("ㄸ"); // : false
KorUtil.isLastSound("Ro", true); // (=="ㄲ") : true
```
---

#### convertAlphabetToPhoneme
* 주어진 영문 알파벳 문자를 한글 음소로 변환합니다.
* 변환에 실패했을 경우, 두 번째 인자에 string형을 지정했다면 그 값을, 아니면 원본 그대로를 반환합니다.
* 다음 인수를 true로 지정할 경우, 대문자를 소문자로 취급해서라도 변환합니다.
```javascript
KorUtil.convertAlphabetToPhoneme("a"); // : "ㅏ"
KorUtil.convertAlphabetToPhoneme("FAIL"); // : "FAIL"
KorUtil.convertAlphabetToPhoneme("A", "FAIL"); // : "FAIL"
KorUtil.convertAlphabetToPhoneme("A", true); // : "ㅏ"
KorUtil.convertAlphabetToPhoneme("가", "FAIL", true); // : "FAIL"
```
---

#### convertPhonemeToAlphabet
* 주어진 한글 음소를 영문 알파벳 문자로 변환합니다.
* 변환에 실패했을 경우, 두 번째 인자에 string형을 지정했다면 그 값을, 아니면 원본 그대로를 반환합니다.
* 완성된 한글은 음소가 아닙니다.
```javascript
KorUtil.convertPhonemeToAlphabet("ㅞ"); // : "np"
KorUtil.convertPhonemeToAlphabet("FAIL"); // : "FAIL"
KorUtil.convertPhonemeToAlphabet("ㅏ긴문자열", "FAIL"); // : "FAIL"
```
---

### 음절 ; Character

#### isKoreanChar
* 주어진 문자가 한글이면 true를 반환합니다.
* 여러 글자의 문자열이면 첫 글자만 보고 판단합니다.
```javascript
KorUtil.isKoreanChar("가foo"); // : true
KorUtil.isKoreanChar("rk가"); // : false
KorUtil.isKoreanChar("ㅑ가"); // : false
KorUtil.isKoreanChar("字가"); // : false
```
---

### 문장 ; String

#### isKorean
* 주어진 문자열이 모두 한글이면 true를 반환합니다.
```javascript
KorUtil.isKorean("하늘"); // : true
KorUtil.isKorean("띄어쓴 문장"); // : false
KorUtil.isKorean("마침표."); // : false
KorUtil.isKorean("알파벳A"); // : false
```
---

#### indexOfKorean
* 주어진 문자열에서 한글 음절이나 음소가 발견된 위치를 반환합니다.
* 발견되지 않은 경우 -1을 반환합니다.
```javascript
KorUtil.indexOfKorean("012345"); // : -1
KorUtil.indexOfKorean("가ㅉ234"); // : 0
KorUtil.indexOfKorean("0ㅉ234"); // : 1
```
---

#### indexOfKoreanChar
* 주어진 문자열에서 한글 음절이 처음으로 발견된 위치를 반환합니다.
* 발견되지 않은 경우 -1을 반환합니다.
```javascript
KorUtil.indexOfKoreanChar("012345"); // : -1
KorUtil.indexOfKoreanChar("0ㄱ짝34"); // : 2
```
---

#### indexOfKoreanPhoneme
* 주어진 문자열에서 한글 음소이 처음으로 발견된 위치를 반환합니다.
* 발견되지 않은 경우 -1을 반환합니다.
* 완성된 한글은 음소가 아닙니다.
```javascript
KorUtil.indexOfKoreanPhoneme("012345"); // : -1
KorUtil.indexOfKoreanPhoneme("0가ㅉ34"); // : 1
```
---

#### hasLastSound
* 주어진 문자의 마지막 글자가 받침이 있는 한글 음절이면 true를 반환합니다.
* 자음 음소는 음절이 아닙니다.
```javascript
KorUtil.hasLastSound("나의 책상"); // : true
KorUtil.hasLastSound("무지개"); // : false
KorUtil.hasLastSound("twin"); // : false
KorUtil.hasLastSound("특문!"); // : false
```
---

#### qwerty
* 입력된 문자열을, 한글2벌식 자판으로 인식하여 영문qwerty 자판으로 변환합니다.
```javascript
KorUtil.qwerty("닭 쫓던 개X 지붕 쳐다본다."); // : ekfr Whcejs roX wlqnd cuekqhsek.
```

#### koreanify
* 입력된 문자열을, 영문qwerty 자판으로 인식하여 한글2벌식 자판으로 변환합니다.
```javascript
KorUtil.koreanify("dlfgdjqjflrh Rkajrdms Svps?"); // : 잃어버리고 까먹은 S펜?
```

## References (Syntax)

### 문법 ; Grammar

#### fixPostPositions
* 받침 상태에 따라 달라지는 조사를 확정시켜줍니다.
* 원본에서는 "은(는)" 또는 "는(은)"으로 표시할 수 있습니다.
* 그러나 "이(가)"는 되지만 "가(이)"는 허용되지 않습니다.
* "(이)와" "(이)는" "(이)고" 등의 용법을 위해서입니다.
```javascript
KorUtil.fixPostPositions(`${'길동'}은(는) ${'어른'}(이)고, ${'희동'}(이)는 ${'어린이'}(이)다.`); // 길동은 어른이고, 희동이는 어린이다.
KorUtil.fixPostPositions(`하늘가(이) 땅이(가)`); // 하늘가 땅이
KorUtil.fixPostPositions(`${'확'}율(률) ${'할인'}률(율)`); // 확률 할인율
```