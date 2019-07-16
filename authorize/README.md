# express-controllers-samples :: Value list

A value list.

## Build and run

```bash
npm start
```

## Example

[/controllers/api/values.ts](./controllers/api/values.ts):

```typescript
import { json, Request, Response } from 'express';
import { ControllerBase, DELETE, GET, POST, PUT } from '@egodigital/express-controllers';

/**
 * /controllers/api/values.ts
 *
 * Base path: '/api/values'
 */
export class Controller extends ControllerBase {
    /**
     * [GET]  /api/values
     */
    @GET()
    public async index(req: Request, res: Response) {
        return res.send(
            JSON.stringify(
                [ "value1", "value2" ]
            )
        );
    }

    /**
     * [GET]  /api/values/:id
     */
    @GET('/:id')
    public async get_value(req: Request, res: Response) {
        return res.send(
            "value." + req.params['id']
        );
    }

    /**
     * [POST]  /api/values
     */
    @POST({
        path: '/',
        use: json(),
    })
    public async post_value(req: Request, res: Response) {
        return res.send(
            'POST: ' + JSON.stringify(req.body, null, 2)
        );
    }

    /**
     * [PUT]  /api/values/:id
     */
    @PUT({
        path: '/:id',
        use: json(),
    })
    public async put_value(req: Request, res: Response) {
        return res.send(
            'PUT (' + req.params['id'] +  '): ' + JSON.stringify(req.body, null, 2)
        );
    }

    /**
     * [DELETE]  /api/values/:id
     */
    @DELETE('/:id')
    public async delete_value(req: Request, res: Response) {
        return res.send(
            'DELETE: ' + req.params['id']
        );
    }
}
```
