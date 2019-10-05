let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Actor = require('../models/actor');
let Movie = require('../models/movie');
//lab task6
router.get('/',function(req,res){
    Actor.find().populate('movies').exec((err,actors)=>{
        if(err) res.status(400).json(err)
        // res.json(actors);
        res.send(actors)
    })
})
// router.get('/addActors/:name/:bYear',(req,res)=>{
//     Actor.create({
//         name: req.params.name,
//         bYear: req.params.bYear
//     }, function(err){
//         if (err) console.log('Error',err)
//         res.redirect('/')
//     })
// })
router.post('/',function(req,res){
    let value = req.body;
    console.log('value is:',value);
    value._id = new mongoose.Types.ObjectId;
    Actor.create(value,function(err,result){
        if(err){
            console.log('teee');
            console.log(err);
            // res.send(err.errors.bYear.message)
            res.send(err)
        }
        // console.log(!result,'result');
        // if(!result){
        //     if (Number.isInteger(value.bYear)){
        //         console.log('test2');
        //         res.json({
        //             message:'name is empty, please enter name'
        //         })

        //     }
        //     if(!value.bYear==false && !Number.isInteger(value.bYear)){
        //         console.log('test1');
        //         res.json({
        //             message:'birth year should be integer'
        //         })
        //     }
        //     else{
        //         console.log('test');
        //         res.json({
        //             message:'name or birth year empty, these fields are required.'
        //         })
        //     }
        // }}
        else{
            console.log('test4');
            console.log(result);
            res.json(result)
        }
     })
    
});
router.get('/:id',function(req,res){
    let id = req.params.id;
    Actor.findOne({_id:id}).populate('movies').exec(
        function(err,result){
            if(err){
                res.json(err);
            }
            else{
                res.json(result)
            }
        }
    )
});
router.put('/:id',function(req,res){
    let id = req.params.id;
    Actor.findOneAndUpdate({_id:id},req.body,function(err,result){
        if(err){
            console.log('dd');
            res.status(400).json({e:err});
        }
        // if(!result){
        //     console.log('ss');
        //     res.status(404).json();
        // }
        res.json(result);
    })
});
//Delete a movie by its ID
router.delete('/:id',function(req,res){
    let id = req.params.id;
    Actor.findOneAndRemove({_id:id},function(err,result){
        if(err){
            res.status(400).json(err);
        }
        res.json(result);
    })
});
//add movie
router.post('/:id',function(req,res){
    console.log(req.body);
    let id = req.params.id;
    Actor.findById(id,function(err,actor){
        console.log(actor,'actor');
        if(err) {res.status(400).json(err); return};
        Movie.findById(req.body.id,function(err,movie){
            console.log(movie,'movie');
            if(err) res.status(400).json(err);
            actor.movies.push(movie._id);
            actor.save(function(err,result){
                if(err) res.status(400).json(err)
                else res.json(result)
            })
        })
    });
    
})
//Remove a movie from the list of movies of an actor
router.delete('/:id1/:id2',function(req,res){
    let id1 = req.params.id1;
    let id2 = req.params.id2;
    Actor.findById(id1,function(err,actor){
        if(err) res.status(400).json(err)
        let index = actor.movies.indexOf(id2);
        actor.movies.splice(index,1);
        actor.save(function(err,result){
            if(err) res.status(400).json(err)
            else res.json(result)
        })
    })
})




module.exports = router;