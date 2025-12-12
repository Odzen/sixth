'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Volume2, Mic, MicOff, Loader2 } from 'lucide-react';
import { useConversation } from '@elevenlabs/react';
import { useToast } from '@/hooks/use-toast';

const predefinedPrompts = [
  'How does it feel to see the sun?',
  'What does a rainbow look like?',
  'Describe the colors of a sunset',
  'How does light reflect on water?',
  'Custom prompt...',
];

interface HeroProps {
  selectedPrompt?: string | null;
  clearSelectedPrompt?: () => void;
}

export function Hero({ selectedPrompt: externalPrompt, clearSelectedPrompt }: HeroProps) {
  const [selectedPrompt, setSelectedPrompt] = useState(predefinedPrompts[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [promptSent, setPromptSent] = useState(false);
  const maxLength = 100;
  const { toast } = useToast();

  // Initialize ElevenLabs conversation
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs agent');
      setIsGenerating(false); // Connection established, no longer in connecting state
      setHasStarted(true);
      setPromptSent(false); // Reset prompt sent flag on new connection
      toast({
        title: "Connected",
        description: "Audio agent is ready. Speak or type your request...",
      });
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs agent');
      setIsGenerating(false);
      setHasStarted(false);
      setPromptSent(false);
    },
    onError: (error: unknown) => {
      console.error('Conversation error:', error);
      
      let errorMessage = "Failed to generate audio. Please try again.";
      
      // Handle specific error cases
      if (error && typeof error === 'object') {
        if ('message' in error && typeof (error as any).message === 'string') {
          errorMessage = (error as any).message;
        } else if ('error_type' in error) {
          errorMessage = `Agent error: ${(error as any).error_type}`;
        }
      }
      
      toast({
        title: "Connection Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsGenerating(false);
      setHasStarted(false);
      
      // Try to end the session cleanly
      try {
        conversation.endSession();
      } catch (e) {
        // Ignore cleanup errors
      }
    },
    onMessage: (message) => {
      console.log('Message received:', message);
    },
  });

  // Update prompt when external prompt is set
  useEffect(() => {
    if (externalPrompt) {
      setSelectedPrompt(externalPrompt);
      setIsCustom(false);
      setCustomPrompt('');
      if (clearSelectedPrompt) {
        clearSelectedPrompt();
      }
    }
  }, [externalPrompt, clearSelectedPrompt]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePromptChange = (prompt: string) => {
    if (prompt === 'Custom prompt...') {
      setIsCustom(true);
      setSelectedPrompt('');
    } else {
      setIsCustom(false);
      setSelectedPrompt(prompt);
    }
  };

  const handleGenerate = async () => {
    const finalPrompt = isCustom ? customPrompt : selectedPrompt;
    
    console.log('🎵 Generate clicked, prompt:', finalPrompt);
    
    if (!finalPrompt.trim()) {
      console.log('❌ No prompt selected');
      toast({
        title: "No prompt selected",
        description: "Please select or enter a prompt to generate audio.",
        variant: "destructive",
      });
      return;
    }

    // Check if agent ID is configured
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
    console.log('🔑 Agent ID configured:', !!agentId, agentId ? `(${agentId.substring(0, 8)}...)` : '(missing)');
    
    if (!agentId || agentId === 'your-agent-id-here') {
      console.log('❌ Agent ID not configured');
      toast({
        title: "Configuration Required",
        description: "Please set NEXT_PUBLIC_ELEVENLABS_AGENT_ID in Vercel environment variables.",
        variant: "destructive",
      });
      alert('ElevenLabs Agent ID is not configured. Please add NEXT_PUBLIC_ELEVENLABS_AGENT_ID to your Vercel environment variables.');
      return;
    }

    try {
      setIsGenerating(true);
      console.log('⏳ Starting connection...');

      // Request microphone access first
      console.log('🎤 Requesting microphone access...');
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('✅ Microphone access granted');
      } catch (micError) {
        console.error('❌ Microphone access denied:', micError);
        toast({
          title: "Microphone Required",
          description: "Please grant microphone permission to use this feature.",
          variant: "destructive",
        });
        alert('Microphone access is required. Please grant permission and try again.');
        setIsGenerating(false);
        return;
      }

      // Start the conversation with the agent
      console.log('🚀 Starting ElevenLabs session...');
      const conversationId = await conversation.startSession({
        agentId: agentId,
        connectionType: 'webrtc',
      });

      console.log('✅ Conversation started with ID:', conversationId);
      
      toast({
        title: "Generating Audio",
        description: "Creating your immersive audio experience...",
      });
    } catch (error) {
      console.error('❌ Failed to start conversation:', error);
      
      let errorMessage = "Failed to start audio generation";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        console.log('Error details:', error.message);
        
        // Handle specific error types
        if (error.message.includes('401') || error.message.includes('unauthorized')) {
          errorMessage = "Invalid Agent ID. Please check your configuration.";
        } else if (error.message.includes('404')) {
          errorMessage = "Agent not found. Please verify your Agent ID.";
        } else if (error.message.includes('network')) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
      alert(`Connection failed: ${errorMessage}`);
      setIsGenerating(false);
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
      setIsGenerating(false);
      setHasStarted(false);
      toast({
        title: "Session Ended",
        description: "Audio generation stopped.",
      });
    } catch (error) {
      console.error('Failed to end conversation:', error);
      // Still set generating to false even if ending fails
      setIsGenerating(false);
      setHasStarted(false);
    }
  };

  // Send user prompt after agent's first message (only once per connection)
  useEffect(() => {
    // Only send if connected, not already sent, and we have a prompt
    if (hasStarted && conversation.status === 'connected' && !promptSent) {
      const finalPrompt = isCustom ? customPrompt : selectedPrompt;
      
      if (!finalPrompt || !finalPrompt.trim()) {
        return; // Don't send empty prompts
      }

      // Wait for agent's first message, then send user prompt
      const timer = setTimeout(() => {
        console.log('Sending prompt to agent:', finalPrompt);
        conversation.sendUserMessage(finalPrompt);
        setPromptSent(true); // Mark as sent to prevent duplicates
      }, 2000); // Wait 2 seconds for agent to finish greeting

      return () => clearTimeout(timer);
    }
  }, [hasStarted, conversation.status, promptSent, selectedPrompt, customPrompt, isCustom]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-deep-charcoal pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Experience the world through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-bright-yellow">
              immersive audio
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed">
            Sixth creates immersive spatial audio experiences for everyone. We transform concepts and ideas into rich soundscapes, making content accessible and engaging for all, especially for people with disabilities.
          </p>

          <Button
            onClick={() => scrollToSection('technology')}
            className="bg-neon-blue text-deep-charcoal hover:!bg-bright-yellow hover:!shadow-bright-yellow/50 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-2xl shadow-neon-blue/40 group transition-all hover:scale-105"
          >
            Experience the Technology
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/5 backdrop-blur-sm border-2 border-neon-blue/30 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48">
                <motion.div
                  animate={{
                    scale: conversation.status === 'connected' ? [1, 1.2, 1] : [1, 1.1, 1],
                    opacity: conversation.status === 'connected' ? [0.6, 0.9, 0.6] : [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: conversation.isSpeaking ? 1 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 rounded-full blur-2xl ${
                    conversation.status === 'connected'
                      ? 'bg-gradient-to-br from-bright-yellow to-neon-blue'
                      : 'bg-gradient-to-br from-neon-blue to-bright-yellow'
                  }`}
                />

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: conversation.status === 'connected' ? 10 : 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className={`absolute inset-0 rounded-full border-2 ${
                    conversation.status === 'connected' ? 'border-bright-yellow/50' : 'border-neon-blue/30'
                  }`}
                  style={{
                    borderStyle: 'dashed',
                  }}
                />

                <motion.div
                  animate={{
                    scale: conversation.isSpeaking ? [1, 1.1, 1] : [1, 1.05, 1],
                  }}
                  transition={{
                    duration: conversation.isSpeaking ? 0.5 : 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-4 rounded-full shadow-2xl flex items-center justify-center ${
                    conversation.status === 'connected'
                      ? 'bg-gradient-to-br from-bright-yellow to-neon-blue shadow-bright-yellow/50'
                      : 'bg-gradient-to-br from-neon-blue to-bright-yellow shadow-neon-blue/50'
                  }`}
                >
                  {conversation.status === 'connected' ? (
                    conversation.isSpeaking ? (
                      <Volume2 className="w-16 h-16 text-white animate-pulse" strokeWidth={2} />
                    ) : (
                      <Mic className="w-16 h-16 text-white" strokeWidth={2} />
                    )
                  ) : (
                    <Volume2 className="w-16 h-16 text-white" strokeWidth={2} />
                  )}
                </motion.div>

                {conversation.status === 'connected' && (
                  <motion.div
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 bg-bright-yellow rounded-full"
                  />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-white font-semibold text-base sm:text-lg block">
                  Try an Experience
                </label>
                {!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID === 'your-agent-id-here' ? (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-xs sm:text-sm">
                    <p className="text-yellow-400 font-semibold mb-1">⚠️ Setup Required</p>
                    <p className="text-yellow-300/80">
                      Configure your ElevenLabs Agent ID in <code className="bg-black/30 px-1 rounded">.env.local</code>
                    </p>
                    <p className="text-yellow-300/60 mt-1">
                      See <code className="bg-black/30 px-1 rounded">ELEVENLABS_SETUP.md</code> for instructions
                    </p>
                  </div>
                ) : conversation.status === 'disconnected' && !isGenerating ? (
                  <p className="text-white/50 text-xs sm:text-sm">
                    🎤 Microphone access will be requested when you start
                  </p>
                ) : null}
              </div>

              {!isCustom ? (
                <select
                  value={selectedPrompt}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  className="w-full bg-white/10 border-2 border-neon-blue/30 text-white rounded-lg px-4 py-3 text-lg focus:border-neon-blue focus:outline-none"
                >
                  {predefinedPrompts.map((prompt) => (
                    <option key={prompt} value={prompt} className="bg-deep-charcoal">
                      {prompt}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter your question..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value.slice(0, maxLength))}
                    maxLength={maxLength}
                    className="bg-white/10 border-2 border-neon-blue/30 text-white placeholder:text-white/40 text-base sm:text-lg focus:border-neon-blue"
                  />
                  <div className="flex justify-between items-center text-sm">
                    <button
                      onClick={() => setIsCustom(false)}
                      className="text-neon-blue hover:underline"
                    >
                      Back to presets
                    </button>
                    <span className="text-white/60">
                      {customPrompt.length}/{maxLength}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Button
                  onClick={handleGenerate}
                  disabled={(isCustom && !customPrompt.trim()) || isGenerating || conversation.status === 'connected'}
                  className="w-full bg-gradient-to-r from-neon-blue to-bright-yellow text-deep-charcoal hover:!from-bright-yellow hover:!to-neon-blue font-semibold text-base sm:text-lg py-5 sm:py-6 shadow-xl group transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {conversation.status === 'connected' ? (
                    <>
                      <Volume2 className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                      Playing Audio Experience
                    </>
                  ) : isGenerating ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                      Generate Audio Experience
                    </>
                  )}
                </Button>

                {conversation.status === 'connected' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                      {conversation.isSpeaking ? (
                        <>
                          <Volume2 className="w-4 h-4 animate-pulse text-neon-blue" />
                          <span>Agent is speaking...</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 text-bright-yellow" />
                          <span>Listening to you...</span>
                        </>
                      )}
                    </div>
                    
                    <div className="bg-white/5 border border-neon-blue/30 rounded-lg p-3 text-xs sm:text-sm text-white/70">
                      <p>💡 <strong>Tip:</strong> Your prompt will be sent automatically, or you can speak directly to the agent using your microphone.</p>
                    </div>

                    <Button
                      onClick={handleEndConversation}
                      variant="outline"
                      className="w-full border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500 transition-all"
                    >
                      End Session
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
