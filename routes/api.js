const { Thought, User } = require('../models')

const router = require('express').Router();




//users

//get all users
router.get('/users', async function (req, res){
    const users = await User.find({});
    res.json(users);
});

//get 1 user by id
router.get('/users/:id', async function (req, res){
    const users = await User.findOne({
        _id: req.params.id
    })
    res.json(users)
});

//create new user
router.post('/users', async function (req, res){
    const user = await User.create({
        username: req.body.username,
        email: req.body.email
    });
    res.json(user);
});

//update user
router.put('/users/:id', async function (req, res){
   try {
       const updated = await User.findByIdAndUpdate(req.params.id, {
           email: req.body.email,
       }, { new: true, runValidators: true });
       
       res.json(updated)
   } catch(err){
    res.status(422).json(err)
   }
});

//delete user
router.delete('/users/:id', async function (req, res){
 const deleted = await User.findByIdAndDelete(req.params.id);
    res.json({ data: 'success!'})
});




//friends

//add friend
router.post('/users/:userId/friends/:friendId', async function (req, res){

   const updated = await User.findByIdAndUpdate(req.params.userId, {
        $push: {
            friends: req.params.friendId
        }
    }, {new: true});
    res.json(updated);
});

//remover friend
router.delete('/users/:userId/friends/:friendId', async function (req, res){

   const updated = await User.findByIdAndUpdate(req.params.userId, {
        $pull: {
            friends: req.params.friendId
        }
    }, {new: true});
    res.json(updated);
});

//get all friends for user



//thoughts

//get all thoughts
router.get('/thoughts', async function (req, res){
    const thoughts = await Thought.find({});
    console.log(thoughts)
    
    res.json(thoughts);
});

//get 1 by thought id
router.get('/thoughts/:id', async function (req, res) {
   try{
       const thought = await Thought.findOne({
           _id: req.params.id,
       });
       res.json(thought);
   } catch (err){
    res.status(500).json(err)
   }
})

//get all thoughts made by user
router.get('/users/thoughts/:id', async function (req, res){
  const users = await User.findOne({
      _id: req.params.id
  })
  .populate({
    path: 'thoughts'
  })
  res.json(users);
});

//create new thought
router.post('/thoughts/:userId', function (req, res) {
    const data = Thought.create({
        thoughtText: req.body.thoughtText,
        userId: req.params.userId
    }).then((thought) => {
        return User.findByIdAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {thoughts: thought._id}},
            {new: true}
        );
        })
        .then((user) => 
        !user
        ? res.status(404).json({
            message: 'Thought created, but found no user with that ID',
        })
        : res.json('Created Thought')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update thought by id
router.put('/thoughts/:id', async function (req, res) {
    try {
        const updated = await Thought.findByIdAndUpdate(req.params.id, {
            thoughtText: req.body.thoughtText
        }, {new: true})
        res.json(updated);
    } catch(err){
        res.status(500).json(err)
    }
})

//delete thought by id
router.delete('/thoughts/:id', async function (req, res) {
        const deleted = await Thought.findByIdAndDelete(req.params.id);
        res.json({data: 'success!'})
  
})




//Reactions

//add reaction to thought
router.post('/thoughts/:id/reactions', async function (req, res) {
    const body = req.body;
  
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { reactions: body }},
        { new: true }
      );
      
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No Thought Found."});
      }
  
      return res.json(dbThoughtData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  });

  //delete reaction
  router.delete('/thoughts/:thoughtId/reactions/:reactionId', async function(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
  
      const dbThoughtData = await Thought.findByIdAndUpdate(thoughtId, {
        $pull: { reactions: { _id: reactionId } }
      }, { new: true });
  
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No Thought Found." });
      }
  
      return res.json(dbThoughtData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  });




  //Friends
  //add friend
  router.post('/users/:id/friends/:friendId', async function(req, res) {
    const { id } = req.params;
    const { friendId } = req.params;
  
    try {
      const dbUserData = await User.findByIdAndUpdate(id, {
        $addToSet: { friends: friendId }
      }, { new: true });
  
      if (!dbUserData) {
        return res.status(404).json({ message: "No User Found." });
      }
  
      return res.json(dbUserData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  });

  //remove Friend
  router.delete('/users/:id/friends/:friendId', async function(req, res) {
    const { id, friendId } = req.params;
  
    try {
      const dbUserData = await User.findByIdAndUpdate(id, {
        $pull: { friends: friendId }
      }, { new: true });
  
      if (!dbUserData) {
        return res.status(404).json({ message: "No User Found." });
      }
  
      return res.json(dbUserData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  });
  
  //view all friends
  router.get('/users/friends/:id', async function (req, res){
    const users = await User.findOne({
        _id: req.params.id
    })
    .populate({
      path: 'friends'
    })
    res.json(users);
});

  
  




module.exports = router