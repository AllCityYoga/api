require('should');

var mongoose = require('mongoose');
var challenge = require('../../models/challenge');
var challenges = challenge.model;
var expect = require('expect.js');
var schema = require('../../schemas/challenge').schema;


mongoose.connect('mongodb://localhost/acy-api_test');

describe('Challenge Model', function(){

  var id;
  var testData = {
    owner: "tim@allcityyoga.com",
    name: '30 Day Challenge',
    date: new Date(),
    detail: {
      unit: 30,
      measurement: 'dd'
    },
    tags: ['deepen', 'begin'],
    tags_count: 2
  };

  it('registers a challenge', function(done){
    challenge.register(testData, function(result){
      id = result._id;
      id.should.not.equal(null);
      result.name.should.equal('30 Day Challenge');
      result.owner.should.equal('tim@allcityyoga.com');
      result.detail.unit.should.equal(30);
      result.detail.measurement.should.equal('dd');
      result.tags_count.should.equal(2);
      result.tags.length.should.equal(2);
      done();
    }, function(e){
      e.should.equal(null);
    });  
  });

  it('retrieves a collection of challenges', function(done){
    challenge.findAll(function(result){
      result.length.should.be.above(0);
      done();
    },function(e){
      e.should.equal(null);
    });
  });

  it('finds a challenge by owner email', function(done){
    challenge.findByOwnerEmail('tim@allcityyoga.com', function(result){
      expect(typeof result).to.eql('object');
      result.owner.should.equal(testData.owner);
      done();
    }, function(e){
      e.should.equal(null);
    });
  });

  it('finds a challenge by id', function(done){
    challenge.findById(id, function(result){
      expect(typeof result).to.eql('object');
      result.owner.should.equal(testData.owner);
      done();
    }, function(e){
      e.should.equal(null);
    });
  });

  it('adds a tag', function(done){
    challenge.addTag(id, 'test', function(e,result){
      expect(typeof result).to.eql('object');
      result.tags_count.should.equal(3);
      done();
    });
  });

  it('finds challenges by tag', function(done){
    challenge.findByTag('test', function(result){
      expect(typeof result).to.eql('object');
      expect(result._id).to.eql(id);
      done();
    }, function(e){
      e.should.equal(null);
    });
  });

  it('removes a challenge', function(done){
    challenge.unregister(id,function(e,result){
      expect(e).to.eql(null);
      done();
    });
  })    

});
