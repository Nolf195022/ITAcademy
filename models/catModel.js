class Catalogue {
    constructor(name) {
        this.name = name;
        this.content = [];
    }
    addContent(element){
        this.content.push(element);
    }
};
module.exports = Catalogue;