const {getSearchList} = require('../service/search.service');

module.exports.getSearchList = (req, res) => {
    try {
        getSearchList().then((response) => {
            res.status(200).json(response);
        });
    } catch (e) {
        res.status(500).json(e.message);
    }
}