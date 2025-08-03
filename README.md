# 🌟 KidzTory - AI-Powered Children's Story Generator

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

An innovative AI-powered platform that creates personalized, engaging stories for children. KidzTory combines cutting-edge artificial intelligence with child-friendly design to generate unique stories tailored to different age groups, themes, and moods.

## ✨ Features

### 🎨 **AI Story Generation**
- **Multi-Language Support**: Generate stories in multiple languages
- **Age-Appropriate Content**: Tailored stories for different age groups
- **Theme Variety**: Adventure, fantasy, educational, and more
- **Mood Selection**: Happy, exciting, calming, or mysterious stories
- **Powered by Advanced AI**: Integration with Groq and Google Generative AI

### 👥 **User Experience**
- **User Authentication**: Secure login with NextAuth.js
- **Personal Story Library**: Save and manage your favorite stories
- **Story Sharing**: Share created stories with friends and family
- **Responsive Design**: Beautiful experience across all devices
- **Dark/Light Theme**: Comfortable reading in any environment

### 📊 **Admin Dashboard**
- **Real-time Analytics**: Track user engagement and story creation
- **User Management**: Comprehensive user administration
- **Story Moderation**: Review and manage generated content
- **Growth Metrics**: Monitor platform growth and usage patterns
- **Advanced Filtering**: Sort and search through users and stories

### 🎯 **Content Customization**
- **Interactive Story Builder**: Easy-to-use story generation interface
- **Character Customization**: Create stories with personalized characters
- **Educational Themes**: Stories that teach while entertaining
- **Cultural Sensitivity**: Inclusive content for diverse audiences

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Environment variables configured

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kidz-tory.git
   cd kidz-tory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` file with:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   MONGODB_URI=your-mongodb-connection-string
   GROQ_API_KEY=your-groq-api-key
   GOOGLE_AI_API_KEY=your-google-ai-api-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
kidz-tory/
├── app/                          # Next.js App Router
│   ├── (admin-portal)/          # Admin dashboard routes
│   ├── (pages)/                 # Main application pages
│   │   ├── (auth)/             # Authentication pages
│   │   ├── generate-story/     # Story generation interface
│   │   ├── all-stories/        # Story browsing
│   │   └── user-stories/       # Personal story library
│   ├── api/                    # API routes
│   └── globals.css             # Global styles
├── components/                  # Reusable React components
│   ├── admin/                  # Admin-specific components
│   ├── common/                 # Shared components
│   └── Home/                   # Homepage components
├── context/                    # React Context providers
├── hooks/                      # Custom React hooks
├── lib/                        # Utility libraries
├── models/                     # MongoDB models
├── store/                      # Zustand state management
├── types/                      # TypeScript type definitions
└── utils/                      # Helper functions
```

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications

### **Backend & Database**
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication
- **bcryptjs** - Password hashing

### **AI & APIs**
- **Groq SDK** - Fast AI inference
- **Google Generative AI** - Advanced language models
- **AI SDK** - Unified AI interface

### **State Management & Data Fetching**
- **Zustand** - Lightweight state management
- **TanStack React Query** - Server state management
- **Axios** - HTTP client

### **Media & Deployment**
- **Cloudinary** - Image and media management
- **Vercel** - Deployment platform (recommended)

## 📱 Key Pages & Features

### **Homepage (`/`)**
- Hero section with platform introduction
- Featured stories showcase
- Quick access to story generation

### **Story Generation (`/generate-story`)**
- Interactive form for story customization
- Real-time AI story generation
- Save and share functionality

### **Story Library (`/all-stories`)**
- Browse all public stories
- Filter by language, age group, theme
- Search functionality

### **User Dashboard (`/user-stories`)**
- Personal story collection
- Story management tools
- Reading history

### **Admin Panel (`/admin`)**
- Comprehensive analytics dashboard
- User and story management
- Platform monitoring tools

## 🔧 Configuration

### **Admin Access**
To set up admin access, configure admin emails in the environment or directly in the code:

```typescript
// In components/common/Navbar.tsx
const ADMIN_EMAILS = [
  "admin@kidztory.com",
  "your-email@example.com"
];
```

### **AI Model Configuration**
Configure your preferred AI models in the API routes:

```typescript
// Groq configuration
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Google AI configuration
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
```

## 🎨 Customization

### **Themes and Styling**
- Modify `tailwind.config.js` for custom themes
- Update `globals.css` for global styles
- Use the built-in dark/light mode toggle

### **Story Templates**
- Add new story templates in `/lib/storyTemplates.ts`
- Customize AI prompts for different story types
- Implement new age group categories

### **Languages**
- Add new language options in the story generation form
- Configure AI models for multilingual support
- Update UI translations

## 📊 Analytics & Monitoring

The admin dashboard provides comprehensive insights:

- **User Growth**: Track new registrations and active users
- **Story Analytics**: Monitor story creation trends
- **Popular Content**: Identify trending themes and languages
- **Performance Metrics**: Response times and success rates

## 🔒 Security Features

- **Secure Authentication**: NextAuth.js with multiple providers
- **Data Validation**: Input sanitization and validation
- **Admin Protection**: Role-based access control
- **API Security**: Protected routes and rate limiting
- **Content Moderation**: AI-powered content filtering

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Manual Deployment**
```bash
npm run build
npm start
```

### **Environment Variables for Production**
Ensure all required environment variables are set in your production environment.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 API Documentation

### **Story Generation API**
```typescript
POST /api/stories/generate
{
  "theme": "adventure",
  "ageGroup": "5-7",
  "language": "english",
  "mood": "exciting",
  "customPrompt": "A story about a brave little mouse"
}
```

### **User Stories API**
```typescript
GET /api/stories/user
POST /api/stories/save
DELETE /api/stories/:id
```

### **Admin APIs**
```typescript
GET /api/admin/stats
GET /api/admin/users
GET /api/admin/stories
```

## 🐛 Troubleshooting

### **Common Issues**

**AI Generation Fails**
- Check API keys are correctly configured
- Verify network connectivity
- Review API rate limits

**Authentication Issues**
- Verify NextAuth configuration
- Check database connection
- Ensure environment variables are set

**Performance Issues**
- Enable React Query caching
- Optimize database queries
- Use Next.js Image optimization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI & Groq** - For powerful AI capabilities
- **Vercel** - For excellent hosting platform
- **MongoDB** - For reliable database services
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For beautiful styling system

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join our GitHub Discussions
- **Email**: Contact us at support@kidztory.com

---

**Made with ❤️ for children's imagination and learning**

Transform bedtime stories into magical adventures with KidzTory - where AI meets creativity to inspire young minds!