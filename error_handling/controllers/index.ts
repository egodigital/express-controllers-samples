import * as express from 'express';
import { ControllerBase, GET, RequestErrorHandlerContext } from '@egodigital/express-controllers';

/**
 * /controllers/index.ts
 *
 * Base path: '/'
 */
export class Controller extends ControllerBase {
    // handle exceptions
    public __error(context: RequestErrorHandlerContext) {
        return context.response
            .status(500)
            .send('SERVER ERROR: ' + context.error);
    }

    /**
     * [GET] / endpoint
     */
    @GET()
    public async index(req: express.Request, res: express.Response) {
        // all request error, like that
        // will be handled by
        // '__error()' method
        throw new Error('Test error!');
    }
}