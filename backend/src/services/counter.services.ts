import { counterRepositories } from './../repositories/counter.repositories';

export class counterService{
    static async getVisiter() {
        return await counterRepositories.getVisiter()
    }

    static async setVisiter(newValue: number) {
        return await counterRepositories.setVisiter(newValue)
    }
}