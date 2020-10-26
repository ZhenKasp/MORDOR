isUnique = (modelName, field) => {
  return (value, next) => {
    const Model = require("../models/" + modelName);
    const query = {};
    query[field] = value;

    Model.findOne({ where: query, attributes: ["id"] })
      .then((object) => {
        if (object) return next(modelName + ' with this '+ field +' already exists.');
        next();
      });
  };
};

module.exports = isUnique;