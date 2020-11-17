const express = require('express');
const app = express();

/* Middleware */
const reloader = require("connect-livereload");
const logger = require('morgan');
app.use( reloader() )
app.use( logger('dev') )
app.use( express.json() )
app.use( express.urlencoded({extended : true}) )
app.use( express.static('./public/') )

/* Paths/Routes */
const apiRoutes = require('./routes/api-route.js');
const clientRoutes = require('./routes/client-route.js');
app.use('/api', apiRoutes)
app.use('/', clientRoutes)


/* Error Handling */
const errors = require('./middleware/errors.js');
app.use( errors.pageNotFoundError )
app.use( errors.internalServerError )


/* Connection */
const PORT = process.env.PORT || 5050;
app.listen(PORT, _ => console.log(
    'Test Server —',`http://localhost:${PORT}`
))