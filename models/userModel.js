class User{
    constructor(name){
        this.name = name;
        this.subs = [];
    }
    addSub(element){
        this.subs.push(element)
    }
    getSub(){
        return this.subs
    }
};
module.exports = User;