import jsonfile from 'jsonfile';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class Db {
    constructor() {
        this.dbDriver = jsonfile;
    }

    async getUser(name) {
        const { users } = await this.dbDriver.readFile(path.join(__dirname,'./users.json'));
        const index = users.findIndex((u) => (u.name === name));
        if (index == -1) {
            throw new Error('USER_NOT_FOUND');
        }

        return users[index];
    }

    async getAccounts(id) {
        const { accounts } = await this.dbDriver.readFile(path.join(__dirname, './accounts.json'));
        return accounts.filter((a) => a.userId === id);
    }
}