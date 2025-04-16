const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const connectDB =  require('./db/db')
const indexRoute = require('./routes/indexRoutes')
const errorHandler = require('./middleware/errorMiddleware');
require('./helper/cronHelper');
require('./helper/cronNewsLetter');

dotenv.config();

const app = express()

connectDB()

app.use(cors(
   
));

app.get("/", (req , res)=>{
    res.send("Hello!! The backend is running")
})

app.use(bodyParser.json())

app.use(express.json())


app.use('/', indexRoute);  // main route

// Error Handling Middleware
app.use(errorHandler);

const PORT  = process.env.PORT || 8975
app.listen(PORT , () => console.log(`Server running on port: ${PORT}`))