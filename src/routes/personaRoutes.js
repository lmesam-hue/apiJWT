import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/personaController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
