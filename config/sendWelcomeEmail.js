const nodemailer = require("nodemailer");

const sendEmail = async (userEmail, userName) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3e69458d7991e3",
      pass: "eb438e04f8ee2e",
    },
  });

  const mailOptions = {
    from: "no-reply@evote.com",
    to: userEmail,
    subject: "Bun venit în familia eVote!",
    html: `
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bun venit pe eVote!</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, 
                "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                margin: 0;
                padding: 0;
                background-color: #f8f9fa;
                color: #212529;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border: 1px solid #e9ecef;
                border-radius: 10px;
                overflow: hidden;
            }
            .header {
                background-color: #0a1433;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.6;
                margin: 10px 0;
            }
            .content .highlight {
                font-weight: 500;
                color: #0a1433;
            }
            .button-container {
                text-align: center;
                margin: 20px 0;
            }
            .button {
                background-color: #e65528;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                font-size: 16px;
                font-weight: bold;
                border-radius: 5px;
                display: inline-block;
            }
            .footer {
                background-color: #f1f3f5;
                padding: 15px;
                text-align: center;
                font-size: 12px;
                color: #6c757d;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Bun venit în familia eVote!</h1>
            </div>
            <div class="content">
                <p>Salut, ${userName}</p>
                <p>Îți mulțumim că te-ai alăturat platformei noastre <strong>eVote</strong>, locul unde opiniile tale contează!</p>
                <p class="highlight">Contul tău a fost creat cu succes. Acum ești gata să participi la deciziile care contează!</p>
                <p>Accesează platforma pentru a-ți exprima votul și a te implica activ în comunitate.</p>
                <div class="button-container">
                    <a href="http://localhost:3000/login" class="button">Votează acum</a>
                </div>
                <p>Ai întrebări? Suntem aici pentru tine. Îți dorim o experiență plăcută pe eVote!</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 eVote. Toate drepturile rezervate.</p>
            </div>
        </div>
    </body>
    </html>`,
  };

  return await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
