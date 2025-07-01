
import React, { useState } from 'react';
import { Coffee, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Developer } from '@/data/mockData';

interface CoffeeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  developer: Developer;
}

const CoffeeChatModal: React.FC<CoffeeChatModalProps> = ({ isOpen, onClose, developer }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // 실제로는 API 호출을 할 부분이지만, 현재는 모의 처리
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // 성공 토스트 표시 후 채팅 페이지로 이동
      navigate(`/chat/${developer.id}`);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-amber-50 border-amber-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-amber-900">
            <Coffee className="w-5 h-5 text-amber-600" />
            커피챗 신청
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-100">
            <Avatar className="w-12 h-12">
              <AvatarImage src={developer.profileImage} alt={developer.name} />
              <AvatarFallback className="bg-amber-100 text-amber-800">
                {developer.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-amber-900">{developer.name}</p>
              <p className="text-sm text-amber-600">{developer.company} • {developer.position}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">
              자기소개 및 커피챗 신청 메시지
            </label>
            <Textarea
              placeholder="안녕하세요! 저는 현재 개발자로 취업을 준비하고 있는 학생입니다. 궁금한 점들이 많아서 커피챗을 신청드리고 싶습니다..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <X className="w-4 h-4 mr-2" />
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !message.trim()}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  신청 중...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  커피챗 신청
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoffeeChatModal;
