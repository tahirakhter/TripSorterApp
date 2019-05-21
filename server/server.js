// load node modules
const app = require('./app/routes');
const helmet = require('helmet');
require('dotenv').config();

//for XSS
app.use(helmet());

//set port for server to listen
app.listen( process.env.PORT, () => {
    console.log('server started on port ' +  process.env.PORT);
})

