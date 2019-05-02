import { Request, Response } from 'express';
import { ControllerBase, GET, ResponseSerializerContext } from '@egodigital/express-controllers';

/**
 * /controllers/index.ts
 *
 * Base path: '/'
 */
export class Controller extends ControllerBase {
    // serialize the results of any
    // controller route method and
    // send each as response
    public __serialize(context: ResponseSerializerContext) {
        return context.response
            .header('Content-Type', 'application/json')
            .send(JSON.stringify(
                context.result  // result of 'index()', e.g.
            ));
    }

    /**
     * [GET] / relative endpoint
     */
    @GET()
    public async index(req: Request, res: Response) {
        // this object is serialized and
        // send by '__serialize()' (s. above)
        return {
            success: true,
            data: {
                'TM': '1979-09-05 23:09'
            },
        };
    }
}