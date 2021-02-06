import { Request, Response } from 'express';
import { Authorize, AuthorizeFailedHandlerContext, AuthorizeHandlerContext, ControllerBase, GET } from '@egodigital/express-controllers';

interface IUser {
    allowed_resources: string[];
}

enum AuthFailedReason {
    InvalidUserID,
    UserNotFound,
}

const ALL_USERS: IUser[] = [
    // user_id: 1
    {
        allowed_resources: ['a', 'b'],
    },
    // user_id: 2
    {
        allowed_resources: ['a', 'c'],
    },
    // user_id: 3
    {
        allowed_resources: ['b', 'c'],
    },
    // user_id: 4
    {
        allowed_resources: ['a', 'b', 'c'],
    },
    // user_id: 5
    {
        allowed_resources: ['a'],
    },
    // user_id: 6
    {
        allowed_resources: ['b'],
    },
    // user_id: 7
    {
        allowed_resources: ['c'],
    },
];

/**
 * /controllers/api/index.ts
 *
 * Base path: '/api'
 */
export class Controller extends ControllerBase {
    // check if authorized
    public async __authorize(context: AuthorizeHandlerContext) {
        const USER_ID = parseInt(context.request.params['user_id'].trim());
        if (isNaN(USER_ID)) {
            context.reason = AuthFailedReason.InvalidUserID;
            return;
        }

        const USER = ALL_USERS[USER_ID - 1];
        if (!USER) {
            context.reason = AuthFailedReason.UserNotFound;
            return;
        }

        for (const RES of context.resources) {
            if (USER.allowed_resources.indexOf(RES) > -1) {
                return true;  // found
            }
        }
    }

    // handle failed authorization
    public async __authorizeFailed(context: AuthorizeFailedHandlerContext) {
        // s. result of __authorize()
        const REASON = context.reason as AuthFailedReason;

        switch (REASON) {
            case AuthFailedReason.InvalidUserID:
                return context.response
                    .status(400)
                    .send();

            case AuthFailedReason.UserNotFound:
                return context.response
                    .status(404)
                    .send();
        }
    }


    /**
     * [GET]  /api/:user_id/a
     */
    @Authorize('a')
    @GET('/:user_id/a')
    public async a(req: Request, res: Response) {
        return res.send('OK: a');
    }

    /**
     * [GET]  /api/:user_id/b
     */
    @Authorize('b')
    @GET('/:user_id/b')
    public async b(req: Request, res: Response) {
        return res.send('OK: b');
    }

    /**
     * [GET]  /api/:user_id/c
     */
    @Authorize('c')
    @GET('/:user_id/c')
    public async c(req: Request, res: Response) {
        return res.send('OK: c');
    }
}
