import controllers from '../controllers/index.js'


export default (express, database) => {
    const router = express.Router()

    router.get('/', controllers(database).getSumBalance)

    return router;
}