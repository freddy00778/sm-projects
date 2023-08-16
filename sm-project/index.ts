import 'dotenv/config';

import express from 'express'
import cors from 'cors';
import {addRespondToResponse} from './src/middleware/response';
import {handleError} from './src/middleware/errors';
import {attachPublicRoutes} from './src/routes/v1/routes';
import bodyParser from "body-parser";
import * as swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "./swagger.json"
// import * as Sentry from "@sentry/node"
// import * as Tracing from "@sentry/tracing"
// import * as NodeCron from "node-cron"
// import DataProvider from "./src/data/DataProvider";

//@ts-ignore
import {processUserReminderEmail} from "./src/services/email/reminders/processUserReminderEmail";
//@ts-ignore
import {processAllCompletedNotificationsToAdministrator} from "./src/services/email/reminders/processAllCompletedNotificationsToAdministrator";

import crypto from 'crypto';
import cookieParser from "cookie-parser";

const initializeExpress = async () => {
    const app = express();
    app.use(cookieParser())

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // @ts-ignore
    app.use((req, res, next) => {
        const csrfToken = generateCSRFToken();
        res.cookie('XSRF-TOKEN', csrfToken);
        res.locals.csrfToken = csrfToken;
        next();
    });

    app.use(cors());
    const allowedOrigins = [
        'changeverveacademy.com',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://sm-beta-changeverveacademy.com',
        'https://sm-alpha.changeverveacademy.com',
        'http://sm-alpha.changeverveacademy.com',
    ];

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // <-- Add this line
    }));

    const path = require('path')
    console.log(path.join(__dirname, 'public'))
    app.use('/static', express.static(path.join(__dirname, 'public')))
    app.use(express.json())
    // app.use(express.urlencoded())
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(addRespondToResponse);

    // Sentry.init({
    //     dsn: "https://0f9b603297a1473188c6584dd1858f0d@o4504661266333696.ingest.sentry.io/4504661284487168",
    //     integrations: [
    //         new Sentry.Integrations.Http({tracing: true}),
    //         new Tracing.Integrations.Express({app}),
    //     ],
    //     tracesSampleRate: 1.0,
    // });

    app.use(handleError);
    attachPublicRoutes(app);

    app.listen( 5055, () => {
        console.log(`Server listening  5055`);
    });
}

const initializeApp = async (): Promise<void> => {
    await initializeExpress();
}

initializeApp();


function generateCSRFToken() {
    return crypto.randomBytes(100).toString('hex');
}
