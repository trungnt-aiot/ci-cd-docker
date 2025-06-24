import { NoteRepository } from "../repositories/note.repositories";

export class noteService{
    static async getAllService() {
        return await NoteRepository.getNotesList()
    }

    static async getOne(id: string) {
        return await NoteRepository.getNoteById(id)
    }

    static async create(title: string, content: string) {
        return await NoteRepository.createNote(title, content)
    }

    static async delete(id: string) {
        return await NoteRepository.deleteNote(id)
    }

    static async update(id: string, title: string, content: string) {
        return await NoteRepository.updateNote(id, title, content)
    }
}