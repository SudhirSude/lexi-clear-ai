import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Scissors, 
  Brain, 
  Search,
  Loader2,
  CheckCircle
} from "lucide-react";

const Processing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 'uploading',
      title: 'File is being uploaded',
      description: 'Securely transferring your document',
      icon: Upload,
      duration: 3000
    },
    {
      id: 'chunking',
      title: 'Splitting into sections',
      description: 'Breaking document into analyzable segments',
      icon: Scissors,
      duration: 4000
    },
    {
      id: 'embedding',
      title: 'Understanding legal language',
      description: 'AI analyzing contract terminology and clauses',
      icon: Brain,
      duration: 6000
    },
    {
      id: 'retrieval',
      title: 'Preparing simplified explanation',
      description: 'Generating insights and risk analysis',
      icon: Search,
      duration: 5000
    }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step
      let stepProgress = 0;
      let newCurrentStep = 0;
      
      for (let i = 0; i < steps.length; i++) {
        stepProgress += steps[i].duration;
        if (elapsed <= stepProgress) {
          newCurrentStep = i;
          break;
        }
      }
      
      setCurrentStep(newCurrentStep);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background neural-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl text-center"
      >
        {/* Main Progress Indicator */}
        <motion.div
          className="relative w-64 h-64 mx-auto mb-12"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-cyber-dark">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              style={{
                background: `conic-gradient(from 0deg, hsl(var(--neon-blue)) ${progress}%, transparent ${progress}%)`,
                borderRadius: '50%'
              }}
            />
          </div>

          {/* Inner Content */}
          <div className="absolute inset-8 rounded-full bg-cyber-dark/50 backdrop-blur-sm border border-neon-blue/30 flex flex-col items-center justify-center">
            <motion.div
              key={currentStep}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-4"
            >
              {React.createElement(steps[currentStep]?.icon || Loader2, {
                className: "w-12 h-12 text-neon-blue",
                ...(steps[currentStep]?.icon ? {} : { 
                  style: { animation: 'spin 1s linear infinite' }
                })
              })}
            </motion.div>
            
            <div className="text-4xl font-orbitron font-bold text-neon-blue">
              {Math.round(progress)}%
            </div>
            
            <div className="text-sm text-muted-foreground mt-2">
              Processing...
            </div>
          </div>

          {/* Neural Nodes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-neon-cyan rounded-full"
              style={{
                left: '50%',
                top: '10px',
                transformOrigin: '0 118px'
              }}
              animate={{
                rotate: i * 45,
                scale: currentStep >= i / 2 ? [1, 1.5, 1] : 1,
                opacity: currentStep >= i / 2 ? [0.5, 1, 0.5] : 0.3
              }}
              transition={{
                rotate: { duration: 0 },
                scale: { duration: 1.5, repeat: Infinity },
                opacity: { duration: 1.5, repeat: Infinity }
              }}
            />
          ))}
        </motion.div>

        {/* Current Step Info */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-orbitron font-bold cyber-glow mb-4">
            {steps[currentStep]?.title || 'Initializing...'}
          </h2>
          <p className="text-lg font-rajdhani text-muted-foreground">
            {steps[currentStep]?.description || 'Preparing to process your document...'}
          </p>
        </motion.div>

        {/* Step Timeline */}
        <div className="flex justify-center items-center gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.3,
                scale: index === currentStep ? 1.1 : 1
              }}
            >
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                index < currentStep 
                  ? 'border-neon-green bg-neon-green/20' 
                  : index === currentStep 
                    ? 'border-neon-blue bg-neon-blue/20' 
                    : 'border-cyber-dark bg-cyber-dark/20'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6 text-neon-green" />
                ) : (
                  <step.icon className={`w-6 h-6 ${
                    index === currentStep ? 'text-neon-blue' : 'text-muted-foreground'
                  }`} />
                )}
              </div>
              
              <div className="text-xs font-rajdhani text-center max-w-20">
                {step.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Neural Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-blue/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Processing Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Average processing time: 15-30 seconds • Your document remains private and ephemeral
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Processing;