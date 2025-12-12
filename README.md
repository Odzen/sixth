# Sixth - Immersive Audio Experiences

Experience the world through immersive audio. Sixth creates spatial audio experiences for everyone, making content accessible and engaging for all, especially for people with disabilities.

## 🎯 Features

- **Interactive Audio Generation**: Real-time immersive audio experiences powered by ElevenLabs AI
- **Pre-defined Prompts**: Quick-start experiences like "Experience the Sun" or "Journey to the Moon"
- **Custom Prompts**: Create your own unique audio experiences
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Beautiful UI**: Modern design with smooth animations and visual feedback

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- An [ElevenLabs](https://elevenlabs.io) account
- Microphone access for audio generation

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sixth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up ElevenLabs** (Required for audio generation)
   
   See [ELEVENLABS_SETUP.md](./ELEVENLABS_SETUP.md) for detailed instructions.
   
   Quick setup:
   - Create an agent at [elevenlabs.io/app/agents](https://elevenlabs.io/app/agents)
   - Copy your Agent ID
   - Create `.env.local` file:
     ```env
     NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your-agent-id-here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

### ElevenLabs Integration

This project uses the [ElevenLabs Agents Platform React SDK](https://elevenlabs.io/docs/agents-platform/libraries/react) for real-time audio generation.

For complete setup instructions, see [ELEVENLABS_SETUP.md](./ELEVENLABS_SETUP.md).

### Project Structure

```
sixth/
├── app/
│   ├── page.tsx          # Main page with state management
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── components/
│   ├── sections/
│   │   ├── Hero.tsx      # Main demo section with ElevenLabs integration
│   │   ├── Problem.tsx   # Mission statement
│   │   ├── HowItWorks.tsx # Process explanation
│   │   ├── UseCases.tsx  # Interactive demo cards
│   │   ├── Navbar.tsx    # Navigation
│   │   └── Footer.tsx    # Footer with waitlist
│   └── ui/               # Reusable UI components (shadcn/ui)
└── lib/
    └── utils.ts          # Utility functions
```

## 🎨 Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Audio**: [ElevenLabs Agents Platform](https://elevenlabs.io/docs/agents-platform/overview)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🎯 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## 🌐 Deployment

This project is configured for deployment on [Netlify](https://www.netlify.com/).

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`
4. Deploy!

### Environment Variables

For production deployment, make sure to set:
- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` - Your ElevenLabs Agent ID

## 📝 License

All rights reserved © 2025 Sixth

## 🤝 Support

For issues or questions:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common errors and solutions
- Check [ELEVENLABS_SETUP.md](./ELEVENLABS_SETUP.md) for setup help
- Review the [ElevenLabs Documentation](https://elevenlabs.io/docs)
- Open an issue in this repository
