var util = require('util');
var events = require('events');

function WaitAndClick() {
    events.EventEmitter.call(this);
}

util.inherits(WaitAndClick, events.EventEmitter);

WaitAndClick.prototype.command = function(selector, cb) {

    var browser = this.client.api;

    return browser
      .waitForElementPresent(selector)
      .moveTo(selector, 10, 10)
      .waitForElementVisible(selector)
      .click(selector)
      .pause(1000 , () => { this.emit('complete'); });
};


module.exports = WaitAndClick;
