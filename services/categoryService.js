const categoryModel = require("../model/categoryModel");

exports.getCategory = (request, response) => {
    const name = request.body.name;
    console.log(request.body);

    const newCategory = new categoryModel({ name })
    newCategory
        .save()
        .then((doc) => {
            response.json(doc)
        })
        .catch((err) => {
            response.json(err);
        })
}

