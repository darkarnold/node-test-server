const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://arnoldndiwalana:${password}@clustertest0.ysgc4.mongodb.net/noteApp?retryWrites=true&w=majority&appName=ClusterTest0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// save note to database
const note = new Note({
  content: "Javascript is easy",
  important: false,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});

// fetch notes from database
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
