require('should');

var superagent = require('superagent');
var expect = require('expect.js');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/acy-api_test');

describe('express rest api server', function(){
  var id
  var apiVersion = 'v1';

  it('posts a user', function(done){
    superagent.post('http://localhost:3000/users')
      .send({ name: 'John'
        , email: 'john@rpjs.co'
      })
      .end(function(e,res){
        //console.log(res.body);
        expect(e).to.eql(null);
        //expect(res.body.length).to.eql(1);
        expect(res.body._id.length).to.eql(24);
        id = res.body._id;
        done();
      })    
  })

  it('retrieves a user', function(done){
    superagent.get('http://localhost:3000/users/'+id)
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)        
        expect(res.body._id).to.eql(id)        
        done()
      })
  })

  it('retrieves users', function(done){
    superagent.get('http://localhost:3000/users')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)        
        done()
      })
  })

  it('updates a user', function(done){
    superagent.put('http://localhost:3000/users/'+id)
      .send({
        name: {
          first: 'Unit',
          last: 'Test'
        },
        age: 45,
        email: 'unit@test.com'
      })
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')        
        done()
      })
  })

  it('checks an updated user', function(done){
    superagent.get('http://localhost:3000/users/'+id)
      .end(function(e, res){
        // console.log(res.body)
        var result = res.body;
        expect(e).to.eql(null);
        expect(typeof result).to.eql('object');
        expect(result._id.length).to.eql(24);
        expect(result._id).to.eql(id);
        result.email.should.equal('unit@test.com');
        result.age.should.equal(45);
        result.name.first.should.equal('Unit');
        result.name.last.should.equal('Test');       
        done()
      })
  })

  it('removes a user', function(done){
    superagent.del('http://localhost:3000/users/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')    
        done()
      })
  })      
})
