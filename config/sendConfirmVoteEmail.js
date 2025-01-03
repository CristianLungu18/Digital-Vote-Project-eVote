const nodemailer = require("nodemailer");

const sendEmail = async (
  userEmail,
  userName,
  userPrenume,
  userVoteID,
  userCNP,
  voteDate
) => {
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
    <title>Confirmarea votului</title>
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
            <h1>Votul tău a fost confirmat!</h1>
        </div>
        <div class="content">
            <p>Salut, ${userName} ${userPrenume},</p>
            <p>Votul tău a fost înregistrat cu succes pe platforma <strong>eVote</strong>. Îți mulțumim pentru participare!</p>
            <p class="highlight">Detaliile votului tău:</p>
            <ul>
                <li><strong>ID vot:</strong> ${userVoteID}</li>
                <li><strong>CNP:</strong> ${userCNP}</li>
                <li><strong>Data votului:</strong> ${new Date(
                  voteDate
                ).toLocaleDateString()}</li>
            </ul>
            <p>Datele tale sunt criptate și protejate pentru a-ți asigura confidențialitatea și securitatea.</p>
            <p class="highlight">Certificatul de participare a fost generat și este disponibil pentru descărcare din contul tău.</p>
            <div class="button-container">
                <a href="http://localhost:3000/home" class="button">Home</a>
            </div>
            <p>Dacă ai întrebări sau nelămuriri, echipa noastră este aici să te ajute.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 eVote. Toate drepturile rezervate.</p>
        </div>
    </div>
</body>
</html>
    `,
  };

  return await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
