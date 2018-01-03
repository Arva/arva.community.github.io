/** * Created by Tom Steele on 20/12/2017.
 */
window.addEventListener('load', function(e) {
    var tabs = new Tabs(document.getElementById("tab-container"));
    var faqs = new FAQ(document.getElementById("support-grid"));
    var mobileNav = document.getElementById("mobile-header");
    var dropDown = mobileNav.querySelector('select');
    dropDown.selectedIndex = tabs.indexes[window.location.hash.replace('#', '')];
    mobileNav.addEventListener('change', (e) => {
        var tabName = e.srcElement.selectedOptions[0].text.toLowerCase();
        var index = tabs.indexes[tabName];
        var tab = tabs.tabs[index];
        window.location.hash = "#" + tabName;
    });
    var carouselEl = document.getElementById("projects-grid");
    // var carousel = lory(carouselEl, {
    // });
    var slider = tns({
        container: '.projects-slider',
        items: 1,
        loop: true,
        nav: false,
        controls: false,
        slideBy: 'page',
        mouseDrag: true,
        responsive: {
            1024: {
                items: 3
            },
            720: {
                items: 1
            }
        },
        autoplay: false
    });
    document.getElementsByClassName("next")[0].addEventListener("click", function() { slider.goTo('next'); });
    document.getElementsByClassName("prev")[0].addEventListener("click", function() { slider.goTo('prev'); });
});


function Tabs(el) {
    this.setupEvents = function() {
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        for (var i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[i];
            tab.tab.addEventListener('click', this.onTabClick.bind(this));
        }
    };
    this.setupElements = function() {
        this.contentContainer.style.width = this.tabs.length * 100 + '%';
    };
    this.onHashChange = function() {
        var index = this.indexes[window.location.hash.replace('#', '')];
        var tab = this.tabs[index];
        this.onTabClick(tab);
    };
    this.onResize = function() {
        this.moveContent(this.currentTab);
        this.moveSelector(this.currentTab);
    };
    this.onTabClick = function(e) {
        var tabEl = e.currentTarget || e.tab;
        var index = this.indexes[tabEl.id.split('-')[1]];
        var tab = this.tabs[index];
        if(tab !== this.currentTab) {
            tab.content.classList.add('content-selected');
            tab.tab.classList.add('tab-selected');
            this.currentTab && this.currentTab.content.classList.remove('content-selected');
            this.currentTab && this.currentTab.tab.classList.remove('tab-selected');
            this.currentTab = tab;
            this.moveSelector(tab);
            this.moveContent(tab);
        }
    };
    this.moveContent = function(tab) {
        this.contentContainer.style['margin-left'] = (0 - (this.indexes[tab.name] * 100)) + '%';
        // this.contentContainer.style.opacity = 0;
        // setTimeout(function() {
        //     this.content.style.opacity = 1;
        // }, 150);
    };
    this.moveSelector = function(tab) {
        var mid = window.innerWidth / 2;
        var bb = tab.tab.getBoundingClientRect();
        var selectorMid = this.selector.getBoundingClientRect().width / 2;
        var x = bb.x + (bb.width / 2);
        this.selector.style.left = (x - mid) + 3;
    };
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

function FAQ(el) {
    this.faqs = {};
    this.el = el;
    this.elFAQs = this.el.getElementsByClassName("faq");

    this.initFAQs = function(id) {
        let i = 0;
        for(const elFAQ of this.elFAQs) {
            const question = elFAQ.getElementsByClassName("faq-question");
            const answer = elFAQ.getElementsByClassName("faq-answer");
            this.faqs["faq-" + i] = { question: question, answer: answer, expanded: false };
            elFAQ["data-faqId"] = "faq-" + i;
            i++;
            if(answer.length) { elFAQ.addEventListener('click', this.handleFAQClick.bind(this)); }
        }
    };
    this.handleFAQClick = function(e) {
        const faq = this.faqs[e.currentTarget['data-faqId']];
        faq.expanded = !faq.expanded;
        faq.expanded ? faq.question[0].parentElement.classList.add('faq-expanded') : faq.question[0].parentElement.classList.remove('faq-expanded');
    };
    this.initFAQs(el);
}

function emailSupport() {
    window.location.href = ('mailto:someone@bizboard.nl');
    return false;
}