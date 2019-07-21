# express-controllers-samples :: Swagger

[Swagger](https://swagger.io/) example.

## Build and run

```bash
npm start
```

## Example

### [/controllers/index.ts](./controllers/index.ts)

```typescript
import * as express from 'express';
import { initControllers } from '@egodigital/express-controllers';

const app = express();

initControllers({
    app,
    cwd: __dirname + '/controllers',
    swagger: {
        definitions: {
            'SuccessResponse': {
                "type": "object",
                "properties": {
                    "success": {
                        "description": "Indicates if operation was successful or not.",
                        "type": "boolean"
                    },
                    "data": {
                        "description": "The result data.",
                        "type": "string"
                    },
                }
            }
        },
        document: {
            host: 'api.example.com',
            info: {
                contact: {
                    email: "hello@e-go-digital.com",
                },
                description: "Describes all API endpoints.",
                title: "Test API",
                version: "1.0.0",
            },
            schemes: ['http', 'https'],
            tags: {
                'test': 'A test tag',
            },
        },
        title: 'Swagger Test',
    },
});

app.listen(8080, () => {
    console.log('Swagger document: http://localhost:8080/swagger');
});
```

### [/controllers/api/index.ts](./controllers/api/index.ts)

```typescript
import { Request, Response } from 'express';
import { ControllerBase, GET, Swagger, SwaggerPathDefinitionUpdaterContext } from '@egodigital/express-controllers';


// update each path definition with default values (s. below)
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
```
