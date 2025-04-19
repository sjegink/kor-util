import { expect, test } from 'vitest';
import korUtil from '../lib/kor-util';

// #region 0 Favorite


test('qwerty()', () => {
	expect(korUtil.qwerty("닭 쫓던 개X 지붕 쳐다본다.")).toBe("ekfr Whcejs roX wlqnd cuekqhsek.");
});

test('koreanify()', () => {
	expect(korUtil.koreanify("dlfgdjqjflrh Rkajrdms Svps?")).toBe("잃어버리고 까먹은 S펜?");
});


// #region 1 Phoneme

test('isKoreanPhoneme()', () => {
	expect(korUtil.isKoreanPhoneme("ㄱ")).toBe(true);
	expect(korUtil.isKoreanPhoneme("ㅏ")).toBe(true);
	expect(korUtil.isKoreanPhoneme("가")).toBe(false);
	expect(korUtil.isKoreanPhoneme("rk")).toBe(false); // (=="r")
	expect(korUtil.isKoreanPhoneme("rk", true)).toBe(true); // (=="ㄱ")
});

test('isConsonant()', () => {
	expect(korUtil.isConsonant("ㄱ")).toBe(true);
	expect(korUtil.isConsonant("ㅏ")).toBe(false);
	expect(korUtil.isConsonant("가")).toBe(false);
	expect(korUtil.isConsonant("rk")).toBe(false); // (=="r")
	expect(korUtil.isConsonant("rk", true)).toBe(true); // (=="ㄱ")
});

test('isFirstSound()', () => {
	expect(korUtil.isFirstSound("ㄸ")).toBe(true);
	expect(korUtil.isFirstSound("ㄶ")).toBe(false);
	expect(korUtil.isFirstSound("가")).toBe(false);
	expect(korUtil.isFirstSound("sw", true)).toBe(true);  // (=="ㄴ") 
});

test('isVowel()', () => {
	expect(korUtil.isVowel("ㄱ")).toBe(false);
	expect(korUtil.isVowel("ㅝ")).toBe(true);
	expect(korUtil.isVowel("iam", true)).toBe(true);  // (=="ㅑ") 
});

test('isLastSound()', () => {
	expect(korUtil.isLastSound("ㄲ")).toBe(true);
	expect(korUtil.isLastSound("ㄸ")).toBe(false);
	expect(korUtil.isLastSound("Ro", true)).toBe(true);  // (=="ㄲ") 
});

test('convertAlphabetToPhoneme()', () => {
	expect(korUtil.convertAlphabetToPhoneme("a")).toBe("ㅁ");
	expect(korUtil.convertAlphabetToPhoneme("FAIL")).toBe("FAIL");
	expect(korUtil.convertAlphabetToPhoneme("A", "FAIL")).toBe("FAIL");
	expect(korUtil.convertAlphabetToPhoneme("A", true)).toBe("ㅁ");
	expect(korUtil.convertAlphabetToPhoneme("가", "FAIL", true)).toBe("FAIL");
});

test('convertPhonemeToAlphabet()', () => {
	expect(korUtil.convertPhonemeToAlphabet("ㅞ")).toBe("np");
	expect(korUtil.convertPhonemeToAlphabet("FAIL")).toBe("FAIL");
	expect(korUtil.convertPhonemeToAlphabet("ㅏ긴문자열", "FAIL")).toBe("FAIL");
});

// #region 2 Char

test('isKoreanChar()', () => {
	expect(korUtil.isKoreanChar("가foo")).toBe(true);
	expect(korUtil.isKoreanChar("rk가")).toBe(false);
	expect(korUtil.isKoreanChar("ㅑ가")).toBe(false);
	expect(korUtil.isKoreanChar("字가")).toBe(false);
});

// #region 3 String

test('isKorean()', () => {
	expect(korUtil.isKorean("하늘")).toBe(true);
	expect(korUtil.isKorean("띄어쓴 문장")).toBe(false);
	expect(korUtil.isKorean("마침표.")).toBe(false);
	expect(korUtil.isKorean("알파벳A")).toBe(false);
});

test('indexOfKorean()', () => {
	expect(korUtil.indexOfKorean("012345")).toBe(-1)
	expect(korUtil.indexOfKorean("가ㅉ234")).toBe(0);
	expect(korUtil.indexOfKorean("0ㅉ234")).toBe(1);
});

test('indexOfKoreanChar()', () => {
	expect(korUtil.indexOfKoreanChar("012345")).toBe(-1);
	expect(korUtil.indexOfKoreanChar("0ㄱ짝34")).toBe(2);
});

test('indexOfKoreanPhoneme()', () => {
	expect(korUtil.indexOfKoreanPhoneme("012345")).toBe(-1);
	expect(korUtil.indexOfKoreanPhoneme("0가ㅉ34")).toBe(2);
});

test('hasLastSound()', () => {
	expect(korUtil.hasLastSound("나의 책상")).toBe(true);
	expect(korUtil.hasLastSound("무지개")).toBe(false);
	expect(korUtil.hasLastSound("twin")).toBe(false);
	expect(korUtil.hasLastSound("특문!")).toBe(false);
});