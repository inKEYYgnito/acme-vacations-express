const express = require('express')
const router = express.Router()

const validator = (item, items) => {
    const { startDate, endDate } = item

    if (!startDate) return 'startDate is required'

    if (!endDate) return 'endDate is required'

    if (items.some(_item => _item.startDate === startDate && _item.endDate === endDate)) return 'vacation time already exists'
}

const db = require('../db/db')('./db/vacations.json', validator)

router.get('/', async (req, res, next) => {
    try {
        const vacations = await db.findAll()
        res.json(vacations)
    } catch (e) {
        res.status(404).json(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const vacation = await db.create(req.body)
        res.status(201).json(vacation)
    } catch (e) {
        res.status(400).json(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await db.destroy(req.params.id)
        res.send()
    } catch (e) {
        res.status(400).json(e)
    }
})

module.exports = router
