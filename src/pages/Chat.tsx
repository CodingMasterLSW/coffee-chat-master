
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockDevelopers, mockChatMessages } from '@/data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'developer';
  message: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { developerId } = useParams<{ developerId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const developer = mockDevelopers.find(dev => dev.id === developerId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!developer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">개발자를 찾을 수 없습니다.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // 자동 답변 (실제로는 실시간 채팅이 될 부분)
    setTimeout(() => {
      const responses = [
        "좋은 질문이네요! 제 경험을 바탕으로 말씀드리면...",
        "그 부분은 저도 초기에 많이 고민했던 부분입니다.",
        "실무에서는 이런 경우가 많은데요, 제가 겪은 사례를 공유해드릴게요.",
        "기술적인 부분뿐만 아니라 커뮤니케이션도 중요하다고 생각해요.",
        "추가로 궐금한 점이 있으시면 언제든 물어보세요!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const developerMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'developer',
        message: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, developerMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-amber-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
          
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={developer.profileImage} alt={developer.name} />
              <AvatarFallback className="bg-amber-100 text-amber-800">
                {developer.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium text-amber-900">{developer.name}</h2>
              <p className="text-sm text-amber-600">{developer.company} • {developer.position}</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-2 text-amber-600">
            <Coffee className="w-4 h-4" />
            <span className="text-sm font-medium">커피챗 진행중</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {message.sender === 'developer' ? (
                    <>
                      <AvatarImage src={developer.profileImage} alt={developer.name} />
                      <AvatarFallback className="bg-amber-100 text-amber-800">
                        {developer.name[0]}
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      나
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className={`rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border border-amber-200'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-amber-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            placeholder="메시지를 입력하세요..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
