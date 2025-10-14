const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const customerRoutes = require('./router/customerRouter')
const hospitalRoutes = require('./router/hospitalRouter')

const app = express();
dotenv.config({ path: './config/config.env'})

app.use(express.json());
app.use(morgan('dev'))

const port = process.env.PORT || 8080

app.use("/api/v1/", customerRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/role", customerRoutes);

app.use("/api/v1/hospital", hospitalRoutes);
app.use("/api/v1/hospital/:id", hospitalRoutes);




app.listen(port, () => {
    console.log(`Server will run on ${port}`);
    
})

