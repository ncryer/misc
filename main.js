(function(){
  var application = require('app'),
      http = require('http'),
      BrowserWindow = require('browser-window'),
      path = require('path');

  // var requestHandler = function(req,res){
  //
  // }
  //


  application.on('ready', function() {

    // Start http server
    // var server = http.CreateServer()


    var mainWindow = new BrowserWindow({width: 1024, height: 768});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    console.log(application.getAppPath());
    // mainWindow.loadURL(path.join(pr));
    mainWindow.on('closed', function() {
      mainWindow = null;
      });
    });
})();
