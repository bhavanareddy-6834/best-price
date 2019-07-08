const puppeteer = require('puppeteer');
const express = require('express');
const app = new express();
app.set('view engine', 'ejs');

const cheerio = require('cheerio');


var url = 'https://www.amazon.in/s?k=';
var url2 = "https://www.flipkart.com/search?q="
var amazonnames = []
var flipkartnames = []
var amazonprizes = []
var amazonlinks = []
var flipkartprizes=[]

app.get('/home',function(req,res){
  res.render('demo');
});

app.get("/search2",function(req,res){
  url+=req.query.search2;
  url2+=req.query.search2;
  flipkartnames=[]
  flipkartprizes=[]
  amazonlinks=[]
  amazonnames=[]
  amazonprizes=[]

  res.redirect('/')
});
app.get("/search1",function(req,res){
  url+=req.query.search1;
  url2+=req.query.search1;
  // flipkartnames=[]
  // flipkartprizes=[]
  // amazonlinks=[]
  // amazonnames=[]
  // amazonprizes=[]

  res.redirect('/')
});


app.get('/',function(req,res){

  async function run1(){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
  
    let content = await page.content();
    var $ = cheerio.load(content);
    $('h5').each(function() {
      var x = $(this).text().replace(/\s\s+/g)
      var y = x.replace("undefined","");
      var y = y.replace("undefined","");
      amazonnames.push(y)
      // console.log($(this).text().replace(/\s\s+/g));
      // console.log(y);
      // console.log()
  
    });
    $('.a-price-whole').each(function() {
        
      var x = $(this).text().replace(/\s\s+/g)
      // var y = x.replace("undefined","");
      amazonprizes.push(x)
  });
  $('.a-link-normal').each(function() {
    
    var x = $(this).attr('href')
    // var y = x.replace("undefined","");
    amazonlinks.push('https://www.amazon.in'+x)
  
  });
   
    const browser1 = await puppeteer.launch();
      const page1 = await browser1.newPage();
      await page1.goto(url2);
    
      let content1 = await page1.content();
      var $ = cheerio.load(content1);
    
      $('._1vC4OE').each(function() {
          
                var x = $(this).text().replace(/\s\s+/g)
                // var y = x.replace("undefined","");
                flipkartprizes.push(x)
                // flipkartnames.push("")
              // console.log(y);
              // console.log()
            });
            $('._2B_pmu').each(function() {
              
              var x = $(this).text().replace(/\s\s+/g)
              // var y = x.replace("undefined","");
              // flipkartprizes.push(y)
              flipkartnames.push(x)
            // console.log(x);
            // console.log()
          });
          return res.render("home",{flipkartprizes:flipkartprizes,amazonnames:amazonnames,flipkartnames:flipkartnames,amazonprizes:amazonprizes,amazonlinks:amazonlinks})
          ;
    }
run1();





// puppeteer
//   .launch()
//   .then(function(browser) {
//     return browser.newPage();
//   })
//   .then(function(page) {
//     return page.goto(url).then(function() {
//       return page.content();
//     });
//   })
//   .then(function(html) {
//     $('h5', html).each(function() {
//       var x = $(this).text().replace(/\s\s+/g)
//       var y = x.replace("undefined","");
//       var y = y.replace("undefined","");
//       amazonnames.push(y)
//       // console.log($(this).text().replace(/\s\s+/g));
//       // console.log(y);
//       // console.log()

//     });
//     $('.a-price-whole', html).each(function() {
      
//         var x = $(this).text().replace(/\s\s+/g)
//         // var y = x.replace("undefined","");
//         amazonprizes.push(x)
//     });
//     $('.a-link-normal', html).each(function() {
      
//       var x = $(this).attr('href')
//       // var y = x.replace("undefined","");
//       amazonlinks.push('https://www.amazon.in'+x)
    
//   });
//     //return res.render("home",{amazonnames:amazonnames,flipkartnames:flipkartnames,amazonprizes:amazonprizes,amazonlinks:amazonlinks})
//   })
//   .catch(function(err) {
//     //handle error
// });

// puppeteer
  // .launch()
  // .then(function(browser) {
  //   return browser.newPage();
  // })
  // .then(function(page) {
  //   return page.goto(url2).then(function() {
  //     return page.content();
  //   });
  // })
//  .then(function(html){
//     $('._1vC4OE', html).each(function() {
      
//         var x = $(this).text().replace(/\s\s+/g)
//         // var y = x.replace("undefined","");
//         flipkartprizes.push(x)
//         // flipkartnames.push("")
//       // console.log(y);
//       // console.log()
//     });
//     $('._2B_pmu', html).each(function() {
      
//       var x = $(this).text().replace(/\s\s+/g)
//       // var y = x.replace("undefined","");
//       // flipkartprizes.push(y)
//       flipkartnames.push(x)
//     console.log(x);
//     console.log()
//   });
  
    // return res.render("home",{flipkartprizes:flipkartprizes,amazonnames:amazonnames,flipkartnames:flipkartnames,amazonprizes:amazonprizes,amazonlinks:amazonlinks})
//   })
//   // return res.render("home",{flipkartprizes:flipkartprizes,amazonnames:amazonnames,flipkartnames:flipkartnames,amazonprizes:amazonprizes,amazonlinks:amazonlinks})
  
//   .catch(function(err) {
//     //handle error
// });


    // console.log(amazonnames)
    // return res.render("home",{amazonnames:amazonnames,flipkartnames:flipkartnames})
});


app.listen(5000);