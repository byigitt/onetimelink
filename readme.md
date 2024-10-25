# One Time Link

This is a simple app that allows you to create a one-time link for a user to access a resource.

## Features

- Create one-time links for secure sharing of sensitive information
- End-to-end encryption using AES-256
- Support for text content and file uploads (up to 100MB)
- No account required
- Automatic data deletion after 24 hours or first access
- Simple and intuitive user interface

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/byigitt/onetimelink.git
   cd onetimelink
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. On the home page, enter the text content or upload a file you want to share.
2. Click the "Generate Link" button.
3. Copy the generated link and share it with the intended recipient.
4. The recipient can access the content only once by visiting the link.

## Deployment

This project can be easily deployed to Vercel:

1. Push your code to a GitHub repository.
2. Connect your GitHub account to Vercel.
3. Create a new project in Vercel and select your repository.
4. Configure the environment variables in Vercel's project settings.
5. Deploy the project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js for the React framework
- Tailwind CSS for styling
- Shadcn UI for UI components
