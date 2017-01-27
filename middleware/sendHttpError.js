module.exports = function (req, res, next) {
  res.sendHttpError = function (error) {
    res.status(error.status);

    if (res.req.headers['x-reqested-with'] == 'XMLHttpRequest') { // req.xhr
      res.json(error);
    } else if (error.sendHtml) {
      res.render('error', {error: error});
    } else {
      res.send({message: error.message});
    }
  }

  next();
}
