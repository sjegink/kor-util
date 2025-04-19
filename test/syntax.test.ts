import { expect, test } from 'vitest';
import korUtil from '../lib/kor-util';

test('fixPostPositions()', () => {

	expect(korUtil.fixPostPositions(
		`${'길동'}은(는) ${'어른'}(이)고, ${'희동'}(이)는 ${'어린이'}(이)다.`
	)).toBe(
		`길동은 어른이고, 희동이는 어린이다.`
	);

	expect(korUtil.fixPostPositions(`하늘가(이) 땅이(가)`
	)).toBe(
		`하늘가 땅이`
	);

	expect(korUtil.fixPostPositions(`${'확'}율(률) ${'할인'}률(율)`
	)).toBe(
		`확률 할인율`
	);
});