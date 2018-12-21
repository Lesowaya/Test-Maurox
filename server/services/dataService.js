const { ObjectID } = require('mongodb');

const getAll = async (req, res, next) => {
  const collection = req.conn.db('maurox').collection('items');
  const users = await new Promise((resolve, reject) => {
    collection.find({}).toArray((err, docs) => {
      if (err) {
        next(err);
        return reject();
      }
      resolve(docs);
    });
  });
  res.status(200).send({ error: false, data: users });
  return next();
};

const createItem = (req, res, next) => {
  const { body } = req;
  console.log('create item');
  const collection = req.conn.db('maurox').collection('items');
  collection.insertOne(body, (err, result) => {
    if (err) {
      return next(err);
    }
  });
  res.status(200).send({ error: false, message: 'Item created.' });
  next();
};

const deleteItem = (req, res, next) => {
  console.log('delete item');
  const collection = req.conn.db('maurox').collection('items');
  collection.deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) {
      return next(err);
    }
    return false;
  });
  res.status(200).send({ error: false, message: 'Item deleted.' });
  return next();
};

const deleteAll = async (req, res, next) => {
  console.log("------------- REQ ------------------");
  console.log(req);
  console.log("------------- RES ------------------");
  console.log(res);
  console.log("------------- NEXT ------------------");
  console.log(next);
  console.log('delete all');
  const collection = req.conn.db('maurox').collection('items');
  collection.countDocuments({}, (err, count) => {
    console.log("------------- ERR ------------------");
    console.log(err);
    if (err) {
      next(err);
    }
    if (count > 0) {
      collection.deleteMany({}, (err, result) => {
        console.log("------------- ERR COUNT > 0 ------------------");
        if (err) {
          return next(err);
        }
        console.log("------------- RETURNED FALSE ------------------");
        return false
      });
    }
  });

  res.status(200).send({ error: false, message: "All data deleted" });
  return next();
};


module.exports = {
  getAll,
  deleteItem,
  createItem,
  deleteAll,
};
