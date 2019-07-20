import { Request, Response } from 'express';
import { ControllerBase, GET, Swagger, SwaggerPathDefinitionUpdaterContext } from '@egodigital/express-controllers';

/**
 * /controllers/api/index.ts
 *
 * Base path: '/api'
 */
export class Controller extends ControllerBase {
    /**
     * [GET]  /api
     */
    @GET()
    // s. https://swagger.io/docs/specification/2-0/paths-and-operations/
    @Swagger({
        "tags": [
            "test"
        ],
        "summary": "A test.",
        "produces": [
            "application/json"
        ],
        "parameters": [
            {
                "in": "header",
                "name": "X-My-Header",
                "required": false,
                "type": "string"
            },
        ],
        "responses": {
            "200": {
                "description": "Operation was successful.",
                "schema": {
                    "$ref": "#/definitions/SuccessResponse",
                }
            },
        }
    }, pathDefinitionUpdater)
    public async index(req: Request, res: Response) {
        return res.json({
            success: true,
            data: 'Swagger test: OK',
        });
    }
}


// update each path definition with default values
function pathDefinitionUpdater(ctx: SwaggerPathDefinitionUpdaterContext) {
    // Bad Request
    ctx.definition['responses']['400'] = {
        "description": "Bad request!"
    };

    // Internal Server Error
    ctx.definition['responses']['500'] = {
        "description": "Operation was failed!"
    };
}
