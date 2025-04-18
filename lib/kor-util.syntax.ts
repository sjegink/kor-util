/*
 * 한글 문맥 관련 라이브러리
 * @name korUtil_syntax
 * @author sjegink <sjegink@gmail.com>
 * @version 1.3 on 2024-04-18
 */

import { isConsonant, isKoreanChar, split } from "./kor-util.core";

// #region Public

/**
 * ## fixPostPosition
 * 받침 상태에 따라 달라지는 조사를 확정.
 * @param str 조사(이)가 불분명한 문자열
 * @param options
 * @param options.loopLimit 검사 실행수 제한(기본값=100)
 */
export function fixPostPositions(str: string, options: {
	loopLimit?: number,
} = {}): string {
	let returnValue = "";
	for (let loopLimit = options.loopLimit ?? 100; loopLimit >= 0; loopLimit--) {
		let minIndex: number | undefined;
		let postPositionMatch: PostPositionMatch | undefined;
		let [target, foundTarget, lastSound] = new Array<string | undefined>();
		// 변환이 필요한 부분 찾기
		for (let i = 0; i < POST_POSITION_MATCHES.length; i++) {
			let index: number;
			for (let j = 0; j < POST_POSITION_MATCHES[i].targets.length; j++) {
				target = POST_POSITION_MATCHES[i].targets[j];
				index = str.indexOf(target);
				if (0 < index) {
					if (minIndex === undefined || index < minIndex) {
						minIndex = index;
						postPositionMatch = POST_POSITION_MATCHES[i];
						foundTarget = postPositionMatch.targets[j]
					}
				}
			};
		}
		// 변환 작업
		if (postPositionMatch && minIndex && foundTarget) {
			let conditions = postPositionMatch.conditions ?? [''];
			returnValue += str.substring(0, minIndex);
			lastSound = returnValue.substring(returnValue.length - 1);
			lastSound = isKoreanChar(lastSound) ? split(lastSound).charAt(2) : isConsonant(lastSound) ? lastSound : '';
			returnValue += postPositionMatch.replacements[conditions.includes(lastSound) ? 0 : 1];
			str = str.substring(minIndex + foundTarget.length);
			continue;
		} else {
			break;
		}
	}
	returnValue += str;
	return returnValue;
}

const POST_POSITION_MATCHES: PostPositionMatch[] = [
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
		targets: ['(이)'], // 희동(이)야, (이)다, (이)며, (이)고, (이)라서,
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

type PostPositionMatch = {
	/** 조사 변환이 필요하다고 감지할 단서(텍스트)들. */
	targets: string[];
	/** 앞단어의 받침을 비교하여 참/거짓을 판단하기 위한 받침 후보 목록. 기본값은 받침없음("")만 참으로 등록. */
	conditions?: Array<string> | undefined;
	/** 조사 변환의 결과물 후보. conditions 조건에 부합(참)할 경우 [0]값, 아닌 경우 [1]값이 됨. */
	replacements: [string, string];
}