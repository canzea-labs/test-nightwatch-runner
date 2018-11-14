var util = require('util');
var events = require('events');

function setValue() {
    events.EventEmitter.call(this);
}

util.inherits(setValue, events.EventEmitter);

setValue.prototype.command = function(selector, value, using) {
    const self = this;
    const api = this.client.api;

    api.elements(using || 'css selector', selector, function (elems) {
        elems.value.forEach(function (element) {
            for (var c of value.split('')) {
                api.elementIdValue(element.ELEMENT, c);
            }
            self.emit('complete');
        });
    });
    return this;
};

module.exports = setValue;