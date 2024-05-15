import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { conn } from '../config/db';

const getAll = (_req: Request, res: Response) => {
    console.log("getAll")
    conn.query('SELECT * FROM task;', (err, rows) => {
        if (err) {
            console.log(err.message)
            res.status(500).send({
                message: err.message,
                result: null
            });
        } else {
            res.status(200).send({
                message: 'OK',
                result: rows
            });
        }
    }); 
}

const addTask = (req: Request, res: Response) => {
    console.log(req.body)
    const {id, name, completed}  = req.body
    const query = "INSERT INTO task VALUES (id, name, completed) (?, ?, ?);"
    const values = [id, name, completed]
    conn.query(query, values, (err, _rows) => {
        if (err) {
            res.status(500).send({
                message: err.message,
                result: null
            });
        } else {
            res.status(200).send({
                message: 'OK',
                result: true
            });
        }
    }); 
}

const deleteTask = (req: Request, res: Response) => {
    const id = req.body.id
    const query = "DELETE FROM task WHERE id = ?;"
    const values = [id]
    conn.query(query, values, (err, _rows) => {
        if (err) {
            res.status(500).send({
                message: err.message,
                result: null
            });
        } else {
            res.status(200).send({
                message: 'OK',
                result: true
            });
        }
    }); 
}

const setTaskCompletion = (req: Request, res: Response) => {
    const {id, completed}  = req.body
    const query = "UPDATE task SET completed = ? WHERE id = ?;"
    const values = [id, completed]
    conn.execute(query, values, (err, _rows) => {
        if (err) {
            res.status(500).send({
                message: err.message,
                result: null
            });
        } else {
            res.status(200).send({
                message: 'OK',
                result: true
            });
        }
    }); 
}

export default { getAll, addTask, deleteTask, setTaskCompletion }