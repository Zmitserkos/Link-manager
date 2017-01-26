/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Express', pathMy : 'authorization/login.ejs' });
};

/* GET main page. */
exports.main = function(req, res){
  res.render('user-buttons', { pathMy : 'authorization/login.ejs' });
};

/* GET pop up window. */
exports.popup = function(req, res){

  switch (~~req.query['id']) {
    case 1:
      res.render('authorization/register', {});
      break;
    case 2:
      res.render('authorization/login', {});
      break;
    case 3:
      //res.render('user-buttons', { pathMy : 'authorization/login.ejs' });
      break;
  }

};
