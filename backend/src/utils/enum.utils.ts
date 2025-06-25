export enum RESPONSE_STATUS_CODE {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum COUNTER_ERROR_MESSAGE {
    GET_COUNTER_ERROR = 'Error getting visitor counter',
    INCREMENT_COUNTER_ERROR = 'Error incrementing visitor counter',
    SET_COUNTER_ERROR = 'Error setting visitor counter',
    NEGATIVE_VISITER_ERROR = 'Visitor count cannot be negative',
    NOT_INITIALIZED_VISITER_ERROR = 'Visitor count is not initialized, Cannot set visitor count',
}

export enum NOTES_ERROR_MESSAGE {
    GET_ALL_NOTES_ERROR = 'Error getting all notes',
    GET_ONE_NOTE_ERROR = 'Error getting note by id',
    CREATE_NOTE_ERROR = 'Error creating note',
    DELETE_NOTE_ERROR = 'Error deleting note',
    UPDATE_NOTE_ERROR = 'Error updating note',
    ID_REQUIRED_ERROR = 'ID is required, Cannot fetch note by id',
    TITLE_CONTENT_REQUIRED_ERROR = 'Title and content are required, Cannot create note',
    NOTE_NOT_FOUND_ERROR = 'Note not found, Cannot delete note',
    ID_TITLE_CONTENT_REQUIRED_ERROR = 'ID, title, and content are required, Cannot update note',
}

export enum REDIS_ERROR_MESSAGE {
    GET_ALL_ERROR = 'Error getting all redis items',
    GET_ONE_ERROR = 'Error getting redis item by key',
    UPDATE_ERROR = 'Error updating redis item',
    DELETE_ERROR = 'Error deleting redis item',
    CREATE_ERROR = 'Error creating redis item',
    INIT_REDIS_ERROR = 'Error initializing redis',
    GET_COUNTER_ERROR = 'Error getting counter',
    STEP_INCREMENT_NEGATIVE_ERROR = 'Step cannot be negative, Cannot increment counter',
    INCREMENT_COUNTER_ERROR = 'Error incrementing counter',
    KEY_REQUIRED_ERROR = 'Key is required, Cannot get key',
    KEY_VALUE_REQUIRED_ERROR = 'Key and value are required, Cannot set value',
    SET_VISITER_ERROR = 'Error setting visitor count',
    SET_VALUE_ERROR = 'Error setting value',
    KEY_NOT_FOUND_ERROR = 'Key not found, Cannot delete key, Please check the key',
    KEY_ALREADY_EXISTS_ERROR = 'Key already exists, Cannot create item',
}

export enum MIGRATE_ERROR_MESSAGE {
    MIGRATE_DB_ERROR = 'Error migrating database',
}
