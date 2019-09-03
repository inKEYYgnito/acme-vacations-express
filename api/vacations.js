const express = require('express')
const router = express.Router()

const validator = (item, items) => {
    const { startDate, endDate } = item

    if (!startDate) return 'name is required'

    if (!endDate) return 'price is required'

    if (items.some(_item => _item.startDate === startDate && _item.endDate === endDate)) return 'name already exists'
}

const db = require('../db/db')('./db/vacations.json', validator)

router.get('/', async (req, res, next) => {
    try {
        const vacations = await db.findAll()
        res.send(vacations)
    } catch (e) {
        res.sendStatus(404)
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const vacation = await db.create(req.body)
        res.sendStatus(201)
        res.send(vacation)
    } catch (e) {
        res.sendStatus(400)
        next(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await db.destroy(req.params.id)
        res.send()
    } catch (e) {
        next(e)
    }
})

module.exports = router
