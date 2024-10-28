# One Time Link

This is a simple app that allows you to create a one-time link for a user to access a resource.

## Features

- Create one-time links for secure sharing of sensitive information
- End-to-end encryption using AES-256
- Support for text content and file uploads (up to 10MB)
- AWS S3 integration for secure file storage
- Custom SMTP server support
- PostgreSQL database for reliable storage
- Automatic data deletion after 24 hours or first access
- Simple and intuitive user interface

## Prerequisites

- Node.js (v14 or later)
- pnpm package manager
- PostgreSQL database
- AWS Account with S3 access

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/byigitt/onetimelink.git
   cd onetimelink
   ```

2. Install dependencies:
   ```bash
   pnpm install
   pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
   ```

3. Set up the database:
   - Create a PostgreSQL database
   - Run the schema file from `db/schema.sql`

4. Set up AWS S3:
   - Create an S3 bucket in your AWS account
   - Create an IAM user with S3 access
   - Note down the access key and secret key

5. Create a `.env` file in the root directory with the following:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://user:password@localhost:5432/onetimelink

   # SMTP Configuration
   SMTP_HOST=your-smtp-server.com
   SMTP_PORT=587
   SMTP_USER=your-email@domain.com
   SMTP_PASS=your-password

   # AWS S3 Configuration
   AWS_REGION=your-region
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_BUCKET_NAME=your-bucket-name

   # File Size Limit (10MB in bytes)
   MAX_FILE_SIZE=10485760

   # App URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

6. Configure S3 CORS policy:
   ```json
   {
       "CORSRules": [
           {
               "AllowedHeaders": ["*"],
               "AllowedMethods": ["GET", "PUT", "POST"],
               "AllowedOrigins": ["your-domain.com"],
               "ExposeHeaders": []
           }
       ]
   }
   ```

7. Start the development server:
   ```bash
   pnpm dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter the text content or upload a file (max 10MB).
2. Optionally provide an email address for automatic link delivery.
3. Click "Generate Link" to create a one-time access link.
4. Share the generated link with the intended recipient.
5. The link will expire after 24 hours or first access.

## Deployment

1. Set up a PostgreSQL database in your production environment
2. Configure your SMTP server details
3. Set up AWS S3 bucket and IAM user
4. Deploy to your preferred platform (Vercel, Railway, etc.)
5. Set the environment variables in your deployment platform

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP server port (usually 587 or 465)
- `SMTP_USER`: SMTP account username/email
- `SMTP_PASS`: SMTP account password
- `AWS_REGION`: AWS region for S3 bucket
- `AWS_ACCESS_KEY_ID`: AWS IAM access key
- `AWS_SECRET_ACCESS_KEY`: AWS IAM secret key
- `AWS_BUCKET_NAME`: S3 bucket name
- `MAX_FILE_SIZE`: Maximum file size in bytes (default: 10MB)
- `NEXT_PUBLIC_BASE_URL`: Your application's base URL

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js for the React framework
- Tailwind CSS for styling
- Shadcn UI for UI components
- PostgreSQL for database
- AWS S3 for file storage
- Nodemailer for email handling
