const invalidToken = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invalid Token</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
      }
      h1 {
        text-align: center;
        padding-top: 10px;
      }
      a.verify-btn {
        display: inline;
        background-color: #007bff;
        color: #ffffff;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <h1>Invalid or expired token.</h1>
    <div style="text-align: center">
      <a href="/resend-verify-email" class="verify-btn"
        >Resend Verification Email</a
      >
    </div>
  </body>
</html>
`
const verifyEmailBody = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{brandName}} 🎉 – Let's Get Your Portfolio Ready!</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .email-body {
            padding: 20px;
            font-size: 16px;
        }

        .email-body h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }

        .email-body p {
            margin-bottom: 15px;
        }

        .email-body a.verify-btn {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }

        .divider {
            border-top: 1px solid #dddddd;
        }

        .bold {
            font-weight: bold;
        }

        .email-footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-body">
            <p>Hello {{userFullName}},</p>
            <p>We’re thrilled to have you here. You’re now part of a community that’s redefining portfolios with style and ease!</p>
            <p>Before moving ahead please confirm your email address by clicking the button below:</p>
            <a href="{{verificationUrl}}" class="verify-btn">Verify Your Email</a>
            <p>If the button above doesn’t work, please copy and paste the following link into your web browser:</p>
            <p><a href="{{verificationUrl}}">{{verificationUrl}}</a></p>
        </div>
        <div class="email-body divider">
            <h2>🚀 Let’s Get Started!</h2>
            <p>Your account is ready, and the exciting part awaits! Here’s how you can start creating your professional CV and portfolio right away:</p>
            <ul>
                <li>Choose from our beautifully designed templates to match your style and field.</li>
                <li>Fill in sections like Experience, Skills, Projects, and more. (P.S.: This is one time 😉)</li>
                <li>Customize as per your need and click on publish!</li>
                <li>Wohoooo! Your site is ready 🎉</li>
            </ul>
            <p>We can’t wait to see your portfolio shine!</p>

            <p><span class="bold">Cheers,</span><br />{{brandName}}</p>
        </div>
        <div class="email-footer divider">
            <p>Have any questions or need support? Feel free to reach out to us at <a href="mailto:support@viehgroup.com">[support@viehgroup.com]</a>.<br/>We're here to help you make the most of your portfolio!</p>
        </div>
    </div>
</body>

</html>
`

const emailAlreadyVerified = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verified</title>
  </head>
  <body>
    <h1 style="text-align: center; padding-top: 10px">
      Your email is already verified. You can login now!
    </h1>
  </body>
</html>
`

const emailVerified = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verified</title>
  </head>
  <body>
    <h1 style="text-align: center; padding-top: 10px">
      Your email is verified successfully. You can login now!
    </h1>
  </body>
</html>
`

const forgotUsernameEmailBody = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Here’s Your Username for {{brandName}}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .email-body {
            padding: 20px;
            font-size: 16px;
        }

        .email-body h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }

        .email-body h3 {
            font-size: 18px;
            color: #333333;
            margin-bottom: 15px;
        }

        .email-body p {
            margin-bottom: 15px;
        }

        .email-body a.verify-btn {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }

        .divider {
            border-top: 1px solid #dddddd;
        }

        .bold {
            font-weight: bold;
        }

        .email-footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-body">
            <p>Hello {{userFullName}},</p>
            <p>We received a request to help you retrieve your username for {{brandName}}. No worries – here it is!</p>
            <h3>Username: {{requestedUsername}}</h3>
            <p>You can use this to log in and access your account.</p>
        </div>
        <div class="email-body divider">
            <p>If you didn’t requested this username, please ignore this email. Rest assured, your account is safe, and no changes were made.</p>
            <p>If you have any questions or need additional assistance, feel free to reach out to us at <a href="mailto:support@viehgroup.com">[support@viehgroup.com]</a>.</p>
            <p>Thanks for being part of {{brandName}}! We’re here to help you build the perfect CV and portfolio.</p>

            <p><span class="bold">Best Regards,</span><br />{{brandName}}</p>
        </div>
        <div class="email-footer divider">
            <p>Have any questions or need support? Feel free to reach out to us at <a href="mailto:support@viehgroup.com">[support@viehgroup.com]</a>.<br/>We're here to help you make the most of your portfolio!</p>
        </div>
    </div>
</body>
</html>
`

const forgotPasswordEmailBody = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .email-body {
            padding: 20px;
            font-size: 16px;
        }

        .email-body h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }

        .email-body h3 {
            font-size: 18px;
            color: #333333;
            margin-bottom: 15px;
        }

        .email-body p {
            margin-bottom: 15px;
        }

        .email-body a.verify-btn {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }

        .divider {
            border-top: 1px solid #dddddd;
        }

        .bold {
            font-weight: bold;
        }

        .email-footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-body">
            <p>Hello {{userFullName}},</p>
            <p>We received a request to reset the password for your {{brandName}} account. Just click the button below to set up a new password.</p>
            <a href="{{verificationUrl}}" class="verify-btn">Reset Password</a>
            <p>If the button above doesn’t work, please copy and paste the following link into your web browser:</p>
            <p><a href="{{verificationUrl}}">{{verificationUrl}}</a></p>
        </div>
        <div class="email-body divider">
            <p>This link will expire in 2 hours for security reasons. If you didn’t requested for password reset, please ignore this email, and your password will remain the same.</p>
            <p>If you have any questions or need additional assistance, feel free to reach out to us at <a href="mailto:support@viehgroup.com">[support@viehgroup.com]</a>.</p>
            <p>Thanks for being part of {{brandName}}! We’re here to help you build the perfect CV and portfolio.</p>
            <p><span class="bold">Best Regards,</span><br />{{brandName}}</p>
        </div>
        <div class="email-footer divider">
            <p>Have any questions or need support? Feel free to reach out to us at <a href="mailto:support@viehgroup.com">[support@viehgroup.com]</a>.<br/>We're here to help you make the most of your portfolio!</p>
        </div>
    </div>
</body>
</html>
`

module.exports = {
    invalidToken,
    verifyEmailBody,
    emailAlreadyVerified,
    emailVerified,
    forgotUsernameEmailBody,
    forgotPasswordEmailBody
}