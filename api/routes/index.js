import controllers from '../controllers/index.js'


export default (express, database) => {
    const router = express.Router()

    router.get('/sum', controllers(database).getSumBalance)

    return router;
}