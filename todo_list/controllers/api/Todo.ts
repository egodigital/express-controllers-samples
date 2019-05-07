import * as _ from 'lodash';
import * as joi from 'joi';
import { Request, Response } from 'express';
import { ControllerBase, DELETE, GET, POST, PUT } from '@egodigital/express-controllers';


interface NewTodoItem {
    subject: string;
}

interface TodoItem {
    creation_time: string;
    id: number;
    last_update?: string;
    subject: string;
}

interface UpdateTodoItem {
    subject?: string;
}


let todoItemList: TodoItem[] = [];
let nextId = 0;

const NEW_TODO_ITEM_SCHEMA = joi.object({
    subject: joi.string()
        .trim()
        .required(),
});

const UPDATE_TODO_ITEM_SCHEMA = joi.object({
    subject: joi.string()
        .trim()
        .optional(),
});


/**
 * /controllers/api/Todo.ts
 *
 * Base path: '/api/Todo'
 */
export class Controller extends ControllerBase {
    /**
     * [GET] /api/Todo
     */
    @GET('/')
    public async get_all_todo_items(req: Request, res: Response) {
        return res.json(todoItemList);
    }

    /**
     * [GET] /api/Todo/:id
     */
    @GET('/:id')
    public async get_todo_item(req: Request, res: Response) {
        const ITEM = getTodoItemById(req.params['id']);
        if (!ITEM) {
            return res.status(404)
                .send();
        }

        return res.json(ITEM);
    }

    /**
     * [POST] /api/Todo
     */
    @POST('/', NEW_TODO_ITEM_SCHEMA)
    public async new_todo_item(req: Request, res: Response) {
        const NEW_ITEM_DATA: NewTodoItem = req.body;

        const NEW_ITEM: TodoItem = {
            creation_time: (new Date()).toISOString(),
            id: ++nextId,
            subject: NEW_ITEM_DATA.subject,
        };

        todoItemList.push(NEW_ITEM);

        return res.json(NEW_ITEM);
    }

    /**
     * [PUT] /api/Todo/:id
     */
    @PUT('/:id', UPDATE_TODO_ITEM_SCHEMA)
    public async update_todo_item(req: Request, res: Response) {
        const UPDATE_DATA: UpdateTodoItem = req.body;

        const ITEM = getTodoItemById(req.params['id']);
        if (!ITEM) {
            return res.status(404)
                .send();
        }

        ITEM.last_update = (new Date()).toISOString();

        if (!_.isNil(UPDATE_DATA.subject)) {
            ITEM.subject = UPDATE_DATA.subject;
        }

        return res.json(ITEM);
    }

    /**
     * [DELETE] /api/Todo/:id
     */
    @DELETE('/:id')
    public async delete_todo_item(req: Request, res: Response) {
        const ITEM = getTodoItemById(req.params['id']);
        if (!ITEM) {
            return res.status(404)
                .send();
        }

        todoItemList = todoItemList.filter(
            ti => ti !== ITEM
        );

        return res.json(ITEM);
    }
}


function getTodoItemById(id: any): TodoItem {
    id = parseInt(
        String(id).trim()
    );

    return todoItemList
        .filter(ti => ti.id === id)[0];
}
