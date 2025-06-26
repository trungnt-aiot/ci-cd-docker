export namespace NotesTypes {
    export type NotesSchema = {
        id: number;
        title: string;
        content: string;
        created_at: Date;
    };

    export type NoteID = string;
    export type NoteTitle = NotesSchema['title'];
    export type NoteContent = NotesSchema['content'];
    export type NoteCreateAt = NotesSchema['created_at'];

    export type CreatedNote = Omit<NotesSchema, 'id' | 'created_at'>;
}
