# Sixth 🎧

**Transform visual concepts into immersive spatial audio experiences.**

Built for the Voice AI Hackathon - Making the world accessible through sound, especially for people with visual impairments.

## 💡 The Problem

How do you explain "light" to someone who has never seen? Traditional text descriptions fall short. Sixth bridges this gap by creating vivid, immersive audio narratives that bring visual concepts to life through sound.

## ✨ What It Does

- 🎙️ **Voice AI Agent**: Real-time conversational agent powered by ElevenLabs
- 🎵 **Spatial Audio**: Creates immersive 3D soundscapes 
- 🌅 **Visual to Audio**: Transforms visual concepts (sunsets, colors, landscapes) into rich audio descriptions
- 🎨 **Interactive Demos**: Pre-built experiences or custom prompts
- ♿ **Accessibility First**: Designed for people with disabilities

## 🎬 Quick Demo

1. Visit the live site: [sixth-ten.vercel.app](https://sixth-ten.vercel.app)
2. Click "Generate Audio Experience"
3. Grant microphone permission
4. Listen as the AI creates an immersive audio description
5. Speak to continue the conversation!

## 🚀 Setup

```bash
# Install dependencies
npm install

# Add your ElevenLabs Agent ID
echo "NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your-agent-id" > .env.local

# Run locally
npm run dev
```

Get your Agent ID from [elevenlabs.io/app/agents](https://elevenlabs.io/app/agents)

## 🛠️ Tech Stack

- **Next.js 13** - React framework
- **ElevenLabs Agents** - Voice AI platform
- **WebRTC** - Real-time audio streaming
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

## 🎯 Features for Voice AI Hackathon

✅ **Real-time voice interaction** - Conversational AI agent  
✅ **WebRTC audio streaming** - Low-latency spatial audio  
✅ **Dynamic prompt handling** - Adapts to user requests  
✅ **Accessibility focus** - Built for visually impaired users  
✅ **Beautiful UX** - Visual feedback and animations  

## 🌐 Live Demo

**URL**: [sixth-ten.vercel.app](https://sixth-ten.vercel.app)

**Try These Prompts**:
- "How does it feel to see the sun?"
- "What does a rainbow look like?"
- "Describe a mountain horizon"

## 📝 License

© 2025 Sixth - Built for Voice AI Hackathon
