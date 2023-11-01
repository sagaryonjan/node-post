import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { schema } from '../core/middlewares/validate';
import { postValidator } from '../validators/post.validator';
import authenticate from '../core/middlewares/authenticate';

const router: Router = Router();

router.get('/', authenticate, postController.fetchAll);
router.get('/:id', authenticate, postController.getPostById);
router.post('/', authenticate, schema(postValidator),  postController.create);
router.put('/:id', authenticate, schema(postValidator),  postController.update);
router.delete('/:id', authenticate, postController.deleteById);

export default router;
