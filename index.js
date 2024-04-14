let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS

let cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173' }));


app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Soda:cSCqupwYCgUznS3O@spacesheep.fi5ius3.mongodb.net/spacesheep?retryWrites=true&w=majority&appName=spacesheep");/*mongodb+srv://Soda:cSCqupwYCgUznS3O@spacesheep.fi5ius3.mongodb.net/spacesheep?retryWrites=true&w=majority&appName=spacesheep*/