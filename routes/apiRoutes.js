const router = require('express').Router();
const Store = require('../db/store');

// here i have to create a route that will grab the saved notes
// do i need to change this because it is the name of the notes page?
router.get('/notes', (req , res)=>{
  Store
    .getNotes()
    .then((notes)=>{
      return res.json(notes);
  })
  .catch(err=>res.status(500).json(err));
});

router.post('/notes', (req, res) => {
  Store
    // req.body is the json 
    .addNote(req.body)
    .then(() => {
      res.status(200).json({ok: true})
    })
    .catch(err=>res.status(500).json(err));
})

router.delete('/notes/:id', (req, res) => {
  Store 
  .removeNote(req.params.id)
  .then(() => {
    res.status(200).json({ok: true})
  })
  .catch(err=>res.status(500).json(err));
})
module.exports = router;