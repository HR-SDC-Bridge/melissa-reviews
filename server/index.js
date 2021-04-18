const express = require('express');
const Db = require('../db');
const db = new Db();
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname + '/../public'));
app.use(cors());

app.get('/api/reviews', (req, res, next) => {
  db.getReviewSummaries(1, summaries => {
    console.log('got summaries');
    res.send(summaries.map(({ _id, average, number }) => ({ itemID: _id, average, number })));
  });
});

app.get('/api/reviews/:itemID', (req, res, next) => {
  console.log('about to get summary');
  console.log(req.params.itemID);
  db.getReviewSummary(req.params.itemID.split(','), summary => {
    res.send(summary);
  });
});

app.get('/api/reviews/:itemID/details', (req, res, next) => {
  console.log('about to get details');
  db.getReviewDetails(req.params.itemID, details => {
    res.send(details);
  });
});

app.get('/api/reviews/:itemID/details/:reviewID', (req, res, next) => {
  console.log('now getting one single review');
  db.getSingleReview(req.params.itemID, req.params.reviewID, review => {
    res.send(review);
  });
});

app.get('/:productID', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../', 'public/test.html'));
});

app.listen(3000, () => console.log('listening'));