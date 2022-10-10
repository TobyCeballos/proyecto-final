class newProd {
    constructor({name, description, thumbnail, price, stock}) {
        this.name = name
        this.description = description
        this.thumbnail = thumbnail
        this.price = price
        this.stock = stock
    }
}

class getProd {
    constructor({name, description, thumbnail, price, stock}) {
        this.name = name
        this.description = description
        this.thumbnail = thumbnail
        this.price = price
        this.stock = stock
    }
}

function createProdDTO(prod) {
    return new newProd(prod)
}

function getProdDTO(prod) {
    return new getProd(prod)
}

module.exports = {
    createProdDTO,
    getProdDTO
}