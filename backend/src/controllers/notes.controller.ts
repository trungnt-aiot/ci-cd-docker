import { Request, Response } from "express";
import { noteService } from "../services/note.services";

export class notesController {
    static async getAll(req: Request, res: Response) {
        const notes = await noteService.getAllService()

        res.status(200).send({
            notes
        })
    }

    static async getOne(req: Request, res: Response) {
        const id: string = req.params.id;
        const note = await noteService.getOne(id)

        res.status(200).send({
            note
        })
    }

    static async create(req: Request, res: Response) {
        const {title, content} = req.body
        const newNote = await noteService.create(title, content)

        res.status(200).send({
            newNote
        })
    }

    static async delete(req: Request, res: Response) {
        const id: string = req.params.id
        const note = await noteService.delete(id)

        res.status(200).send({
            note
        })
    }

    static async update(req: Request, res: Response) {
        const {title, content} = req.body
        const id: string = req.params.id
        const note = await noteService.update(id, title, content)

        res.status(200).send({
            note
        })
    }
}