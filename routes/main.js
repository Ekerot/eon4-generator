'use strict';

/**
 * Created by ekerot on 2016-12-17.
 */

let router = require('express').Router();

router.route('/')    //function just to render first page
    .get(function(req, res) {

res.render('layouts/main')
    });

module.exports = router;
