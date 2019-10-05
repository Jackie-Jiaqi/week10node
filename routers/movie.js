let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Actor = require('../models/actor');
let Movie = require('../models/movie');
router.get('/', function (req, res) {
    Movie.find().populate('actors').exec((err, movies) => {
        if (err) res.status(400).json(err);
        res.json(movies)
    })
});
router.post('/', function (req, res) {
    console.log('body',req.body);
    Movie.create(req.body, function (err, result) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.json(result)
        }
    })
})
// get one
router.get('/:id', function (req, res) {
    let id = req.params.id;
    Movie.findById(id, function (err, result) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.json(result);
        }
    })
})
//update one
router.put('/:id', function (req, res) {
    let id = req.params.id;
    Movie.findOneAndUpdate(id, req.body, function (err, result) {
        if (err) {
            res.status(400).json(err)
        } else {
            res.json(result);
        }
    })
})
//delete one
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    Movie.findById(id,function(err,result){
        console.log('test',result);
    })
    Movie.remove({_id:id}, function (err, result) {
        if (err) {
            res.status(400).json(err)
        } else {
            console.log(result);
            res.json(result);
        }
    })
})
router.post('/:id', function (req, res) {
    console.log(req.body);
    let id = req.params.id;
    Movie.findById(id, function (err, movie) {
        if (err) res.status(400).json(err)
        Actor.findById(req.body.id, function (err, actor) {
            if (err) res.status(400).json(err);
            movie.actors.push(actor._id);
            movie.save(function (err, result) {
                if (err) res.status(400).json(err)
                else res.json(result)
            })
        })
    });
})
//remove before x year
router.delete('/week10/deleteByYear/:id',function(req,res){
    let year = req.params.id
    console.log('year',year);
    Movie.deleteMany({year:{$lt:year}},function(err,movie){
        if (err) {
            res.status(400).json(err)
        } else {
            res.json(movie);
        }
    })
})
//Remove an actor from the list of actors in a movie
router.delete('/delete/:id1/:id2', function (req, res) {
    let id1 = req.params.id1
    let id2 = req.params.id2
    Movie.findById(id1, function (err, movie) {
        if (err) res.status(400).json(err)
        let index = movie.actors.indexOf(id2)
        movie.actors.splice(index, 1)
        movie.save(function (err, result) {
            if (err) {
                res.status(400).json(err)
            } else {
                res.json(result);
            }
        })
    })
})
//Retrieve (GET) all the movies produced between year1 and year2, where year1>year2.
// router.get('/:year1/:year2',function(req,res){
//     let year1 = req.params.year1
//     let year2 = req.params.year2
//     Movie.find({$and:[{year:{$lt:year1}},{year:{$gt:year2}}]},function(err,result){
//         if(err){
//             res.status(400).json(err)
//         }
//         else{
//             res.json(result)
//         }
//     })
// })
// Increment the year of all movies who are produced after 1995 by 7 years
router.get('/task3/listMovie', function (req, res) {
    Movie.find({year:{$gt:1995}},function(err,movies){
        if(err) res.json(err)
        console.log(movies);
        movies.forEach((element)=>{
            element.year += 7
        })
        movies.save((err,result)=>{
            if(err) res.json(err)
            res.json(result)
        })
    })

})

module.exports = router;