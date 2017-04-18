var express=require('express');
var path=require('path');
var fs=require('fs');
var request=require('request');
var input="";
var cheerio=require('cheerio');
var app=express();




app.get('/', function(req, resp) {
  resp.setHeader('content-type', 'text/html');
   
if(req.query.url==undefined)
{
    resp.sendFile(path.join(__dirname, './', 'index.html'));
}
else
{
   var url=req.query.url;
   console.log(url);
   
    var data="";

     var $ = cheerio.load('<h1></h1>');
      request(url,function(err,res,html){

if(!err)
    {
console.log(req.ip+" -- url:"+url);

    data=data+html;

    $ = cheerio.load(data);
    var link = [];

    $('a').each(function(i, elem) {
      var temp='';
      temp= $(this).attr('href');
  if(typeof(temp)=='string'){
      if(temp.charAt(0)=='/')
      {

        temp=url+temp;
      }
      }
      $(this).attr('href','https://proxytub-cursed-god.cs50.io/?url='+temp);
    });

$('form').each(function(i, elem) {
      var temp='';
      temp= $(this).attr('action');
  if(typeof(temp)=='string'){
      if(temp.charAt(0)=='/'||temp.charAt(1)=='/')
      {
         temp=url+temp;
      }
      $(this).attr('action',temp);

      }
          });







      resp.end($('html').html());

  }
    else {
      resp.write("<h1>unable to fetch page please check url!!</h1>");
      }

    });


// res.sendFile(path.join(__dirname, './','google.html'));
 /*fs.writeFile("google.html", "", function(err) {
if(err) {
    return console.log(err);
}

console.log("The file was saved!");
});
*/
}
});






app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log(" server listening at"+process.env.PORT + ":"+process.env.IP);
});
