///////////////////////
//  TurnTable Bot /////
///////////////////////
// By AaronA @digicyc /
///////////////////////

var settings = require('./settings'); // Our Setings file.
var Bot = require('ttapi'); // Call the TurnTable Library

var AUTH   = settings.tt.auth;
var USERID = settings.tt.userid;
var ROOMID = settings.tt.rooms.default;

var secrets   = settings.rest.secret;
var bot       = new Bot(AUTH, USERID, ROOMID);
var adminhost = settings.rest.host;
var adminport = settings.rest.port;

// AutoSkip flag
var autoskip = false;

bot.listen(adminport, adminhost);
bot.speak("LETS GET THIS PARTAH STARTED BEEETCHES!!!");
bot.vote('up'); // Bob that bot!
console.log("HTTP SERVER Listening on: http://" + adminhost + ":" + adminport);


///////////////////////////
//     EVENTS           //
//////////////////////////
/**
 * Listen to HTTP Requests
 * RESTful ajax Calls via uri's.
 * ex: localhost:8080/secretkey/methodcall/ 
 */
bot.on('httpRequest', function (req, res) {
  var method = req.method;
  var url    = req.url;

  switch (url) {
    case '/'+secrets+'/version/':
      if (method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"version":"1.0"}');
      } else {
        res.writeHead(500);
        res.end();
      }
      break;
    case '/'+secrets+'/bob/':
      bot.vote('up');
      jsonResponse(res, '{"action":"voted"}');
      break;
    case '/'+secrets+'/djup/':
      bot.addDj();
      jsonResponse(res, '{"djing":"yes"}');
      break;
    case '/'+secrets+'/djdown/':
      bot.remDj();
      jsonResponse(res, '{"djing":"no"}');
      break;
    case '/'+secrets+'/skip/':
      bot.stopSong();
      jsonResponse(res, '{"song":"skipped"}');
      break;
    default:
      res.writeHead(500);
      res.end();
      break;
  }
});

/**
 *  200 Response with json value as return.
 */
function jsonResponse(res, jsonMsg) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(jsonMsg);
}

/**
 * Check if the specified userid is the set admin id.
 */
function isAdmin(userid) {
  if (userid == settings.tt.adminid) {
    return true;
  }
  return false;
}

/**
 * On startup
 */
bot.on('ready', function (data) {
  console.log("Connected to TurnTable!");
  //bot.roomRegister(ROOMID);
  bot.vote('up');
});


/**
 * On Room Change
 */
bot.on('roomChanged', function (data) {
  bot.speak("LETS GET THIS PARTY STARTED!!!!");
  bot.vote('up');
  bot.addDj();
});

/**
 * When DJ spot opens
 */
bot.on('remDj', function (data) {
  bot.addDj();
});


/**
 * On song change autobob
 */
bot.on('newsong', function (data) { 
  bot.vote('up');

  // If autoskip set then autoskip our song.
  if (autoskip) {
    bot.stopSong();
  }
});

/**
 * These are / Commands to our bot.
 */
bot.on('speak', function (data) {
   // Get the data
   var name = data.name;
   var text = data.text;

   // Respond to "/hello" command
   if (text.match(/^\/hello sgir$/)) {
      bot.speak('Heyas! How are ya '+name+' ^_^');
      bot.addDj();
   }
  else if (text.match(/^\/sgir skip$/)) {
    if (data.userid == settings.tt.adminid) {
      bot.stopSong();
    }
  }
  else if (text.match(/^\/sgir autoskip$/)) {
    if (autoskip) {
      bot.speak('Autoskip is currently ON.');
    } else {
      bot.speak('Autoskip is turned off. I get to DJ!');
    }
  }
  else if (text.match(/^\/sgir autoskip on$/)) {
    if (isAdmin(data.userid)) {
      autoskip = true;
    }
  }
  else if (text.match(/^\/sgir autoskip off$/)) {
    if (isAdmin(data.userid)) {
      autoskip = false;
    }
  }
  // When people talk in the Bot's channel.
  console.log(name + " SAYS: ", text);
});


/**
 * If someone dj's we do too
 */
bot.on('add_dj', function (data) {
  var name = data.name;
  var userid = data.userid;

  if (userid != settings.tt.userid) {
    bot.addDj();
    console.log("DJ Info:\n", data);
  }
});
