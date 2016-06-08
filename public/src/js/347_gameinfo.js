/* jQuery Text wrap */
(function(c,h,l){if(c===l)throw"not found jQuery";var f={template:function(){return c.parseHTML("<span/>")[0]},className:"char",tagName:"span",excludeSelectors:"select option textarea ol ul dl".split(" "),splitReg:/([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2000-\u200F\t\s \u3000]+|.)/g,testReg:/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\u2000-\u200F\t\s \u3000\u0323]/},p="function"===typeof c.fn.addBack?"addBack":"andSelf",g={getTemplate:function(a){a=a||e.getOptions();if(c.isFunction(a.template))return a.template();
if("string"==typeof a.template)return c.parseHTML(a.template)[0];throw Error("unkown type template.");},textsTargetElement:function(a){a=a||e.getOptions();a=a.excludeSelectors.join(",");return c(this).find("*")[p]().not(a)},notZeroLengthTextNode:function(){return c(this).contents().filter(function(){return 3===this.nodeType&&0<this.nodeValue.length})},cloneElement:function(a,d){var b=a.cloneNode(!1);b.appendChild(h.createTextNode(d||""));return b},newTextNode:function(a){return h.createTextNode(a||
"")},textNodeToWrapTextNode:function(a,d){d=d||e.getOptions();return function(b,e){var f=this,m=f.parentNode,l=this.nodeValue,k=h.createDocumentFragment?h.createDocumentFragment():null,n=[];l.replace(d.splitReg,function(b,c,e,h){b=c&&d.testReg.test(c)?g.cloneElement(a,c):g.newTextNode(c);k?k.appendChild(b):m.insertBefore(b,f);n.push(b)});k&&m.insertBefore(k,f);c(this).remove();return n}}},e={getOptions:function(a){return c.extend({},f,a)},setOptions:function(a){return f=c.extend(f,a)},getTextsTargetTextNode:function(a,
d){d=d||e.getOptions();var b=c(a),b=g.textsTargetElement.call(b,d);return b=g.notZeroLengthTextNode.call(b)},convertTextsWrapTextNode:function(a,d){d=d||e.getOptions();var b=c(a),f=g.getTemplate(d);return b.map(g.textNodeToWrapTextNode(f,d))},getTexts:function(a,d){d=d||e.getOptions();var b=c(a),b=e.getTextsTargetTextNode(b,d),b=e.convertTextsWrapTextNode(b,d);return b=b.filter("*")}};c.fn.extend({texts:function(a){return e.getTexts(this,e.getOptions(a))}});c.extend({texts:e})})(jQuery,document);
// jQuery Cookie
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,s){if(arguments.length>1&&!e.isFunction(c)){if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){var a=s.expires,d=s.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*a)}return document.cookie=[n(t),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var x=p[l].split("="),g=o(x.shift()),j=x.join("=");if(t===g){f=r(j,c);break}t||void 0===(j=r(j))||(f[g]=j)}return f};u.defaults={},e.removeCookie=function(n,o){return e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n)}});

// global vars
var mtl = "";
var map;
var Bgi = {
	pageMoving : false,
	pageAnimation : false,
	mapVisited : false,
	navIdx : 0,
	subIdx : 0,
	hash : "",
	data : ["winHeight"],
	element : {},
	url : "http://file.pmang.com/images/pmang/bless/microsite/",
	popTemplate : "",
	ytPlayers : [],
	iDu : 1.5,
	iRa : 1.2
};

$.ajaxSetup({
  cache : false,
  timeout: 3000,
});

var checkHash = function(){
	setTimeout(function(){reloadUi();}, 25);
};
var docmode = document.documentMode; 
if ('onhashchange' in window && (docmode === undefined || docmode > 7 )) {
	window.onhashchange = checkHash;
} else {
	window.onunload = function() {setTimeout(checkHash, 25);};
};

var reloadUi = function() {
	pageCheck();
};

var setWindowHeight = function() {
	var height = Bgi.element.$window.height();
	$('#s1').css('minHeight', height);
	Bgi.data["winHeight"] = height; 
};

var pageMoveBtn = function(){
	$(document).off().on('click', '.btn-html', function(e){
		e.preventDefault();
		if($(this).hasClass('on')){return false;};
		Bgi.hash = $(this).attr('data-link');
		if(!Bgi.pageMoving) {
			if(Bgi.pageAnimation){
				senceAni.aniOut();
			} else {
				window.location.hash = Bgi.hash;
			};
		};
	});
};

var introScrollBlock = function(off){
	if(off){
		$(document).off("mousewheel.block DOMMouseScroll.block");
	} else {
		$(document).on("mousewheel.block DOMMouseScroll.block", function(e){e.stopPropagation();e.preventDefault();});
	}
}

var ajaxHtml = function(url){
	Bgi.pageMoving = true;
	Bgi.subIdx = 0;
	// load layer
	TweenMax.to(Bgi.element.$load, 0.5, {opacity: 1, zIndex: 10, onComplete: function(){
		TweenMax.set(Bgi.element.$load, {className:"+=ing"});
		loadHtml()
	}});

	// ajax laod 
	var loadHtml = function() {
		// nav on
		setTimeout(function(){
			$.get(url)
			.done(function(response, status){
				Bgi.element.$navA.removeClass('on').eq(Bgi.navIdx).addClass('on');
				Bgi.element.$container.html(response);
				pageMoveBtn();
				setTimeout(function(){
					TweenMax.set(Bgi.element.$load, {className:"+=done"});
					TweenMax.to(Bgi.element.$load, 0.5, {delay: 2,opacity: 0, zIndex: -1, onComplete: function(){
						TweenMax.set(Bgi.element.$load, {className:"-=ing done"});
						if(Bgi.pageAnimation) senceAni.aniIn();
						Bgi.pageMoving = false;
					}});
				}, 100)

			})
			.fail(function(){
				Bgi.element.$wrap.addClass('ajax-fail');
			})
			.always(function(){
				//console.log('ajax always')
			});
		}, 500)
	}

	
};


var pageCheck = function(){

	Bgi.hash = window.location.hash.split('?')[0];
	Bgi.data = null;
	Bgi.data = getUrlVars();
	popClose();
	switch(Bgi.hash.split('#')[1]){
		//TO DO : 연대기 오픈시 navIdx 변경
		case 'intro.html' :
			ajaxHtml('intro.html');
			break;
		case 'story.html' :
			Bgi.navIdx = 0;
			ajaxHtml('story.html');
			break;
		case 'history.html' :
			Bgi.navIdx = 1;
			ajaxHtml('history.html');
			break;
		case 'world.html' :
			Bgi.navIdx = 2;
			ajaxHtml('world.html');
			break;
		case 'people.html' :
			Bgi.navIdx = 3;
			ajaxHtml('people.html');
			break;
		case 'realm.html' :
			Bgi.navIdx = 4;
			ajaxHtml('realm.html');
			break;
		case 'class.html' :
			Bgi.navIdx = 5;
			ajaxHtml('class.html');
			break;
		case 'rxr.html' :
			Bgi.navIdx = 6;
			ajaxHtml('rxr.html');
			break;
		default :
			Bgi.hash = '#intro.html'
			ajaxHtml('intro.html');
			break; 	
	}

	//window.parent.location.hash = Bgi.hash;
};

var getUrlVars = function() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0, len = hashes.length; i < len ; i++){
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
};

var startAnimation = function() {}

var popHtml = function(data, camp){
	var campName = (camp === "하이란") ? "hieron" : "union";
	Bgi.element.$popPeople.html(Bgi.popTemplate(data));
	
	$('.pp_sld').flexslider({
		animation: "slide",
		slideshow: false,
		controlNav: true,
		directionNav: true,
		animationLoop: false,
		start: function(){
			Bgi.element.$popPeople.attr('class', 'lpop pop_people open '+campName);
		}
	});
};

var popClose = function(){
	if(Bgi.element.$popPeople.hasClass('open')){
		Bgi.element.$popPeople.removeClass('open');
		setTimeout(function(){
			$('.pp_sld').data('flexslider').destroy();
		}, 1200);
	}
};

var popTotalOpen = function(){
	Bgi.element.$popTotal.addClass('open');
	Bgi.element.$popTotal.find('.section, a').removeClass('on')
	popTotalCurrent();
};

var popTotalClose = function(){
	Bgi.element.$popTotal.removeClass('open');
};
var popTotalCurrent = function(){
	var $t = Bgi.element.$popTotal.find('.p'+Bgi.navIdx),
		$r = Bgi.element.$popTotal.find('.p4');
		$t.addClass('on');
		if(Bgi.data["camp"]){
			//TO DO 연대기 작업시 인덱스 변경
			$r.find('.list').eq(Bgi.data["camp"] == "hieron" ? 0 : 1).find('a').eq(Bgi.subIdx).addClass('on')
		} else {
			$t.find('a').eq(Bgi.subIdx).addClass('on')
		}
};

var disableF5 = function(e){
	if ((e.which || e.keyCode) == 116){
		e.preventDefault();
		e.stopPropagation();
		document.location.reload();
	}
};


//Doc Ready !
$(function(){
	Bgi.element.$container = $('#container'),
	Bgi.element.$load = $('#load_layer'),
	Bgi.element.$loadGif = $('#load_layer .loading'),
	Bgi.element.$loadLine = $('#load_layer .w'),
	Bgi.element.$wrap = $('#wrap'),
	Bgi.element.$nav = $('#nav'),
	Bgi.element.$navA = $('#nav .gnb a'),
	Bgi.element.$popPeople = $('.pop_people'),
	Bgi.element.$popTotal = $('.pop_total'),
	Bgi.element.$window = $(window),
	Bgi.element.$doc = $(document);	

	// handlebar init
	var source = $("#pop-template").html();
	Bgi.popTemplate = Handlebars.compile(source);

	reloadUi();
	if(ytScript == false){ytScriptFire();};
	var	scrollTime = 1,		//Scroll time
		scrollDistance = 300;//Distance. Use smaller value for shorter scroll and greater value for longer scroll

	Bgi.element.$window.on({
		resize: function(){
			setWindowHeight();
		},
		keydown: disableF5
	});
	Bgi.element.$window.on('keydown', function(e){
		
	});
	// Bgi.element.$window.on("mousewheel DOMMouseScroll", function(event){
	// 	event.preventDefault();	
	// 	var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
	// 	var scrollTop = Bgi.element.$window.scrollTop();
	// 	var finalScroll = scrollTop - parseInt(delta*scrollDistance);
	// 	TweenMax.to(Bgi.element.$window, scrollTime, {
	// 		scrollTo : { y: finalScroll, autoKill:true },
	// 			ease:  Expo.easeOut,
	// 			autoKill: true,
	// 			overwrite: 5							
	// 	});
					
	// });
	Bgi.element.$nav.on('click','.btn_sitemap', function(){
		popTotalOpen();
	});
	Bgi.element.$popTotal.on('click','a', function(){
		popTotalClose();
	});

});

var ytScript = false;

// YouTube Api 
function ytScriptFire() {
	var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	ytScript = true;
};

var onYtPlayerReady = function(event) {
	event.target.setPlaybackQuality('hd1080');
	event.target.setVolume(50);
};

var onPlayerStateChange = function(event) {
	if(event.target.g.id || event.target.a.id){
		var $p = $('#'+event.target.a.id+', #'+event.target.g.id).parent();
	}
	if (event.data === 1) {
		$p.addClass('playing');
	} else if (event.data === 0){
		$p.removeClass('playing');
	}
};

var BrowserDetect = {
	init: function () {
		var docElement = document.documentElement
		this.browser = this.searchString(this.dataBrowser) || "Other";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
		this.mobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? "mobile" : "pc"
		var b = BrowserDetect.browser === "Explorer" && BrowserDetect.version<9 ? "old" : BrowserDetect.browser+" "+BrowserDetect.browser+BrowserDetect.version+" "+BrowserDetect.mobile
		docElement.className = b
	},
	searchString: function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;

			if (dataString.indexOf(data[i].subString) !== -1) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) {
			return;
		}

		var rv = dataString.indexOf("rv:");
		if (this.versionSearchString === "Trident" && rv !== -1) {
			return parseFloat(dataString.substring(rv + 3));
		} else {
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		}
	},

	dataBrowser: [
		{string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
		{string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
		{string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
		{string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
		{string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
		{string: navigator.userAgent, subString: "Safari", identity: "Safari"},
		{string: navigator.userAgent, subString: "Opera", identity: "Opera"}
	]

};
BrowserDetect.init();

var randomRange = function(min, max) {
  return Math.floor( (Math.random() * (max - min + 1)) + min );
}

var evenChk = function(t) {
	var evenRow = $(t+':even');
	evenRow.addClass('even')
};

// input placeholder
var placeHoldBg = function(){
	// input value 
	$('.ph').each(function(){
		if($(this).val()==''){ $(this).addClass('ph-on');}
	})
	
	$('.ph').unbind('focusin').bind('focusin',function(){
		if($(this).val()==''){
			$(this).removeClass('ph-on');
		};
	}).unbind('focusout').bind('focusout',function(){
		if($(this).val()==''){
			$(this).addClass('ph-on');
		};
	});
}

var windowScrollTo =function(n, d){
	if(!d){d = .5};
	TweenMax.to(Bgi.element.$window, d, {scrollTo : { y: n, autoKill:true }, ease: Expo.easeOut, autoKill: true, overwrite: 5});
}

var layerBtn = function(){
	var layerOpen = function(target){
		var left = ( $(window).scrollLeft() + ($(window).width() - $(target).width()) / 2 );
		var top = ( $(window).scrollTop() + ($(window).height() - $(target).height()) / 2 );
		if($(window).scrollTop()>top){top = $(window).scrollTop()};
		$(target).css({'left':left,'top':top});
	};
	var closeAni = function(){
		$('.layerpop.on').stop(true, false).animate({ opacity: 0, marginTop: 25}, 250, 'easeInQuad',function(){$(this).attr('style','').removeClass('on')});
		$('.pop_dim').stop(true, false).animate({ opacity: 0}, 250, 'easeInQuad',function(){$(this).attr('style','').removeClass('on')});
	}
	var openAni = function(t){
		$(t).addClass('on').stop(true, false).animate({ opacity: 1, marginTop: 0}, 250, 'easeOutQuad',function(){});
		$('.pop_dim').addClass('on').stop(true, false).animate({ opacity: .7}, 250, 'easeOutQuad',function(){});
	}
	$('.btn_layer').on('click', function(){
		if($(this).hasClass('off')) {return false}
		var target = $(this).attr('href')
		layerOpen(target);
		if ($(target).hasClass('on')) {return false}
		closeAni();
		openAni(target)
		return false;
	});

	$('a.layer_close').on('click', function(){
		closeAni();
		return false;
	});
};

var tabContents = function(l, t, active){
	var linkWrap = $(l);
	var targetWrap = $(t);
	var linkTarget;
	var linkElem = linkWrap.find('ul a');
	var targetContnets = targetWrap.find('>div');
	linkElem.on('click', function(){
		_this = $(this);
		tabChange(_this);	
		return false;
	}); 
	function tabChange(t){
		if(t.hasClass('close')){return false;};
		linkElem.parent().removeClass('on').addClass('off');
		linkTarget = t.attr('href');
		t.parent().removeClass('off').addClass('on');
		targetContnets.addClass('off').removeClass('on');
		$(linkTarget).addClass('on').removeClass('off');
	};
	tabChange($(linkElem[active]));
};

var htmlPosition = function (elem){
	var left = ( $(window).scrollLeft() + ($(window).width() - $(elem).width()) / 2 );
	var top = ( $(window).scrollTop() + ($(window).height() - $(elem).height()) / 2 );
	if($(window).scrollTop()>top){top = $(window).scrollTop()};
	$(elem).css({'left':left,'top':top});
};

//메인 모달레이어
var modalPlayStats = false;
var modalVideo = function(stats,yt_code){
	var vCode  = yt_code,
	src ='http://www.youtube.com/embed/'+vCode+'?feature=player_detailpage&wmode=opaque&autoplay=1'
	ytHtml = '<iframe width="100%" height="100%" src="http://www.youtube.com/embed/'+vCode+'?feature=player_detailpage&wmode=opaque&autoplay=1" frameborder="0" allowfullscreen>',
	videoHtmlHolder = $('.yt_holder'),
	modalBody = $('.modal_body'),
	toggleElem = $('.modal_pop');
	if(stats === "open" && modalPlayStats === false){
		modalPlayStats = true;
		htmlPosition(modalBody);
		$( window ).on('resize', function(){htmlPosition(modalBody);});
		toggleElem.fadeIn(500, 'easeInExpo');
		$(ytHtml).appendTo(videoHtmlHolder);
	} else if(stats === "close") {
		$( window ).off('resize');
		toggleElem.fadeOut(500, 'easeOutExpo', function(){
			modalBody.find('iframe').detach();
			modalPlayStats = false;
		});
	};
};





