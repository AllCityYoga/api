
/*
 * GET home page.
 */

var users = require('./users');

// TODO implement challenges api
//var challenges = require('./challenges')

exports.index = exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.users = users;

//exports.challenges = challenges;