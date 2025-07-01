
import React, { useState } from 'react';
import { MapPin, Coffee, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Developer } from '@/data/mockData';
import CoffeeChatModal from './CoffeeChatModal';

interface DeveloperCardProps {
  developer: Developer;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-amber-100">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-16 h-16 border-2 border-amber-200">
              <AvatarImage src={developer.profileImage} alt={developer.name} />
              <AvatarFallback className="bg-amber-100 text-amber-800">
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-900 mb-1">{developer.name}</h3>
              <p className="text-amber-700 font-medium">{developer.company} • {developer.position}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-amber-600">
                <span className="bg-amber-100 px-2 py-1 rounded-full">{developer.experience}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{developer.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{developer.bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {developer.techStack.map((tech, index) => (
              <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Coffee className="w-4 h-4" />
            커피챗 신청하기
          </Button>
        </CardFooter>
      </Card>

      <CoffeeChatModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        developer={developer}
      />
    </>
  );
};

export default DeveloperCard;
