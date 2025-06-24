import { redisClient } from "../config/redis";

export class redisRepositories {
    static async get(key: string) {
        console.log(key)
        return await redisClient.get(key)
    }
    
    static async set(key: string, value: string){
        return await redisClient.set(key, value)
    }

    static async items(): Promise<Array<{ [key: string]: any }>> { 
        const allKeys: string[] = [];
        let cursor: string = '0';

        do {
            const reply: { cursor: string; keys: string[]; } = await redisClient.scan(cursor);
            allKeys.push(...reply.keys);
            cursor = reply.cursor;
        } while (cursor !== '0');

        if (allKeys.length === 0) {
            return [];
        }

        const values = await redisClient.mGet(allKeys);

        const result: Array<{ [key: string]: any }> = []; 
        allKeys.forEach((key, index) => {
            const value = values[index];
            if (value !== null) {
                try {
                    const parsedValue = JSON.parse(value);
                    result.push({ [key]: parsedValue }); 
                } catch (e) {
                    console.warn(`Warning: Could not parse JSON for key "${key}". Value: "${value}"`);
                    result.push({ [key]: value });
                }
            } else {
                result.push({ [key]: null });
            }
        });

        return result;
    }

    static async delete(key: string) {
        return await redisClient.del(key)
    }
}