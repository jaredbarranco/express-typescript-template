import { Router, Request, Response } from 'express';

const router: Router = Router({ mergeParams: true });

// healthcheck endpoint for uptime and status
router.get('/', (req: Request, res: Response) => {
	const data: object = {
		uptime: process.uptime(),
		message: 'Ok',
		date: new Date()
	}
	res.status(200).send(data);
});

export default router;
