# Printify Notes

**Free PDF Converter for Dark-Themed Study Materials**

Convert dark-background lecture notes from Physics Wallah, Unacademy, Vedantu, and other coaching platforms into print-friendly PDFs. Save up to 60% on ink costs while keeping your study materials private.

🌐 **Live Site:** [printifynotes.vercel.app](https://printifynotes.vercel.app)

## Features

- 🔄 **Color Inversion** - Convert dark backgrounds to light for printing
- 🎨 **Grayscale Mode** - Maximum ink savings
- 📄 **Multi-Page Layouts** - Combine 2-4 pages per sheet
- 🔒 **100% Private** - All processing in browser, no file uploads
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Instant Processing** - No waiting, no account needed

## Supported Platforms

Works with PDFs from:
- Physics Wallah (PW)
- Unacademy
- Vedantu
- BYJU'S
- Allen Digital
- Aakash
- And more...

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Build:** Vite
- **PDF Processing:** pdf.js (client-side)
- **Hosting:** Vercel

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── landing/      # Landing page sections
│   ├── printify/     # PDF conversion UI
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom React hooks
├── pages/            # Route pages
│   ├── Index.tsx     # Main landing/app
│   ├── Blog.tsx      # Blog listing
│   ├── PrivacyPolicy.tsx
│   ├── Terms.tsx
│   └── ...
└── types/            # TypeScript types
```

## Pages

- `/` - Main landing page & PDF converter
- `/about` - About us
- `/blog` - Blog articles
- `/docs` - Documentation
- `/contact` - Contact form
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service

## License

MIT © Printify Notes

---

Made with ❤️ for students who want affordable, eco-friendly printing.
