import { Router } from 'express';
import path from 'path';
import YAML from 'yamljs';
import swaggerUi from "swagger-ui-express";

const router: Router = Router();

const swaggerJSDocs = YAML.load(path.join(__dirname, '..', 'docs', 'api.yaml'));

const options = {
	customCss: '.swagger-ui .topbar { display: none }',
	customSiteTitle: 'Node Blog | API Documentation',
};

router.use('/', swaggerUi.serve,  swaggerUi.setup(swaggerJSDocs, options));
export default router;
