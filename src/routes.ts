import { Router } from 'express';

import postRoutes from './routes/post.routes';
import authRoutes from './routes/auth.routes';
import docRoutes from './routes/doc.routes';


const router: Router = Router();

router.use('/posts', postRoutes);
router.use('/auth', authRoutes);

router.use('/docs', docRoutes); // swagger doc route

export default router;
