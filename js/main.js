/** * Created by Tom Steele on 20/12/2017.
 */
window.addEventListener('load', function(e) {
    var tabs = new Tabs(document.getElementById("tab-container"));
});

function Tabs(el) {
    this.setupEvents = function() {
        for (var i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[i];
            tab.tab.addEventListener('click', this.onTabClick.bind(this));
        }
    }
    this.setupElements = function() {
        this.contentContainer.style.width = this.tabs.length * 100 + '%';
    }
    this.onTabClick = function(e) {
        var tabEl = e.currentTarget || e.tab;
        var index = this.indexes[tabEl.id.split('-')[1]];
        var tab = this.tabs[index];
        this.currentTab = tab;
        this.moveSelector(tab);
        this.moveContent(tab);
    }
    this.moveContent = function(tab) {
        this.contentContainer.style['margin-left'] = (0 - (this.indexes[tab.name] * 100)) + '%';
        this.contentContainer.style.opacity = 0;
        setTimeout(function() {
            this.content.style.opacity = 1;
        }, 150);
    }
    this.moveSelector = function(tab) {
        var mid = window.innerWidth / 2;
        var bb = tab.tab.getBoundingClientRect();
        var selectorMid = this.selector.getBoundingClientRect().width / 2;
        var x = bb.x + (bb.width / 2);
        this.selector.style.left = (x - mid) + 3;
    }
    this.tabContainer = el;
    this.contentContainer = document.getElementById('content');
    this.selector = document.getElementById('selected');
    this.tabs = [];
    this.indexes = {};
    var tabEls = this.tabContainer.children;
    var initialTab = null;
    for (var i = 0; i < tabEls.length; i++) {
        var tabName = tabEls[i].id.split('-')[1];
        this.indexes[tabName] = i;
        var tab = {
            'name': tabName,
            'tab': tabEls[i],
            'content': document.getElementById('content-' + tabName)
        };
        this.tabs.push(tab);
        if(tabName === window.location.hash.replace('#', '')) {
            initialTab = tab;
        }
    }
    this.setupElements();
    this.setupEvents();
    if(initialTab === null) {
        initialTab = this.tabs[0];
    }
    this.onTabClick(initialTab);
}