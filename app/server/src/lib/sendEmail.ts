import sgMail, { MailDataRequired } from '@sendgrid/mail';

const sendEmail = async (message: MailDataRequired) => {
  const apiKeys = process.env.SENDGRID_API_KEY as string;

  try {
    sgMail.setApiKey(apiKeys);
    const res = await sgMail.send(message);
    return true;
  } catch (err) {
    console.log('Error from sendGrid ', err);
    return false;
  }
};

export default sendEmail;
