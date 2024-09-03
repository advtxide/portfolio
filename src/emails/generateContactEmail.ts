export function generateContactEmailHtml(
  name: string,
  email: string,
  message: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: hsl(60, 5%, 90%); background-color: hsl(240, 5%, 6%); margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: hsl(240, 4%, 10%); border-radius: 8px; padding: 20px;">
        <h1 style="color: hsl(240, 0%, 90%); margin-top: 0;">New Contact Form Submission</h1>
        <p>You have received a new message from the contact form on your portfolio website. Here are the details:</p>
        <hr style="border: 1px solid hsl(240, 5%, 25%); margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr style="border: 1px solid hsl(240, 5%, 25%); margin: 20px 0;">
        <p>Remember to respond to this inquiry promptly to maintain good customer relations.</p>
      </div>
    </body>
    </html>
  `;
}
