import { Resend } from 'resend';

const resend = new Resend('re_ZqQo32C4_rsuzV5pbm3TxA9x3hB4JCyPo');

async function send() {
  try {
    console.log('Sending...');
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'zahradaycare786@gmail.com',
      subject: 'Test',
      html: 'Test'
    });
    console.log('Done:', result);
  } catch (err) {
    console.error('Err:', err);
  }
}
send();
