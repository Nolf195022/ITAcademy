class Panier{
    constructor(ownername){
        this.owner = ownername;
        this.content = [];
    }
    addContent(element){
        this.content.push(element);
    }
};
module.exports = Panier;
