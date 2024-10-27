export function generateOneTimeLinkEmail(link: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your One-Time Link</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            border-radius: 8px;
            padding: 20px;
          }
          .link {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            word-break: break-all;
            margin: 20px 0;
          }
          .warning {
            color: #666;
            font-size: 0.9em;
            border-top: 1px solid #eee;
            margin-top: 20px;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Your One-Time Link is Ready</h1>
          <p>Here's your secure one-time link:</p>
          <div class="link">
            <a href="${link}">${link}</a>
          </div>
          <div class="warning">
            <p><strong>Important:</strong></p>
            <ul>
              <li>This link will expire after 24 hours</li>
              <li>The link can only be accessed once</li>
              <li>The content will be permanently deleted after access</li>
            </ul>
            <p>For security reasons, please ensure you share this link securely.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
