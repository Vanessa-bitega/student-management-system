import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import express  from "express";
import studentModel from "./models/student.model.js";
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.get('/', (req, res) => {
    studentModel.find()
        .then((result) => {
            res.status(201).json({ msg: "Here is all the student", student: result});
    })
})
app.get('/:id', (req, res) => {
    studentModel.findOne(req.params._id)
        .then((result) => {
            res.status(201).json({ msg: "Here is the student matching that id", student: result});
    })
})
app.get('/email/:email', (req, res) => {
    const email = req.params.email;
    studentModel.findOne({email:email})//I use findOne with an object { email: email }, where email is the field name in your  db
        .then((result) => {
            res.status(201).json({ msg: "Here is the student matching that email", student: result});
    })
})

app.post('/add', (req, res) => {
    studentModel.create(req.body )
        .then((response) => {
            //console.log(res);
            res.status(201).json({ msg: "Student added successfully", student: response});
  })
    .catch(err => {
    console.log(err.msg);
    res.status(500).json({msg:"Internal server error"});
})
})
app.put('/update/:id', (req, res) => {
    studentModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((User) => {
      if (!User) {
          return res
              .status(404) 
              .json({ msg: 'No user with this id was found.' });
      }
      res.json({ updatedUser });
  })
  .catch((err) => {
      res.status(400).send(err);
  });
})
app.delete('/remove/:id', (req, res) => {
    studentModel.findByIdAndDelete
        (req.params.id)
        .then(() => {
            res.json({ msg: `User removed` });
        }).catch((err) => {
            res.status(400).send("Unable to delete");
    
        })
})
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected...")
        app.listen(port, () => {
        console.log(`Yo Dowgs our server is running oooooooooooonnnnnnnnnnnn PORT ${port}`)
    })})
.catch((err) => console.error(err));




