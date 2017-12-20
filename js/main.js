/** * Created by Tom Steele on 20/12/2017.
 */
window.addEventListener('load', function(e) {
    setupTabs();
});
window.addEventListener("hashchange", function(e) {
    debugger;
}, false);

function Tabs(el) {
    this.tabContainer = el;
    this.tabs = this.tabContainer.children;
}