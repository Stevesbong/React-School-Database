'use strict';

const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./db/index');
const usersRoute = require('./routes/users');
const coursesRoute = require('./routes/courses')


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

app.use(express.json());

app.use('/api', usersRoute, coursesRoute)

app.get('/', ( req, res ) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
});

( async () => {
    try {
        // Test the connection to the database
        console.log('Connection to the database successful!');
        await sequelize.authenticate();

        // Sync the models
        console.log('Synchronizing the models with the database . . .');
        await sequelize.sync();
    } catch(error) {
        console.error('Something went wrong . . .    Unable to connect to the databases:', error)
    }
})();


// Error handling

// sent 404 if no other route matched
app.use( ( req, res ) => {
    res.status(404).json({
        message: 'Route Not Found.',
    });
});

// setup a global error handler
app.use( ( err, req, res, next ) => {
    if(enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }

    res.status(err.status || 500).json({
        message: err.message,
        error: {},
    });
});


// local server port 

// set our port
app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
});