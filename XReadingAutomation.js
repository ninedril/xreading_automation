//************** class ***************//
function XReadingAutomation() {
    //Properties
    this.next_bt = this.findNextBt();
    this.content_wrapper = this.findContentWrapper();
    this.whole_text = '';
    this.current_text = '';
    this.is_next_bt_clicked = false;

    //Obserber内でやること
    //１．CW内の文字収集し、センテンスかつまだ未格納なら格納したあと、その量に合わせて待機
    //２．Nbtクリック
    this.setTextObserver();

    //run
    //１．CW内の文字収集し、センテンスなら格納したあと、その量に合わせて待機
    //２．Nbtクリック
}

//************** methods ***************//
XReadingAutomation.prototype.findNextBt = function() {
    const nbt = document.evaluate('//div[contains(text(), "Next")]', document, null).iterateNext();
    return nbt;
}

XReadingAutomation.prototype.findContentWrapper = function() {
    const cw = document.getElementById('xContent');
    return cw;
}

//IF no sentence, return ''(str)
XReadingAutomation.prototype.getSentence = function() {
    const content_text = this.content_wrapper.innerText.replace(/^\s*|\s*$/g, '');
    //IF the content_text is a sentence 
    if (/([A-Z][a-z0-9_]*\s)(\w+\s)*(\w+[.!?])/.test(content_text)) {
        return content_text;
    } else {
        return '';
    } 
};

//return time to read(int)
XReadingAutomation.prototype.calcReadingTime = function() {
    const img_count = this.content_wrapper.getElementsByTagName('img').length;
    const rand = (this.current_text.length/25 + (img_count+1)*10) * (Math.random()*0.2 + 0.9);
    return rand;
};

XReadingAutomation.prototype.clickNextBtIn = function(seconds) {
    setTimeout(function() { this.next_bt.click(); }.bind(this), seconds*1000);
};

//Obserber内でやること
//１．CW内の文字収集し、センテンスかつまだ未格納なら格納したあと、その量に合わせて待機
//２．Nbtクリック
XReadingAutomation.prototype.setTextObserver = function() {
    const text_obs = new MutationObserver(function(records) {
        this.current_text = this.getSentence();
        if (this.whole_text.indexOf(this.current_text) == -1) {
            this.whole_text += ('\n' + this.current_text);
        }
        this.clickNextBtIn(this.calcReadingTime());
    }.bind(this));
    text_obs.observe(this.content_wrapper, {childList: true, subtree: true});
};

//init
//１．CW内の文字収集し、センテンスなら格納したあと、その量に合わせて待機
//２．Nbtクリック
XReadingAutomation.prototype.run = function() {
    this.current_text = this.whole_text = this.getSentence();
    this.clickNextBtIn(this.calcReadingTime());
}