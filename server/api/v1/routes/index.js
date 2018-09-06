import DDOS from 'ddos';
import { Router } from 'express';

const router = Router();

if (process.env.DEV_ENV !== 'true') {
	const ddos = new DDOS();
	router.use(ddos.express);
}

router.get('/hello/:name', (req, res) => res.send({ hello: req.params.name }));

export default router;