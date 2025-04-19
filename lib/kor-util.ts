export * from './kor-util.core';
import * as core from './kor-util.core';

export * from './kor-util.syntax';
import * as syntax from './kor-util.syntax';

export const korUtil = { ...core, ...syntax };
export default korUtil;