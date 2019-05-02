import * as express from 'express';
import { initControllers } from '@egodigital/express-controllers';

const app = express();

initControllers({
    app,
    cwd: __dirname + '/controllers',
});

app.listen(8080, () => {
    console.log('Example host is running on port 8080 now ...');
});