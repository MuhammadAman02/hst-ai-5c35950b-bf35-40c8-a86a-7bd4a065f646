import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, User, Loader2 } from 'lucide-react';
import { NutritionInfo, DailyProgress } from '../types/nutrition';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  progress: DailyProgress;
  onSuggestion?: (suggestion: string) => void;
}

const AIChat: React.FC<AIChatProps> = ({ progress, onSuggestion }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI nutrition assistant. I can help you plan meals, suggest recipes, and answer nutrition questions based on your current goals. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const remaining = progress.remaining;
    const current = progress.current;
    const targets = progress.targets;

    // Simple AI logic based on nutrition data
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('protein') || lowerMessage.includes('muscle')) {
      if (remaining.protein > 20) {
        return `You need ${remaining.protein.toFixed(1)}g more protein today. I recommend lean sources like chicken breast (31g protein per 100g), Greek yogurt (10g per 100g), or salmon (25g per 100g). Would you like a high-protein meal suggestion?`;
      } else {
        return `Great job on your protein intake! You've consumed ${current.protein.toFixed(1)}g out of your ${targets.protein}g target. You're almost there!`;
      }
    }

    if (lowerMessage.includes('carb') || lowerMessage.includes('energy')) {
      if (remaining.carbs > 30) {
        return `You have ${remaining.carbs.toFixed(1)}g of carbs remaining. Consider complex carbs like sweet potatoes (20g per 100g), quinoa (22g per 100g), or oats (12g per 100g) for sustained energy.`;
      } else {
        return `Your carb intake looks good! You've had ${current.carbs.toFixed(1)}g out of ${targets.carbs}g. Perfect for maintaining steady energy levels.`;
      }
    }

    if (lowerMessage.includes('fat') || lowerMessage.includes('healthy')) {
      if (remaining.fats > 15) {
        return `You need ${remaining.fats.toFixed(1)}g more healthy fats. Try avocados (15g per 100g), nuts like almonds (50g per 100g), or olive oil. These support hormone production and nutrient absorption.`;
      } else {
        return `Your fat intake is on track! You've consumed ${current.fats.toFixed(1)}g out of ${targets.fats}g. Good balance of healthy fats!`;
      }
    }

    if (lowerMessage.includes('vitamin') || lowerMessage.includes('micronutrient')) {
      const vitaminCNeeded = remaining.vitaminC;
      if (vitaminCNeeded > 20) {
        return `You need ${vitaminCNeeded.toFixed(1)}mg more Vitamin C. Citrus fruits, bell peppers, broccoli, and strawberries are excellent sources. Vitamin C supports immune function and iron absorption.`;
      } else {
        return `Your vitamin intake looks good! Remember that a varied diet with colorful fruits and vegetables ensures you get all essential micronutrients.`;
      }
    }

    if (lowerMessage.includes('meal') || lowerMessage.includes('recipe') || lowerMessage.includes('cook')) {
      const suggestions = [];
      if (remaining.protein > 20) suggestions.push('high-protein meal');
      if (remaining.carbs > 30) suggestions.push('complex carb dish');
      if (remaining.fats > 15) suggestions.push('healthy fat source');

      if (suggestions.length > 0) {
        return `Based on your remaining nutrients, I suggest a meal with ${suggestions.join(' and ')}. How about grilled salmon with quinoa and avocado? This would provide quality protein, complex carbs, and healthy fats!`;
      } else {
        return `You're doing great with your nutrition today! For your next meal, focus on maintaining balance. A light salad with mixed vegetables and a small portion of lean protein would be perfect.`;
      }
    }

    if (lowerMessage.includes('weight') || lowerMessage.includes('lose') || lowerMessage.includes('gain')) {
      const caloriesRemaining = remaining.calories;
      if (caloriesRemaining > 300) {
        return `You have ${caloriesRemaining.toFixed(0)} calories remaining today. For healthy weight management, spread these across balanced meals with adequate protein to maintain muscle mass.`;
      } else if (caloriesRemaining < 100) {
        return `You're close to your calorie target with ${caloriesRemaining.toFixed(0)} calories left. Consider a light, nutrient-dense snack if you're still hungry.`;
      } else {
        return `You have ${caloriesRemaining.toFixed(0)} calories remaining. Perfect for a balanced meal or healthy snack!`;
      }
    }

    // Default responses
    const defaultResponses = [
      `Based on your current nutrition intake, you're doing well! You've consumed ${current.calories.toFixed(0)} out of ${targets.calories} calories today.`,
      `I can help you with meal planning, recipe suggestions, or nutrition questions. What specific area would you like to focus on?`,
      `Your nutrition balance today: ${((current.protein + current.carbs + current.fats) / (targets.protein + targets.carbs + targets.fats) * 100).toFixed(0)}% of your macronutrient targets achieved.`,
      `Remember, consistency is key in nutrition! Small, sustainable changes lead to long-term success. What's your biggest nutrition challenge right now?`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I encountered an error. Please try asking your question again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What should I eat for protein?",
    "Suggest a balanced meal",
    "How are my vitamins?",
    "Help with meal prep"
  ];

  return (
    <Card className="neo-card h-[600px] flex flex-col animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 gradient-text">
          <div className="relative">
            <Bot className="h-5 w-5" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-violet-500 animate-pulse" />
          </div>
          AI Nutrition Assistant
        </CardTitle>
        <Badge variant="outline" className="w-fit text-xs bg-gradient-to-r from-emerald-50 to-neo-50 border-emerald-200">
          Powered by Advanced AI
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'ai' && (
                    <Bot className="h-4 w-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                  )}
                  {message.type === 'user' && (
                    <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                  )}
                  <div className="text-sm leading-relaxed">{message.content}</div>
                </div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-emerald-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-slide-in">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-emerald-600" />
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(question)}
              className="text-xs bg-gradient-to-r from-emerald-50 to-neo-50 border-emerald-200 hover:from-emerald-100 hover:to-neo-100 transition-all duration-200"
            >
              {question}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about nutrition, meals, or recipes..."
            className="flex-1 rounded-xl border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;