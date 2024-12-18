import { Router, Request, Response, NextFunction } from 'express';
import { LoggerService } from '../services/logging.service'
const router: Router = Router({ mergeParams: true });

router.use((req: any, res: Response, next: NextFunction) => {
	req.logger = new LoggerService(req.correlationId());
	req.logger.info('Request Receieved', { content: { originalUrl: req.originalUrl, path: req.path, params: req.params, query: req.query } });
	// make sure to call next() to allow downstream midddleware to handle req
	next();
});

export default router;

