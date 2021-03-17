const Datastore = require("nedb");

const store = new Datastore({ filename: "./src/database/store/data.db", autoload: true });

// DIY Models
const user = require("./models/user");

module.exports.user = async (uid, gid) => {
    return new Promise((resolve, reject) => {
        store.findOne({ uid, gid }, function (err, doc) {
            if (err) reject(err);

            if (!doc) {
                store.insert(user({ uid, gid }), (err, newDoc) => (err ? reject(err) : resolve(newDoc)));
            } else {
                resolve(doc);
            }
        });
    });
};

module.exports.everyone = async (gid) => {
    return new Promise((resolve, reject) => {
        store.find({ gid }, (err, docs) => {
            if (err) reject(err);
            resolve(docs);
        });
    });
};

module.exports.update = async (_id, update) => {
    return new Promise((resolve, reject) => {
        store.update({ _id }, update, { returnUpdatedDocs: true }, function (err, numAffected, affectedDocuments) {
            if (err) reject(err);

            resolve(affectedDocuments);
        });
    });
};
