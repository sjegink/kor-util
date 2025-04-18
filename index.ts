export * from './lib/kor-util.core';
import * as core from './lib/kor-util.core';

export * from './lib/kor-util.syntax';
import * as syntax from './lib/kor-util.syntax';

const korUtil = Object.assign({}, core, syntax);
export default korUtil;