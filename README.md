# Droply - Disposable Email Service

<div align="center">
  <img src="public/droply-icon.svg" alt="Droply Logo" width="120" />
  <h3>Secure, disposable email addresses for everyone</h3>
  <p>A modern, feature-rich temporary email service built with React and Vite</p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react" alt="React Version" />
    <img src="https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite" alt="Vite Version" />
    <img src="https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css" alt="Tailwind Version" />
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
  </p>
</div>

## 🌟 Features

- **Instant Email Generation**: Create disposable email addresses with a single click
- **No Time Limits**: Emails remain accessible as long as you need them
- **Full Inbox Features**: View, read, and manage messages with attachments
- **Real-time Updates**: Automatic message checking and instant notifications
- **Multiple Addresses**: Create and manage multiple disposable email addresses
- **Secure Storage**: Encrypted message storage with user privacy in focus
- **Modern UI**: Beautiful, responsive interface with dark mode
- **Mobile Friendly**: Optimized experience for all devices

## 🚀 Demo

Visit [Droply](https://droply.stackblitz.io) to try out the live demo.

![Droply Screenshot](https://i.imgur.com/XYZ123.png)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: 
  - Headless UI
  - Radix UI
  - Vaul (Drawer)
- **Icons**: React Icons (Feather)
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **API**: mail.tm

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stackblitz/droply.git
   cd droply
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.mail.tm
```

## 📖 Usage

1. **Generate Email**: Click the "New Email" button to create a disposable email address
2. **View Messages**: Messages appear automatically in the inbox
3. **Read Content**: Click on any message to view its full content and attachments
4. **Manage Account**: Use the account dialog to switch between or create new addresses

## 🔒 Security Features

- **Row Level Security**: Each account's data is isolated
- **Encrypted Storage**: All messages are stored securely
- **No Personal Data**: No registration or personal information required
- **Session Management**: Secure token-based authentication

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📝 Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Conventional Commits for commit messages

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **StackBlitz** - *Initial work* - [StackBlitz](https://github.com/stackblitz)

## 📚 Documentation

- [API Documentation](docs/API.md)
- [Component Documentation](docs/COMPONENTS.md)
- [Architecture Overview](docs/ARCHITECTURE.md)

## 🙏 Acknowledgments

- [mail.tm](https://mail.tm) for the email API
- [Feather Icons](https://feathericons.com) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for the styling system

## 📊 Project Status

Droply is in active development. Check our [roadmap](ROADMAP.md) for upcoming features.

## 📞 Support

- Create a [GitHub Issue](https://github.com/stackblitz/droply/issues)
- Join our [Discord Community](https://discord.gg/stackblitz)
- Email us at support@stackblitz.com

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=stackblitz/droply&type=Date)](https://star-history.com/#stackblitz/droply&Date)