
import React, { useState } from 'react';
import { Coffee, Check, X, MessageCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockCoffeeChatRequests, mockDevelopers, CoffeeChatRequest } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const CoffeeChatRequests: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<CoffeeChatRequest[]>(mockCoffeeChatRequests);

  const handleAccept = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted' as const }
          : req
      )
    );
    
    toast({
      title: "커피챗 수락 완료",
      description: "커피챗 요청을 수락했습니다. 이제 1:1 채팅을 시작할 수 있습니다.",
    });
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const }
          : req
      )
    );
    
    toast({
      title: "커피챗 거절 완료",
      description: "커피챗 요청을 거절했습니다.",
    });
  };

  const handleStartChat = (developerId: string) => {
    navigate(`/chat/${developerId}`);
  };

  const getStatusBadge = (status: CoffeeChatRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">대기중</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">수락됨</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">거절됨</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-amber-100 hover:text-white hover:bg-amber-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로
            </Button>
            <div className="flex items-center gap-3">
              <Coffee className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">커피챗 요청 관리</h1>
                <p className="text-amber-100">받은 커피챗 요청을 확인하고 관리하세요</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <Coffee className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-amber-800 mb-2">아직 받은 요청이 없습니다</h3>
              <p className="text-amber-600">커피챗 요청이 오면 여기에 표시됩니다</p>
            </div>
          ) : (
            requests.map((request) => {
              const developer = mockDevelopers.find(dev => dev.id === request.developerId);
              if (!developer) return null;

              return (
                <Card key={request.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={developer.profileImage} alt={developer.name} />
                          <AvatarFallback className="bg-amber-100 text-amber-800">
                            {developer.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-amber-900">{request.requesterName}님의 커피챗 요청</CardTitle>
                          <p className="text-sm text-amber-600">
                            {developer.name} ({developer.company} • {developer.position})에게
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {request.createdAt.toLocaleDateString('ko-KR')} {request.createdAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700">{request.requesterMessage}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleAccept(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            수락
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleReject(request.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <X className="w-4 h-4 mr-2" />
                            거절
                          </Button>
                        </>
                      )}
                      
                      {request.status === 'accepted' && (
                        <Button
                          onClick={() => handleStartChat(developer.id)}
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          1:1 채팅 시작
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeChatRequests;
