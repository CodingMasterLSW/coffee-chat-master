
import React, { useState, useMemo } from 'react';
import { Coffee, Users, Search as SearchIcon, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import DeveloperCard from '@/components/DeveloperCard';
import { Button } from '@/components/ui/button';
import { mockDevelopers } from '@/data/mockData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevelopers = useMemo(() => {
    if (!searchQuery.trim()) return mockDevelopers;
    
    const query = searchQuery.toLowerCase();
    return mockDevelopers.filter(developer => 
      developer.name.toLowerCase().includes(query) ||
      developer.company.toLowerCase().includes(query) ||
      developer.position.toLowerCase().includes(query) ||
      developer.experience.toLowerCase().includes(query) ||
      developer.techStack.some(tech => tech.toLowerCase().includes(query)) ||
      developer.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Coffee className="w-12 h-12 text-amber-200" />
              <h1 className="text-5xl font-bold">커피마스터</h1>
            </div>
            <p className="text-xl text-amber-100 mb-8">
              현직 개발자와의 따뜻한 만남, 커피 한 잔의 여유로 시작하는 멘토링
            </p>
            <div className="flex items-center justify-center gap-8 text-amber-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{mockDevelopers.length}명의 현직 개발자</span>
              </div>
              <div className="flex items-center gap-2">
                <SearchIcon className="w-5 h-5" />
                <span>맞춤형 검색</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                <span>간편한 커피챗 신청</span>
              </div>
            </div>
            
            {/* 커피챗 요청 관리 버튼 추가 */}
            <div className="mt-8">
              <Link to="/coffee-chat-requests">
                <Button variant="outline" className="bg-transparent border-amber-200 text-amber-100 hover:bg-amber-500 hover:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  커피챗 요청 관리
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-100">
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder="회사명이나 경력을 검색해보세요 (예: 카카오, 5년차, 백엔드)"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-amber-900">
              {searchQuery ? `"${searchQuery}" 검색 결과` : '현직 개발자 목록'}
            </h2>
            <span className="text-amber-600 bg-amber-100 px-3 py-1 rounded-full text-sm font-medium">
              총 {filteredDevelopers.length}명
            </span>
          </div>
          
          {searchQuery && filteredDevelopers.length === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-amber-800 mb-2">검색 결과가 없습니다</h3>
              <p className="text-amber-600">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>

        {filteredDevelopers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coffee className="w-6 h-6" />
            <span className="text-xl font-bold">커피마스터</span>
          </div>
          <p className="text-amber-300">
            현직 개발자와의 소중한 만남을 연결합니다
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
