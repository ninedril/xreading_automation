function main() {
	var nbt = document.evaluate('//div[contains(text(), "Next")]', document, null).iterateNext();
	if (!nbt) {
		console.log('Something is wrong');
		return;
	}
	if (nbt.style.display != 'none') {
		nbt.click();
		//1ページ読むのにかかる時間を指定
		var rand = Math.random()*60 + 40;
		//main process
		checkDialog();
		getText();

		setTimeout(main, rand*1000);
	} else {
		var cbt = document.evaluate('//div[contains(text(), "Close")]', document, null).iterateNext();
		if(cbt){cbt.click();}
	}
}
function doScroll(pm) {
	if (pm == 'down') {
		//下スクロール。どの距離をスクロールするか指定
		var r = (Math.random()*0.2 + 0.8) * document.body.clientHeight;
		scrollBy(0, r);
		//何秒に一回スクロールするか指定
		setTimeout(function(){doScroll('up');}, 15*1000);
	} else {
		//上スクロール。どの距離をスクロールするか指定
		var r = (Math.random()*0.8 + 0.2) * document.body.clientHeight;
		scrollBy(0, -r);
		//何秒に一回スクロールするか指定
		setTimeout(function(){doScroll('down');}, 8*1000);
	}
}
function checkDialog() {
	var continue_bt = document.evaluate('//button[descendant::text()[contains(., "Continue")]]', document, null).iterateNext();
	if(continue_bt) {
		continue_bt.click();
	}
}
function getText() {
	var new_text = document.getElementById('xContent').innerText.replace(/^\s*|\s*$/g, '');
	whole_text = whole_text + new_text;
}
whole_text = '';
getText();
doScroll('down');
setTimeout(main, 10*1000);