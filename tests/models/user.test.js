require('should');

var mongoose = require('mongoose');
var user = require('../../models/user');
var users = user.model;
var expect = require('expect.js');
var schema = require('../../schemas/user').schema;


mongoose.connect('mongodb://localhost/acy-api_test');

describe('User Model', function(){

  var id;

  it('registers a user', function(done){
    user.register({
      name: { first: 'John', last: '  Doe   ' },
      age: 25,
      email: 'johndoe@gmail.com'
    }, function(result){
      //console.log(result.name);
      id = result._id;
      result.name.first.should.equal('John');
      result.name.last.should.equal('Doe');
      result.email.should.equal('johndoe@gmail.com');
      result.age.should.equal(25);
      id.should.not.equal(null);
      done();
    }, function(e){
      e.should.equal(null);
    });  
  });

  // it('retrieves a collection of users', function(done){
  //   user.find({},function(e,result){
  //     console.log('retrieves a collection: ' + result);
  //     //expect(e).to.eql(null);
  //     expect(result.length).to.be.above(0);
  //     done();
  //   });
  // });

  // it('retrives a user', function(done){
  //   users.findOne({_id:id}, _id).exec(function(e,result){
  //     console.log('retrieves a user: ' + result);
  //     //expect(e).to.eql(null);
  //     expect(result._id).to.contain(id);
  //     done();
  //   });
  // });

  // it('updates a user', function(done){
  //   users.find({_id:id}).exec(function(e,result){
  //     var testUser = result;
  //     testUser.name.first = 'Unit';
  //     testUser.name.last = 'Test';
  //     testUser.age = '45';
  //     testUser.email = 'unit@test.com';
  //     testUser.save();
  //   });

  //   users.find({_id: id}).exec(function(e,result){
  //     expect(e).to.eql(null);
  //     expect(result.name.first).to.eql('Unit');
  //     expect(result.name.last).to.eql('Test');
  //     expect(result.age).to.eql('45');
  //     expect(result.email).to.eql('unit@test.com');
  //     done();
  //   });
  // });

  // // next test
  // it('removes a user', function(done){
  //   users.remove({_id: id}).exec(function(e,result){
  //     expect(e).to.eql(null);
  //     expect(result.length).to.eql(0);
  //     done();
  //   }); 
  // })    

});
