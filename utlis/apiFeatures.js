class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryStringObject = { ...this.queryString };
        const excludesFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
        excludesFields.forEach((element) => delete queryStringObject[element]);

        let querySt = JSON.stringify(queryStringObject);
        querySt = querySt.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(querySt));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('createdAt');
        }

        return this;
    }

    fields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }

        return this;
    }

    search(modelName) {
        if (this.queryString.keyword) {
            let query = {};

            console.log(modelName);

            if (modelName == 'Product') {
                query.$or = [
                    { title: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } }
                ];
            } else {
                query = { name: { $regex: this.queryString.keyword, $options: 'i' } }
            }

            this.mongooseQuery = this.mongooseQuery.find(query);

        }
        return this;
    }

    paginate(countDocuments) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 20;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPage = Math.ceil(countDocuments / limit);

        if (endIndex < countDocuments)
            pagination.next = page + 1;

        if (skip > 0)
            pagination.prev = page - 1;

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

        this.paginationResult = pagination;

        return this;
    }

}


module.exports = ApiFeatures;