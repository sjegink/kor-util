/**
 * 한글 문맥 관련 라이브러리
 * @name korUtil_syntax
 * @author sjegink <sjegink@gmail.com>
 * @version 1.2 on 2022-06-05
 */
!(function(init){
	try{
		if(window.document instanceof (window.HTMLDocument||window.Document)){
			init(window.KorUtil||(window.KorUtil={}));
		}
	}catch(e){}
	try{
		if(module&&module.exports) module.exports = self=>init(self);
	}catch(e){}
})(function(self){

	const POST_POSITION_MATCHES = [
		{ targets:['은(는)','는(은)'], conditions:0, replacements:["는","은"]},
		{ targets:['이(가)'], conditions:0, replacements:["가","이"]},
		{ targets:['을(를)','를(을)'], conditions:0, replacements:["를","을"]},
		{ targets:['와(과)','과(와)'], conditions:0, replacements:["와","과"]},
		{ targets:['(이)'], conditions:0, replacements:["","이"]},
		{ targets:['(으)로'], conditions:["","ㄹ"], replacements:["로","으로"]},
		{ targets:['율(률)',"률(율)"], conditions:["","ㄴ"], replacements:["율","률"]},
	];
	self.fixPostPositions = function(str){
		var ret="";
		for(loopLimit=100;loopLimit>=0;loopLimit--){
			let i, j, minIndex, postPositionMatch, target, foundTarget, lastSound;
			for(i=0; i<POST_POSITION_MATCHES.length; i++){
				let index;
				for(j=0; j<POST_POSITION_MATCHES[i].targets.length; j++){
					target = POST_POSITION_MATCHES[i].targets[j];
					index = str.indexOf(target);
					if(0<index){
						if(minIndex==null || index<minIndex){
							minIndex = index;
							postPositionMatch = POST_POSITION_MATCHES[i];
							foundTarget = postPositionMatch.targets[j]
						}
					}
				};
			}
			if(minIndex){
				let conditions = postPositionMatch.conditions || [""];
				ret += str.substring(0,minIndex);
				lastSound = ret.substring(ret.length-1);
				lastSound = self.isKoreanChar(lastSound)? self.split(lastSound)[2] : KorUtil.isConsonant(self) ? lastSound : null;
				ret += postPositionMatch.replacements[conditions.includes(lastSound||"")?0:1];
				str = str.substring(minIndex+foundTarget.length);
				continue;
			}else{
				break;
			}
		}
		ret += str;
		return ret;
	}

	// =========================================================================
	return self;
});
