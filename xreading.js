function main(is_first = false) {
	var nbt = document.evaluate('//div[contains(text(), "Next")]', document, null).iterateNext();
	if (!nbt) {
		console.log('Something is wrong');
		return;
	}
	if (nbt.style.display != 'none') {
		if (!is_first) {
			nbt.click();
		}
		
		//main process
		checkDialog();
		getText();

		//1ページ読むのにかかる時間を指定 25字（含スペース）/秒 画像1枚/15秒
		var img_count = document.querySelectorAll('div#xContent img').length;
		var rand = (current_text.length/25 + (img_count+1)*10) * (Math.random()*0.2 + 0.9);
		setTimeout(main, rand*1000);
	} else {
		//var cbt = document.evaluate('//div[contains(text(), "Close")]', document, null).iterateNext();
		//if(cbt){cbt.click();}
	}
}

function startScroll(first_direction) {
	if (first_direction == 'down') {
		//下スクロール。どの距離をスクロールするか指定
		var r = (Math.random()*0.2 + 0.8) * document.body.clientHeight;
		scrollBy(0, r);
		//何秒に一回スクロールするか指定
		setTimeout(function(){startScroll('up');}, 15*1000);
	} else {
		//上スクロール。どの距離をスクロールするか指定
		var r = (Math.random()*0.8 + 0.2) * document.body.clientHeight;
		scrollBy(0, -r);
		//何秒に一回スクロールするか指定
		setTimeout(function(){startScroll('down');}, 8*1000);
	}
}

function checkDialog() {
	var continue_bt = document.evaluate('//button[descendant::text()[contains(., "Continue")]]', document, null).iterateNext();
	if(continue_bt) {
		continue_bt.click();
	}
}

function pageNext() {
	var nbt = document.evaluate('//div[contains(text(), "Next")]', document, null).iterateNext();
	nbt.click();
}

function getText() {
	current_text = document.getElementById('xContent').innerText.replace(/^\s*|\s*$/g, '');
	whole_text = whole_text + new_text;
	return new_text;
}

function setTextObserver() {
	const content_node = document.getElementById('xContent');
	const text_obs = new MutationObserver(records => {
		const content_text = content_node.innerText.replace(/^\s*|\s*$/g, '');
		//IF the content_text is a sentence
		if (/([A-Z][a-z0-9_]*\s)(\w+\s)*(\w+[.!?])/.test(content_text)) {
			//IF not still filed in whole_text
			if ( whole_text.indexOf(content_text) == -1) {
				whole_text += content_text;
			}
		}
	});
	text_obs.observe(content_node, { childList: true, subtree: true});
}

whole_text = '';
startScroll('down');
main(true)