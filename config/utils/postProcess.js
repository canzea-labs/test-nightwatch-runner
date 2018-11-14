var util = require('util');
var events = require('events');

function PostProcess() {
    events.EventEmitter.call(this);
}

util.inherits(PostProcess, events.EventEmitter);

PostProcess.prototype.command = function(cb) {
    var self = this;
    function done() {
        self.emit('complete');        
    }

    var browser = this.client.api;

    config = browser.globals.app[process.env.ENV];
  
    console.log("URL BasePath: " + config.urlbasepath);
    
    name = browser.currentTest.name || browser.currentTest.module
    if (config.screenshots) {
      var test = (name).replace(new RegExp(' ', 'g'), '_').replace(new RegExp('/', 'g'), '_').toLowerCase();
      console.log('Saving Screenshot ' + "/screenshots/s_" + test + ".png");
      browser
      .saveScreenshot("/screenshots/s_" + test + ".png")
      .pause(500, done);

      browser.getAttribute("html", "scrollHeight", (h) => {
          h = Number(h.value) + 100;
           browser.resizeWindow(1260, h, () => {
              var test = (name).replace(new RegExp(' ', 'g'), '_').replace(new RegExp('/', 'g'), '_').toLowerCase();
              console.log('Saving Screenshot ' + "/screenshots/s_" + test + "_full.png");
              browser
              .saveScreenshot("/screenshots/s_" + test + "_full.png")
              .pause(500, done);
           });
      });
    } else {
        console.log("Skipping Screenshot.");
        this.emit('complete');
    }

    return this;
};

module.exports = PostProcess;