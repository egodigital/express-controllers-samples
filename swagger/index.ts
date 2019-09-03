import * as express from 'express';
import { initControllers } from '@egodigital/express-controllers';

const app = express();

initControllers({
    app,
    cwd: __dirname + '/controllers',
    swagger: {
        // s. https://swagger.io/docs/specification/2-0/describing-responses/
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
