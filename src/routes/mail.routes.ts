import { authenticateKey } from '@/config/tayLab/keys';
import { send } from '@/controllers/mail.controller';
import sendBodySchema from '@/dto/send.dto';
import { validateBody } from '@/middleware/validate.middleware';
import { Router } from 'express';

const mailRoutes = Router();

mailRoutes.post(
	'/send',
	authenticateKey('mail.send'),
	validateBody(sendBodySchema),
	send
);

export default mailRoutes;
