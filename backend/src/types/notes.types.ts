export namespace NotesTypes {
    export type NotesSchema = {
        id: number;
        title: string;
        content: string;
        created_at: Date;
    };

    export type NoteID = string;
    export type NoteTitle = Pick<NotesSchema, 'title'>;
    export type NoteContent = Pick<NotesSchema, 'content'>;
    export type NoteCreateAt = Pick<NotesSchema, 'created_at'>;

    export type CreatedNote = Omit<NotesSchema, 'id' | 'created_at'>;
}
