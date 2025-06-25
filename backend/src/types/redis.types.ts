export namespace RedisTypes {
    export type redisSchema = {
        key: string;
        value: string | null;
    };

    export type redisKey = redisSchema['key'];
    export type redisValue = Exclude<redisSchema['value'], null>;
}
