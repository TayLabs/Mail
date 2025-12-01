import mailtrap from '@/config/mailtrap';
import { SendReqBody, SendResBody } from '@/dto/send.dto';
import { controller } from '@/middleware/controller.middleware';
import HttpStatus from '@/types/HttpStatus.enum';

export const send = controller<SendReqBody, SendResBody>(
  async (req, res, _next) => {
    // const response = await mailtrap.send({
    //   from: { name: 'TayLab Auth', email: 'hello@taylorkelley.dev' },
    //   reply_to: { email: 'contact@taylorkelley.dev' },
    //   to: [{ name: req.body.to.name, email: req.body.to.email }],
    //   subject: req.body.subject,
    //   text: req.body.text,
    //   html: req.body.html,
    // });

    res.status(HttpStatus.OK).json({
      success: true,
      data: {
        message: 'Email sent',
        // mailId: response.mailId,
      },
    });
  }
);
