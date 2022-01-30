/**
	@name korUtil_syntax
	@author sjegink@gmail.com
	@version 0.1 on 2019-10-06
	한글 문맥 관련 라이브러리
**/
!(function(self){
	if(typeof exports!=='undefined'&&exports) Object.keys(self).map(function(k){exports[k]=self[k];})
	else if(typeof window!=='undefined'&&window) window.KorUtil = self;
	else if(typeof global!=='undefined'&&global) global.KorUtil = self;
	else console.error("GLOBAL OBJECT NOT FOUND");
})(function(MODULE_NAME){
	const self = (typeof KorUtil!='undefined') && KorUtil || {modules:{}};
    self.modules[MODULE_NAME] = true;
    setTimeout(function(){ if(!self.modules.core)throw new Error("KorUtil-"+MODULE_NAME+" needs KorUtil-core module."); },0);

	const POST_POSITION_MATCHES = [
		{ targets:['은(는)','는(은)'], conditions:0, replacements:["는","은"]},
		{ targets:['(이)는'], conditions:0, replacements:["는","이는"]},
		{ targets:['이(가)','가(이)'], conditions:0, replacements:["가","이"]},
		{ targets:['(이)가'], conditions:0, replacements:["가","이가"]},
		{ targets:['을(를)','를(을)'], conditions:0, replacements:["를","을"]},
		{ targets:['(이)를'], conditions:0, replacements:["를","이를"]},
		{ targets:['와(과)','과(와)'], conditions:0, replacements:["와","과"]},
		{ targets:['(이)와'], conditions:0, replacements:["와","이와"]},
		{ targets:['(이)라'], conditions:0, replacements:["라","이라"]},
		{ targets:['(으)로'], conditions:["","ㄹ"], replacements:["로","으로"]},
		{ targets:['율(률)',"률(율)"], conditions:["","ㄴ"], replacements:["율","률"]},
	];
	self.fixPostPositions = function(str){
		var ret="";
		for(loopLimit=100;loopLimit>=0;loopLimit--){
			let i, j, minIndex, postPositionMatch, target, lastSound;
			for(i=0; i<POST_POSITION_MATCHES.length; i++){
				let index;
				for(j=0; j<POST_POSITION_MATCHES[i].targets.length; j++){
					target = POST_POSITION_MATCHES[i].targets[j];
					index = str.indexOf(target);
					if(0<index){
						if(minIndex==null || index<minIndex){
							minIndex = index;
							postPositionMatch = POST_POSITION_MATCHES[i];
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
				str = str.substring(minIndex+target.length);
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
}("syntax"));