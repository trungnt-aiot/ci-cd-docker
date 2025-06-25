import { Request, Response } from 'express'
import { noteService } from '../services/note.services'
import { QueryResult } from 'mysql2'
import { NotesTypes } from '../types/notes.types'

export class notesController {
    static async getAll(req: Request, res: Response) {
        const notes: QueryResult = await noteService.getAllService()

        res.status(200).send({
            notes,
        })
    }

    static async getOne(req: Request, res: Response) {
        const id: NotesTypes.NoteID = req.params.id;
        const note: QueryResult = await noteService.getOne(id)

        res.status(200).send({
            note,
        })
    }

    static async create(req: Request, res: Response) {
        const { title, content }: NotesTypes.CreatedNote = req.body
        const newNote: QueryResult = await noteService.create(title, content)

        res.status(200).send({
            newNote,
        })
    }

    static async delete(req: Request, res: Response) {
        const id: NotesTypes.NoteID = req.params.id;
        const note: QueryResult = await noteService.delete(id)

        res.status(200).send({
            note,
        })
    }

    static async update(req: Request, res: Response) {
        const { title, content }: NotesTypes.CreatedNote = req.body
        const id: NotesTypes.NoteID = req.params.id;
        const note: QueryResult = await noteService.update(id, title, content)

        res.status(200).send({
            note,
        })
    }
}
