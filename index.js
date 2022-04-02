import express from 'express';
import routes from './src/routes/index.js';

const app = express();
const port = 8000;

app.use('/', routes);

app.listen(port, function(err){
    if(err){
        console.log(err);
    }

    console.log(`Server running on port: ${port}`);
});