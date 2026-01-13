const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const customerRouter = require('./router/customerRoutes')
const hospitalRouter = require('./router/hospitalRoutes')
const newsRouter = require('./router/newsRoutes')
const breedRouter = require('./router/breedRoutes')
const bookingRouter = require('./router/bookingRoutes')
const animalRouter = require('./router/animalRoutes')
const treatmentRouter = require('./router/treatmentRoutes')
const packageDetailRouter = require('./router/packageDetailRoutes')
const packageRouter = require('./router/packageRoutes')
const packageMapRouter = require('./router/packageMapRoutes')
const bookingPackageRouter = require('./router/bookingPackageRoutes')
const newCategoryRouter = require('./router/newCategoryRoutes')
const packageDetailInfo = require('./router/packageDetailInfoRoutes')
const treatmentInfo = require('./router/treatmentInfoRoutes')
const roleRouter = require('./router/roleRoutes')


const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser');


const rateLimit = require('express-rate-limit')

const errors = require('./utils/error')

const app = express();
dotenv.config({ path: './config/config.env' })

app.use(cors({ origin: `${process.env.PORTHOSPITAL}`, credentials: true }))


app.use(express.json({
    limit: '100kb'
}));
app.use(morgan('dev'));
app.use(helmet())

const limiter = rateLimit({
    limit: 50,
    windowMs: 15 * 60 * 1000,
    message: "Too many request"
})
app.use('/api', limiter)
app.use(cookieParser());

const port = process.env.PORT || 8080

app.use("/api/v1/customer", customerRouter);

app.use("/api/v1/role", roleRouter);

app.use("/api/v1/news", newsRouter);

app.use("/api/v1/newCategory", newCategoryRouter)

app.use("/api/v1/hospital", hospitalRouter);

app.use("/api/v1/breed", breedRouter)

app.use("/api/v1/booking", bookingRouter)

app.use("/api/v1/animal", animalRouter)

app.use("/api/v1/treatment", treatmentRouter)

app.use("/api/v1/treatmentInfo", treatmentInfo)

app.use("/api/v1/packageDetail", packageDetailRouter)

app.use("/api/v1/package", packageRouter)

app.use("/api/v1/packageDetailInfo", packageDetailInfo)

app.use("/api/v1/packageMap", packageMapRouter)

app.use("/api/v1/bookingPackage", bookingPackageRouter)


app.all(/.*/, (req, res, next) => {
    const err = new Error(`Path ${req.originalUrl} not found in the server`)
    err.status = 'fail'
    err.statusCode = 404
    next(err)
})

app.use(errors.apiError)



app.listen(port, () => {
    console.log(`Server will run on ${port}`);

})

