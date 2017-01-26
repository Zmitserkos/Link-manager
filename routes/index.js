/* GET home page. */
exports.index = function(req, res){
  //console.log("url::: "+req.url);
  
  res.render('index', { title: 'Express', pathMy : 'authorization/login.ejs' });
};


/* GET main page. */
exports.main = function(req, res){
  //console.log("url:-:-: "+req.url);
  
  res.render('user-buttons', { pathMy : 'authorization/login.ejs' });
};

