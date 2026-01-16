# 🚀 AI-Powered Portfolio Generator

A modern, full-featured portfolio generator that helps professionals create stunning personal portfolio websites with AI assistance. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and integrated AI capabilities.

![Portfolio Generator](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📝 **Comprehensive Data Collection**
- **Personal Information**: Name, title, bio, and profile photo
- **Skills Management**: Add, categorize, and rate your skills
- **Education History**: Academic background with details
- **Work Experience**: Professional journey with achievements
- **Projects Showcase**: Display your best work with links
- **Contact Information**: Multiple contact methods and social links

### 🎨 **5 Professional Templates**
1. **Minimal Clean** - Simple and elegant design
2. **Modern Creative** - Bold and colorful aesthetics
3. **Dark Mode** - Sleek dark theme for tech professionals
4. **Student Fresh** - Perfect for graduates and students
5. **Professional Corporate** - Formal and sophisticated

### 🤖 **AI-Powered Features**
- **Bio Enhancement**: Improve your bio with AI suggestions
- **Project Descriptions**: Auto-generate compelling project descriptions
- **Skill Categorization**: Automatically organize skills into categories
- **Content Suggestions**: Get improvement recommendations

### 🎨 **Full Customization**
- **Color Themes**: Customize primary, secondary, and accent colors
- **Font Selection**: Choose from 4 professional font families
- **Section Control**: Enable/disable portfolio sections
- **Preset Themes**: Quick color presets for instant styling

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet-optimized layouts
- Desktop-ready presentations
- Print-friendly PDF exports

### 💾 **Export Options**
- **PDF Export**: Download portfolio as PDF
- **HTML/CSS/JS**: Complete website in ZIP file
- **One-Click Deploy Ready**: Compatible with:
  - GitHub Pages
  - Netlify
  - Vercel
  - Any web hosting service

### 🎯 **User Experience**
- Real-time live preview
- Multi-step form wizard
- Sample data loading
- Autosave functionality
- Drag-and-drop section ordering

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management

### Libraries
- **react-icons** - Icon components
- **html2canvas** - HTML to canvas conversion
- **jsPDF** - PDF generation
- **JSZip** - ZIP file creation
- **react-colorful** - Color picker
- **file-saver** - File download utility

### AI Integration
- OpenAI API ready (mock implementation included)
- Extensible AI service architecture

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Steps

1. **Clone or extract the project**
   ```bash
   cd "portfolio generator"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional for AI features)
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key in `.env.local`:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Usage Guide

### Step 1: Enter Your Information
1. Start with **Personal Info** - Add your name, title, and bio
2. Upload a professional photo (optional)
3. Use the **AI Improve** button to enhance your bio

### Step 2: Add Your Skills
1. Enter skills individually or paste comma-separated list
2. Use **Auto-Categorize** to organize skills
3. Adjust skill levels with sliders

### Step 3: Education & Experience
1. Add your educational background
2. Include work experience with achievements
3. Highlight key accomplishments

### Step 4: Showcase Projects
1. Add project details and descriptions
2. Use **AI Generate** for project descriptions
3. Include GitHub and live demo links

### Step 5: Contact Information
1. Add email and phone (required)
2. Include social media profiles (optional)
3. Add your location

### Step 6: Choose Template
1. Browse 5 professional templates
2. Click to preview each template
3. Select your favorite design

### Step 7: Customize
1. Pick your color scheme
2. Select font family
3. Toggle sections on/off
4. Preview changes in real-time

### Step 8: Export & Deploy
1. **Export as PDF** for job applications
2. **Export as HTML** for web deployment
3. Deploy to GitHub Pages, Netlify, or Vercel

## 📁 Project Structure

```
portfolio generator/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── ai/              # AI service endpoints
│   ├── builder/             # Portfolio builder page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── forms/              # Form components
│   │   ├── PersonalInfoForm.tsx
│   │   ├── SkillsForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── ProjectsForm.tsx
│   │   └── ContactForm.tsx
│   ├── templates/          # Portfolio templates
│   │   ├── MinimalTemplate.tsx
│   │   ├── ModernTemplate.tsx
│   │   ├── DarkTemplate.tsx
│   │   ├── StudentTemplate.tsx
│   │   └── ProfessionalTemplate.tsx
│   ├── CustomizationPanel.tsx
│   ├── ExportPanel.tsx
│   ├── PortfolioPreview.tsx
│   └── TemplateSelector.tsx
├── data/                    # Sample data
│   └── sampleData.ts
├── store/                   # State management
│   └── portfolioStore.ts
├── types/                   # TypeScript types
│   └── index.ts
├── utils/                   # Utility functions
│   ├── aiService.ts
│   └── exportUtils.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎨 Customization

### Adding New Templates
1. Create new template in `components/templates/`
2. Import in `PortfolioPreview.tsx`
3. Add to template selector

### Extending AI Features
1. Replace mock implementations in `utils/aiService.ts`
2. Add OpenAI API integration
3. Customize prompts for better results

### Custom Color Schemes
Edit `tailwind.config.js` to add more color options

## 🌐 Deployment

### GitHub Pages
1. Export as HTML
2. Extract ZIP file
3. Push to `gh-pages` branch
4. Enable GitHub Pages in repository settings

### Netlify
1. Export as HTML
2. Drag and drop ZIP to Netlify
3. Configure custom domain (optional)

### Vercel
1. Export as HTML
2. Import to Vercel
3. Deploy with automatic HTTPS

## 📝 Environment Variables

```env
# Optional: OpenAI API for AI features
OPENAI_API_KEY=your_openai_api_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Export Issues
- Ensure all required fields are filled
- Check browser console for errors
- Try disabling browser extensions

### AI Features Not Working
- Verify API key is set
- Check API rate limits
- Review error logs in browser console

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- OpenAI for AI capabilities
- React Icons for beautiful icons

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Email: support@portfolioai.com
- Documentation: [https://docs.portfolioai.com](https://docs.portfolioai.com)

## 🎯 Roadmap

- [ ] Video introductions
- [ ] Blog integration
- [ ] Multi-language support
- [ ] Custom domain configuration
- [ ] Analytics integration
- [ ] Template marketplace
- [ ] Collaborative editing
- [ ] Version history

## ⭐ Features in Detail

### Real-Time Preview
See your changes instantly as you edit. The preview updates automatically whenever you modify any information.

### Sample Data
Load pre-filled sample data to see how your portfolio will look. Perfect for testing different templates and customization options.

### Accessibility
Built with accessibility in mind:
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color options
- Semantic HTML structure

### SEO Optimized
Exported portfolios include:
- Meta tags for social media
- Structured data markup
- Optimized images
- Fast loading times

### Mobile-First Design
All templates are designed mobile-first:
- Touch-friendly interfaces
- Responsive images
- Optimized typography
- Fast performance on mobile devices

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

*Last updated: January 2026*
