const { ObjectID } = require('mongodb');

const getAll = async (req, res, next) => {
  try {
    const collection = req.conn.db('maurox').collection('items');
    await collection.find({}).toArray().then(docs => res.send({ error: false, data: docs }))
      .catch(err => { throw err; });
    return next();
  } catch (err) {
    return next(err);
  }
};

const createItem = async (req, res, next) => {
  const { body } = req;
  const collection = req.conn.db('maurox').collection('items');
  try {
    await collection.insertOne(body).then(result => res.send({ error: true, message: 'Item created.' }))
      .catch(err => { throw err; });
    next();
  } catch (err) {
    return next(err);
  }
};

const deleteItem = async (req, res, next) => {
  const collection = req.conn.db('maurox').collection('items');
  try {
    await collection.deleteOne({ _id: new ObjectID(req.params.id) }).then(result => res.send({ error: true, message: 'Item deleted.' }))
      .catch(err => { throw err; });
    return next();
  } catch (err) {
    return next(err);
  }
};

const deleteAll = async (req, res, next) => {
  const collection = req.conn.db('maurox').collection('items');
  try {
    const count = await collection.countDocuments({}).catch(err => { throw err; });
    if (count > 0) {
      await collection.deleteMany({}).then(result => res.status(200).send({ error: true, message: "All data deleted" }))
        .catch(err => { throw err; });
      return next();
    }
    res.send({ error: false, message: 'Database is empty' });
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAll,
  deleteItem,
  createItem,
  deleteAll,
};
