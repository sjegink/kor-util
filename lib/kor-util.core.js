/**
	@name korUtil_core
	@author sjegink@gmail.com
	@version 1.0 on 2019-10-06
	한글 관련 처리 라이브러리
**/
!(function(self){
	if(typeof exports!=='undefined'&&exports) Object.keys(self).map(function(k){exports[k]=self[k];})
	else if(typeof window!=='undefined'&&window) window.KorUtil = self;
	else console.error("GLOBAL OBJECT NOT FOUND");
})(function(MODULE_NAME){
	const self = (typeof KorUtil!='undefined') && KorUtil || {modules:{}};
    self.modules[MODULE_NAME] = true;

	self._test=function(str){
	};;

	//	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩
	;
	// # 1
	// 음소(Phon) 처리 (;Phoneme)
	;
	//	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩

	/**
		@param {string}phon 음소 하나를 받습니다. 문자열인 경우 첫글자만 판단.
		@param {boolean}autoConv 주어진 phon값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
		@return 문자열의 첫 글자가 조합되지 않은 음소인 경우 true
		//TODO
	**/
	self.isKoreanPhoneme = function(char,autoConv){
		char = (char!=null ? String(char) : char)[0];
		return /^[\u3131-\u3163]/.test(char)
			|| autoConv && !!(INDEXING_ARRAY__KO_PHONEME.indexOf(char))
			|| false;
	};

	/**
		@param {string}char 음소 하나를 밭습니다. 문자열인 경우 첫글자만 판단.
		@param {boolean}autoConv 주어진 phon값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
		@true 문자열의 첫 글자가 자음이면 true
	**/
	self.isConsonant = function(char,autoConv){
		char = (char!=null ? String(char) : char)[0];
		return /^[\u3131-\u314e]/.test(char)
			|| autoConv && !!(1+INDEXING_ARRAY__KO_CONSONANT.indexOf(char))
			|| false;
	};

	/**
		@param {string}char 음소 하나를 밭습니다. 문자열인 경우 첫글자만 판단.
		@param {boolean}autoConv 주어진 phon값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
		@true 자음이면서 초성에 위치할 수 있는 자음이면 true
	**/
	self.isFirstSound = function(char,autoConv){
		char = (char!=null ? String(char) : char)[0];
		return autoConv && !!(1+INDEXING_ARRAY__KO_CONSONANT.indexOf(char))
			|| !!(1+INDEXING_ARRAY__KO_CONSONANT.indexOf(_convertPhonemeToAlphabet(char)))
			|| false;
	};

	/**
		@param {string}char 음소 하나를 밭습니다. 문자열인 경우 첫글자만 판단.
		@param {boolean}autoConv 주어진 phon값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
		@true 모음이면 true
	**/
	self.isVowel=self.isMidSound = function(char,autoConv){
		char = (char!=null ? String(char) : char)[0];
		var n=char.charCodeAt(0);
		return /^[\u314f-\u3163]/.test(char)
			|| autoConv && CHAR_COUNT__KO_CONSONANT<=INDEXING_ARRAY__KO_PHONEME.indexOf(char.substring(0,1))
			|| false;
	};

	/**
		@param {string}char 음소 하나를 밭습니다. 문자열인 경우 첫글자만 판단.
		@param {boolean}autoConv 주어진 phon값이 영문 알파벳인 경우 2벌식으로 자동변환하여 인식할지 여부.
		@true 자음이면서 종성에 위치할 수 있는 자음이면 true
	**/
	self.isLastSound = function(char,autoConv){
		char = (char!=null ? String(char) : char)[0];
		return autoConv && !!(1+INDEXING_ARRAY__KO_LAST_SOUND.indexOf(char))
			|| !!(1+INDEXING_ARRAY__KO_LAST_SOUND.indexOf(_convertPhonemeToAlphabet(char)))
			|| false;
	};

	/**
		@param {string}char 영문 알파벳 문자
		@param {string}defaultValue 변환에 실패했을 때 반환할 기본값. 지정하지 않으면 원본 char 그대로.
		@param {boolean}caseInsencitive 대소문자 변환 상태에 대해서도 검사. 기본값=false
		@return 변환된 한글 음소 문자.
	**/
	self.convertAlphabetToPhoneme = function(char,defaultValue,caseInsencitive){
		var ci;
		if(typeof defaultValue=='boolean' || typeof defaultValue!='string' && typeof caseInsencitive=='string'){
			ci = defaultValue;
			defaultValue = caseInsencitive;
		}else
			ci = caseInsencitive;
		if(INDEXING_ARRAY__KO_PHONEME.indexOf(char)>=0) return _convertAlphabetToPhoneme(char);
		if(ci)
			for(var i=0;i<INDEXING_ARRAY__KO_PHONEME.length;i++)
				if(INDEXING_ARRAY__KO_PHONEME[i].toLowerCase()==char.toLowerCase())
					return _convertAlphabetToPhoneme(INDEXING_ARRAY__KO_PHONEME[i]);
		return defaultValue===undefined ?
			char :
			defaultValue;
	}

	/**
		@param {string}char 한글 음소 문자
		@param {string}defaultValue 변환에 실패했을 때 반환할 기본값. 지정하지 않으면 원본 char 그대로.
		@return 변환된 영문 알파벳 문자
	**/
	self.convertPhonemeToAlphabet = function(char,defaultValue){
		return /^[\u3131-\u3163]$/i.test(char) ?
			_convertPhonemeToAlphabet(char) :
			defaultValue===undefined ?
			char :
			defaultValue;
	}

	//	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩
	;
	// # 2
	// 음절(Char) 처리
	;
	//	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩

	/**
		@param {string}char 문자 하나를 받습니다. 여러 글자인 경우 무조건 맨 앞 자만 봅니다.
		@return 조합된 정상적인 한글인 경우 true
	**/
	self.isKoreanChar=function(char){
		return /^[\uac00-\ud7a3]/.test(char);
	}

	//	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩
	;
	// # 3
	// 어절과 문장(Str) 처리
	;
	//	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩

	/**
		@param {string}str 문자열을 받습니다.
		@return 입력된 모든 문자가 한글 문자인 경우 true
	**/
	self.isKorean = function(str){
		return /^[\u3131-\u3163\uac00-\ud7a3]+$/.test(str);
	}

	/**
		@param {string}str 문자열을 받습니다.
		@return 입력된 문자 중 한글 문자가 처음으로 발견된 위치. 없으면 -1
	**/
	self.indexOfKorean = function(str){
		var m=str.match(/[\u3131-\u3163\uac00-\ud7a3]/);
		return m ? m.index : -1;
	}

	/**
		@param {string}str 문자열을 받습니다.
		@return 입력된 문자 중 완성된 한글 음절이 처음으로 발견된 위치. 없으면 -1
	**/
	self.indexOfKoreanChar = function(str){
		var m=str.match(/[\uac00-\ud7a3]/);
		return m ? m.index : -1;
	}

	/**
		@param {string}str 문자열을 받습니다.
		@return 입력된 문자 중 조합되지 않은 한글 음소가 처음으로 발견된 위치. 없으면 -1
	**/
	self.indexOfKoreanPhoneme = function(str){
		var m=str.match(/[\u3131-\u3163]/);
		return m ? m.index : -1;
	}

	/** 받침 유무 확인
		@param {String}str 한글이 들어있을 것으로 추정되는 부분
		@return {Number} 받침이 있으면 true
	**/
	self.hasLastSound = function(str){
		var c = str.substr(-1).charCodeAt(0)||0;
		if(c < CHAR_CODE_AT_KO_CHAR_BEGIN)
			return false;
		if(c >= CHAR_CODE_AT_KO_CHAR_BEGIN+CHAR_COUNT__KO_CHAR)
			return false;
		c-=CHAR_CODE_AT_KO_CHAR_BEGIN;
		return c%CHAR_COUNT_PER_KO_MID_SOUND>0;
	}

	/**
		@param {string}str 영문이 들어있는 문자열
		@return 영문 쿼티 자판으로 입력된 모든 영문이 한글 2벌식 자판으로 변환된 문자열.
	**/
	self.koreanify = function(str){
		return convertAlphabetsToKorean(str);
	}

	/**
		@param {string}str 한글이 들어있는 문자열
		@return 2벌식 자판으로 입력된 한글이 모두 영문 쿼티 자판으로 변환된 문자열
	**/
	self.qwerty = function(str){
		return self.split(str).split("").map(function(c){
			if(self.isKoreanChar(c))
				return self.split(c).split("").map(c=>self.qwerty(c)).join("");
			if(self.isKoreanPhoneme(c))
				return INDEXING_ARRAY__KO_PHONEME[c.charCodeAt(0)-CHAR_CODE_AT_KO_PHONEME_BEGIN];
			return c;
		}).join("");
	}

	/**
		@param {string}str 완성형 한글이 들어있는 문자열
		@return 한글이 초성 중성 종성으로 분리된 문자열 (겹자음/겹모음은 유지됩니다)
	**/
	self.split = function(str){
		return str.split("").map(function(c){
			if(!self.isKoreanChar(c)) return c;
			var a=["","",""],n=c.charCodeAt(0)-CHAR_CODE_AT_KO_CHAR_BEGIN, m;
			m = n%CHAR_COUNT_PER_KO_MID_SOUND;
			a[2] = INDEXING_ARRAY__KO_LAST_SOUND[m];
			a[2] = a[2] && String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(a[2]))
				|| "";
			m = n%CHAR_COUNT_PER_KO_FIRST_SOUND;
			m=Math.floor(m/CHAR_COUNT_PER_KO_MID_SOUND);
			a[1] = String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + CHAR_COUNT__KO_CONSONANT+m);
			m=Math.floor(n/CHAR_COUNT_PER_KO_FIRST_SOUND);
			a[0] = INDEXING_ARRAY__KO_CONSONANT[m];
			a[0] = String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN + INDEXING_ARRAY__KO_PHONEME.indexOf(a[0]));
			return a.join("");
		}).join("");
	}

	/**
		@param {string}str 완성형 한글 또는 겹자음/겹모음이 포함된 문자열
		@return 한글이 모두 글쇠 단위로 분리된 문자열
	**/
	self.spread = function(str){
		return str.split("").map(function(c){
			if(!self.isKorean(c)) return c;
			return self.qwerty(c).split("").map(c=>
				_convertAlphabetToPhoneme(c)
			).join("");
		}).join("");
	}

	/**
		@param {string}str 한글 음소 문자가 들어있는 문자열
		@return 완성형 한글이 들어있는 문자열
	**/
	self.compress = function(str){
		return convertAlphabetsToKorean(str.split("").map(c=>
			self.isKoreanPhoneme(c) ? _convertPhonemeToAlphabet(c) : c
		).join(""));
	}

	//	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩
	;
	// #Z. 내부 함수
	;
	//	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩	▩▩▩▩▩▩▩▩

	/** 영문을 하나씩 살피면서 완성형 한글로 합쳐지겠다 싶으면 합치는 핵심 소스 */
	function convertAlphabetsToKorean(str){
		function _compress(a){
			if(a.length==0) return "";
			if(a.length==1) return String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN+INDEXING_ARRAY__KO_PHONEME.indexOf(INDEXING_ARRAY__KO_CONSONANT[a[0]]));
			if(a.length==2 && a[0]==null) return String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN+CHAR_COUNT__KO_CONSONANT+a[1]);
			var n = CHAR_CODE_AT_KO_CHAR_BEGIN;
			if(a.length) n += a.shift() * CHAR_COUNT_PER_KO_FIRST_SOUND;
			if(a.length) n += a.shift() * CHAR_COUNT_PER_KO_MID_SOUND;
			if(a.length) n += a.shift();
			return String.fromCharCode(n) + (a.length?_compress(a):"");
		}
		if(!str) return "";
		var ret="",wait=[];
		for(var i=0;i<str.length;i++){
			var c=str.charAt(i), cc=c+(i<str.length-1?str.charAt(i+1):"_"), xc=i<str.length-2?str.charAt(i+2):"_";
			if(wait.length!=1 && self.isVowel(c,1)){
				if(wait.length>1) --i;
				else{
					if(self.isVowel(cc,1)){
						++i;
						ret += _compress([null,_convertPhonemeToMidSoundIndex(cc)]);
					}
					else ret += _compress([null,_convertPhonemeToMidSoundIndex(c)]);
					continue;
				}
			}else switch(wait.length){
				case 0:
					if(self.isFirstSound(c,1)){
						wait.push(_convertPhonemeToFirstSoundIndex(c));
						continue;
					}
					break;
				case 1:
					if(self.isMidSound(cc,1) && self.convertAlphabetToPhoneme(cc).length==1){ ++i;
						wait.push(_convertPhonemeToMidSoundIndex(cc));
						continue;
					}
					if(self.isMidSound(c,1)){
						wait.push(_convertPhonemeToMidSoundIndex(c));
						continue;
					}
					break;
				case 2:
					if(self.isLastSound(cc,1) && self.convertAlphabetToPhoneme(cc).length==1 && !self.isVowel(xc,1)){ ++i;
						wait.push(_convertPhonemeToLastSoundIndex(cc));
					}else
					if(self.isLastSound(c,1) && !self.isVowel(cc[1],1)){
						wait.push(_convertPhonemeToLastSoundIndex(c));
					}
					if(wait.length>2) ++i;
					break;
			}
			if(wait.length){
				ret += _compress(wait);
				wait=[];
				i--;
			}else ret += c;
		}
		return ret + _compress(wait);
	}

	/** 알파벳 문자를 한글 음소로 변환 */
	function _convertAlphabetToPhoneme(c){
		return String.fromCharCode(CHAR_CODE_AT_KO_PHONEME_BEGIN+INDEXING_ARRAY__KO_PHONEME.indexOf(c));
	}
	/** 한글 음소를 알파벳 문자로 변환 */
	function _convertPhonemeToAlphabet(c,d){
		return INDEXING_ARRAY__KO_PHONEME[c.charCodeAt(0)-CHAR_CODE_AT_KO_PHONEME_BEGIN];
	}
	/** 주어진 음소가 초성으로서 몇 번째 순번인지, 초성으로 볼 수 없다면 -1를 반환 */
	function _convertPhonemeToFirstSoundIndex(phon){
		return INDEXING_ARRAY__KO_CONSONANT.indexOf(phon);
	}
	/** 주어진 음소가 중성으로서 몇 번째 순번인지, 중성으로 볼 수 없다면 -1를 반환 */
	function _convertPhonemeToMidSoundIndex(phon){
		var i=INDEXING_ARRAY__KO_PHONEME.indexOf(phon)-CHAR_COUNT__KO_CONSONANT;
		return i<0 ? -1 : i;
	}
	/** 주어진 음소가 종성으로서 몇 번째 순번인지, 종성으로 볼 수 없다면 -1를 반환 */
	function _convertPhonemeToLastSoundIndex(phon){
		return INDEXING_ARRAY__KO_LAST_SOUND.indexOf(phon);
	}

	// 상수 모음

	const CHAR_CODE_AT_KO_CHAR_BEGIN=0xAC00;
	const CHAR_COUNT__KO_CHAR=0x2BA4;
	const CHAR_COUNT_PER_KO_MID_SOUND=0x001C;
	const CHAR_COUNT_PER_KO_FIRST_SOUND=0x024C;
	self.getCharCodeAtKoreanCharBegin=function(){return CHAR_CODE_AT_KO_CHAR_BEGIN;};
	self.getKoreanCharCount=function(){return CHAR_COUNT__KO_CHAR;};
	self.getKoreanCharCountPerFirstSound=function(){return CHAR_COUNT_PER_KO_FIRST_SOUND;};
	self.getKoreanCharCountPerMidSound=function(){return CHAR_COUNT_PER_KO_MID_SOUND;};
	const CHAR_CODE_AT_KO_PHONEME_BEGIN=0x3131;
	const CHAR_COUNT__KO_CONSONANT=0x001E;
	const CHAR_COUNT__KO_VOWEL=0x0015;
	self.getCharCodeAtKoreanPhonemeBegin=function(){return CHAR_CODE_AT_KO_PHONEME_BEGIN;};
	self.getKoreanConsonantCount=function(){return CHAR_COUNT__KO_CONSONANT;};
	self.getKoreanVowelCount=function(){return CHAR_COUNT__KO_VOWEL;};
	const INDEXING_ARRAY__KO_PHONEME=["r","R","rt","s","sw","sg","e","E","f","fr","fa","fq","ft","fx","fv","fg","a","q","Q","qt","t","T","d","w","W","c","z","x","v","g","k","o","i","O","j","p","u","P","h","hk","ho","hl","y","n","nj","np","nl","b","m","ml","l"];
	const INDEXING_ARRAY__KO_CONSONANT=["r","R","s","e","E","f","a","q","Q","t","T","d","w","W","c","z","x","v","g"];
	const INDEXING_ARRAY__KO_LAST_SOUND=["","r","R","rt","s","sw","sg","e","f","fr","fa","fq","ft","fx","fv","fg","a","q","qt","t","T","d","w","c","z","x","v","g"];

	// =========================================================================
	return self;
}("core"));
