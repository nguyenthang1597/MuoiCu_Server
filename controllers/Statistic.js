
const Statistic = require("../models/Statistic");

module.exports = {
    getBill: async function (req, res, next) {
        try {
            let resulft = await Statistic.getBill(req.query);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
    getEmployee: async function (req, res, next) {
        try {
            let resulft = await Statistic.getEmployee(req.query);
            res.json(resulft);
        } catch (error) {
            res.status(400).json({
                error: {
                    message: error.message
                }
            })
        }
    },
};