'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Volume2, Mic, Loader2, ArrowLeft, Edit3, Check } from 'lucide-react';
import { useConversation } from '@elevenlabs/react';
import { useToast } from '@/hooks/use-toast';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

function ExperienceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [prompt, setPrompt] = useState('');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [promptSent, setPromptSent] = useState(false);

  // Get prompt from URL parameters
  useEffect(() => {
    const urlPrompt = searchParams.get('prompt');
    if (urlPrompt) {
      setPrompt(decodeURIComponent(urlPrompt));
    }
  }, [searchParams]);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs agent');
      setIsGenerating(false);
      setHasStarted(true);
      setPromptSent(false);
      toast({
        title: language === 'es' ? 'Conectado' : 'Connected',
        description: language === 'es' 
          ? 'El agente está listo. Habla o escribe tu solicitud...'
          : 'Audio agent is ready. Speak or type your request...',
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
      
      let errorMessage = language === 'es' 
        ? 'Error al generar audio. Por favor intenta de nuevo.'
        : 'Failed to generate audio. Please try again.';
      
      if (error && typeof error === 'object') {
        if ('message' in error && typeof (error as { message: unknown }).message === 'string') {
          errorMessage = (error as { message: string }).message;
        }
      }
      
      toast({
        title: language === 'es' ? 'Error de Conexión' : 'Connection Error',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsGenerating(false);
      setHasStarted(false);
      
      try {
        conversation.endSession();
      } catch {
        // Ignore cleanup errors
      }
    },
    onMessage: (message) => {
      console.log('Message received:', message);
    },
  });

  const handleStartExperience = async () => {
    if (!prompt.trim()) {
      toast({
        title: language === 'es' ? 'Ingresa un concepto' : 'Enter a concept',
        description: language === 'es' 
          ? 'Por favor describe qué concepto visual quieres experimentar.'
          : 'Please describe what visual concept you want to experience.',
        variant: 'destructive',
      });
      return;
    }

    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
    
    if (!agentId || agentId === 'your-agent-id-here') {
      toast({
        title: language === 'es' ? 'Configuración Requerida' : 'Configuration Required',
        description: language === 'es'
          ? 'Por favor configura NEXT_PUBLIC_ELEVENLABS_AGENT_ID.'
          : 'Please set NEXT_PUBLIC_ELEVENLABS_AGENT_ID.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsGenerating(true);

      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micError) {
        console.error('Microphone access denied:', micError);
        toast({
          title: language === 'es' ? 'Micrófono Requerido' : 'Microphone Required',
          description: language === 'es'
            ? 'Por favor otorga permiso al micrófono.'
            : 'Please grant microphone permission.',
          variant: 'destructive',
        });
        setIsGenerating(false);
        return;
      }

      const conversationId = await conversation.startSession({
        agentId: agentId,
        connectionType: 'webrtc',
      });

      console.log('✅ Conversation started with ID:', conversationId);
      
      toast({
        title: language === 'es' ? 'Generando Audio' : 'Generating Audio',
        description: language === 'es'
          ? 'Creando tu experiencia de audio inmersiva...'
          : 'Creating your immersive audio experience...',
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      
      let errorMessage = language === 'es'
        ? 'Error al iniciar la experiencia'
        : 'Failed to start experience';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: language === 'es' ? 'Error de Conexión' : 'Connection Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsGenerating(false);
    }
  };

  const handleEndExperience = async () => {
    try {
      await conversation.endSession();
      setIsGenerating(false);
      setHasStarted(false);
      toast({
        title: language === 'es' ? 'Sesión Terminada' : 'Session Ended',
        description: language === 'es' 
          ? 'La experiencia de audio se detuvo.'
          : 'Audio experience stopped.',
      });
    } catch (error) {
      console.error('Failed to end conversation:', error);
      setIsGenerating(false);
      setHasStarted(false);
    }
  };

  // Send user prompt after agent's greeting
  useEffect(() => {
    if (hasStarted && conversation.status === 'connected' && !promptSent && prompt.trim()) {
      const timer = setTimeout(() => {
        console.log('Sending prompt to agent:', prompt);
        conversation.sendUserMessage(prompt);
        setPromptSent(true);
        setIsEditingPrompt(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasStarted, conversation.status, promptSent, prompt, conversation]);

  const handleSavePrompt = () => {
    setIsEditingPrompt(false);
    if (conversation.status === 'connected' && prompt.trim()) {
      conversation.sendUserMessage(prompt);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] dotted-bg">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Button
              onClick={() => router.push('/')}
              variant="ghost"
              className="text-white/80 hover:text-white gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'es' ? 'Volver' : 'Back'}
            </Button>
            
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                {language === 'es' ? 'Experiencia Inmersiva' : 'Immersive Experience'}
              </h1>
              <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
                {language === 'es'
                  ? 'Describe un concepto visual y experimenta cómo cobra vida a través del audio espacial'
                  : 'Describe a visual concept and experience how it comes to life through spatial audio'}
              </p>
            </div>

            {/* Prompt Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {language === 'es' ? 'Tu Concepto' : 'Your Concept'}
                </h2>
                {!isEditingPrompt && conversation.status !== 'connected' && (
                  <Button
                    onClick={() => setIsEditingPrompt(true)}
                    variant="ghost"
                    size="sm"
                    className="text-cyan-400 hover:text-cyan-300 gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    {language === 'es' ? 'Editar' : 'Edit'}
                  </Button>
                )}
              </div>

              {isEditingPrompt ? (
                <div className="space-y-4">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={language === 'es' 
                      ? '¿Cómo se siente ver el sol? ¿Qué aspecto tiene un arcoíris?'
                      : 'How does it feel to see the sun? What does a rainbow look like?'}
                    className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-white/40 text-lg resize-none"
                  />
                  <Button
                    onClick={handleSavePrompt}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {language === 'es' ? 'Guardar' : 'Save'}
                  </Button>
                </div>
              ) : (
                <p className="text-white/80 text-lg leading-relaxed">
                  {prompt || (language === 'es' ? 'Sin concepto' : 'No concept')}
                </p>
              )}
            </motion.div>

            {/* Visualizer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border-2 border-white/10 rounded-3xl p-8"
            >
              <AudioVisualizer
                barCount={80}
                isActive={conversation.status === 'connected' || isGenerating}
              />
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              {conversation.status === 'connected' ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
                  >
                    {conversation.isSpeaking ? (
                      <>
                        <Volume2 className="w-5 h-5 text-cyan-400 animate-pulse" />
                        <span className="text-white/80 font-medium">
                          {language === 'es' ? 'El agente está hablando...' : 'Agent is speaking...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5 text-green-400" />
                        <span className="text-white/80 font-medium">
                          {language === 'es' ? 'Escuchándote...' : 'Listening to you...'}
                        </span>
                      </>
                    )}
                  </motion.div>

                  <Button
                    onClick={handleEndExperience}
                    size="lg"
                    className="px-8 py-6 text-lg font-bold bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 hover:border-white/40 rounded-full transition-all"
                  >
                    {language === 'es' ? 'TERMINAR EXPERIENCIA' : 'END EXPERIENCE'}
                  </Button>
                </>
              ) : (
                <>
                  {!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 
                   process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID === 'your-agent-id-here' ? (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-center max-w-md">
                      <p className="text-yellow-400 font-semibold mb-1">
                        {language === 'es' ? '⚠️ Configuración Requerida' : '⚠️ Setup Required'}
                      </p>
                      <p className="text-yellow-300/80 text-sm">
                        {language === 'es'
                          ? 'Configura tu ID de Agente de ElevenLabs'
                          : 'Configure your ElevenLabs Agent ID'}
                      </p>
                    </div>
                  ) : !isGenerating && (
                    <p className="text-white/40 text-sm">
                      {language === 'es' 
                        ? '🎤 Se solicitará acceso al micrófono'
                        : '🎤 Microphone access will be requested'}
                    </p>
                  )}

                  <Button
                    onClick={handleStartExperience}
                    disabled={isGenerating || !prompt.trim()}
                    size="lg"
                    className="px-12 py-7 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black rounded-full shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center gap-3">
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          {language === 'es' ? 'CONECTANDO' : 'CONNECTING'}
                        </>
                      ) : (
                        <>
                          <Mic className="w-6 h-6" />
                          {language === 'es' ? 'COMENZAR EXPERIENCIA' : 'START EXPERIENCE'}
                        </>
                      )}
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-75" />
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-150" />
                      </span>
                    </span>
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    }>
      <ExperienceContent />
    </Suspense>
  );
}

