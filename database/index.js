const mongoose = require ('mongoose');
const uri = "";
mongoose.connect (uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then (() => {
        console. log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB', error);
});