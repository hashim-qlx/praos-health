import jsonfile from 'jsonfile';

class Database {
    constructor() {
        this.driver = jsonfile;
    }
}

export class Db extends Database {
    constructor(table) {
        super();
        this.table = `./${table}.json`;
    }
}