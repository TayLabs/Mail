import { type ResponseBody } from '@/types/ResponseBody';
import z from 'zod';

const sendBodySchema = z.object({
	to: z.object({
		name: z.string().optional(),
		email: z.email("Must include recipient's email"),
	}),
	subject: z.string('Must include a subject'),
	text: z.string('Must include alternate text to display'),
	html: z.string('Must include a html body for the email'),
});

type SendReqBody = z.infer<typeof sendBodySchema>;
type SendResBody = ResponseBody<{
	message: string;
}>;

export { sendBodySchema as default, type SendReqBody, type SendResBody };
