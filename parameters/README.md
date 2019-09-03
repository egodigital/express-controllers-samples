# express-controllers-samples :: Parameters

Example API, that shows how to categorize endpoints via parameters.

## Build and run

```bash
npm start
```

## Example

[/controllers/api/users/@user_id/index.ts](./controllers/api/@user_id/index.ts):

```typescript
import { Request, Response } from 'express';
import { ControllerBase, GET } from '@egodigital/express-controllers';

interface IUser {
    name: string;
}

const ALL_USERS: IUser[] = [
    // user_id: 1
    {
        name: 'Marcel Kloubert',
    },
    // user_id: 2
    {
        name: 'Tanja M.',
    },
    // user_id: 3
    {
        name: 'Bill Gates',
    },
    // user_id: 4
    {
        name: 'Anders Hejlsberg',
    },
];

/**
 * /controllers/api/users/@user_id/index.ts
 *
 * Base path: '/api/users/:user_id'
 */
export class Controller extends ControllerBase {
    /**
     * [GET]  /
     */
    @GET('/')
    public async index(req: Request, res: Response) {
        const USER_ID = parseInt(req.params['user_id'].trim());

        const USER = ALL_USERS[USER_ID - 1];
        if (USER) {
            return res.json(USER);
        }

        return res.status(404)
            .send();
    }
}
```
