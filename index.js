var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

var request = require('request');
request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    fs.appendFile('images.csv', 'File Permission, Absolute URL, File Type \n', function(err) {
      if (error) {
        return console.error(err);
      };
    });
    $('tr').each(function(i, element){
      var permission = $(this).children().first();
      var url = $(this).find('a').attr('href');
      if (url.charAt(url.length-4) == ".") {
        var filetype = url.substring(url.length - 4);
      };
      fs.appendFile('images.csv', permission.text() + ',http://substack.net' + url + ',' + filetype + '\n', function(err) {
        if (error) {
          return console.error(err);
        };
      });
      console.log(permission.text());
      console.log(url);
      console.log(filetype);
    });
  };
})


