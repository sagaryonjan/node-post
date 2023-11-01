import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { schema } from '../core/middlewares/validate';
import { loginValidator } from '../validators/auth.validator';

const router: Router = Router();
//
router.post('/login', schema(loginValidator),  authController.login);

export default router;
