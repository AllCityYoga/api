require('should');

var mongoose = require('mongoose');
var user = require('../../models/user');
var users = user.model;
var expect = require('expect.js');
var schema = require('../../schemas/user').schema;


mongoose.connect('mongodb://localhost/acy-api_test');

describe('User Model', function(){

  var id;
  var testUser = {
    name: { first: 'John', last: '  Doe   ' },
    age: 25,
    email: 'johndoe@gmail.com'
  };

  it('registers a user', function(done){
    user.register(testUser, function(result){
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

  it('retrieves a collection of users', function(done){
    user.findAll(function(result){
      result.length.should.be.above(0);
      done();
    },function(e){
      e.should.equal(null);
    });
  });

  it('finds a user by email', function(done){
    user.findByEmail('johndoe@gmail.com', function(result){
      expect(typeof result).to.eql('object');
      result.email.should.equal(testUser.email);
      done();
    }, function(e){
      e.should.equal(null);
    });
  });

  it('updates a user', function(done){
    user.update(id, {
      name: {
        first: 'Unit',
        last: 'Test'
      },
      age: 45,
      email: 'unit@test.com'
    }, function(e,result){
      expect(typeof result).to.eql('object');
      result.email.should.equal('unit@test.com');
      result.age.should.equal(45);
      result.name.first.should.equal('Unit');
      result.name.last.should.equal('Test');
      done();
    });
  });

  it('adds a challenge to a user', function(done){
    var challenge_id = mongoose.Types.ObjectId();
    user.addChallenge(id, challenge_id, function(e,result){
      console.log(result);
      result.challenge_ids.length.should.equal(1);
      result.challenges_count.should.equal(1);
      done();
    });
  });

  it('removes a user', function(done){
    user.unregister(id,function(e,result){
      expect(e).to.eql(null);
      done();
    });
  })    

});
