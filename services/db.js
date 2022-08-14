const mongoose = require('mongoose');
const connection = await mongoose.connect('mongodb+srv://eilontal:<eilontal>@final-project-backend.trmjkco.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });