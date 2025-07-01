export interface Developer {
  id: string;
  name: string;
  company: string;
  position: string;
  experience: string;
  techStack: string[];
  profileImage: string;
  bio: string;
  location: string;
}

export interface CoffeeChatRequest {
  id: string;
  developerId: string;
  requesterName: string;
  requesterMessage: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'developer';
  message: string;
  timestamp: Date;
}

export const mockDevelopers: Developer[] = [
  {
    id: "1",
    name: "김민수",
    company: "카카오",
    position: "백엔드 개발자",
    experience: "5년차",
    techStack: ["Java", "Spring", "MySQL", "Redis"],
    profileImage: "/placeholder.svg",
    bio: "안녕하세요! 카카오에서 백엔드 개발을 담당하고 있습니다. 주로 대용량 트래픽 처리와 시스템 아키텍처 설계에 관심이 많습니다.",
    location: "판교"
  },
  {
    id: "2",
    name: "이지현",
    company: "네이버",
    position: "프론트엔드 개발자",
    experience: "3년차",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind"],
    profileImage: "/placeholder.svg",
    bio: "네이버에서 사용자 경험을 만들어가는 프론트엔드 개발자입니다. 깔끔한 UI/UX와 성능 최적화에 집중하고 있어요.",
    location: "분당"
  },
  {
    id: "3",
    name: "박서준",
    company: "토스",
    position: "풀스택 개발자",
    experience: "4년차",
    techStack: ["React", "Node.js", "PostgreSQL", "AWS"],
    profileImage: "/placeholder.svg",
    bio: "토스에서 금융 서비스 개발을 하고 있습니다. 안정적이고 확장 가능한 서비스 구축에 열정을 가지고 있어요.",
    location: "강남"
  },
  {
    id: "4",
    name: "최유진",
    company: "쿠팡",
    position: "데이터 엔지니어",
    experience: "6년차",
    techStack: ["Python", "Spark", "Airflow", "Kafka"],
    profileImage: "/placeholder.svg",
    bio: "쿠팡에서 대규모 데이터 파이프라인을 구축하고 운영하고 있습니다. 데이터 기반 의사결정을 위한 인프라를 만들어가요.",
    location: "송파"
  },
  {
    id: "5",
    name: "정현우",
    company: "라인",
    position: "iOS 개발자",
    experience: "7년차",
    techStack: ["Swift", "UIKit", "SwiftUI", "Combine"],
    profileImage: "/placeholder.svg",
    bio: "라인에서 모바일 앱 개발을 담당하고 있습니다. 사용자가 편리하게 사용할 수 있는 앱을 만드는 것이 목표입니다.",
    location: "신촌"
  },
  {
    id: "6",
    name: "한소영",
    company: "배달의민족",
    position: "안드로이드 개발자",
    experience: "4년차",
    techStack: ["Kotlin", "Jetpack Compose", "MVVM", "Retrofit"],
    profileImage: "/placeholder.svg",
    bio: "배달의민족에서 안드로이드 앱 개발을 하고 있어요. 깔끔한 코드와 좋은 사용자 경험을 추구합니다.",
    location: "송파"
  }
];

export const mockCoffeeChatRequests: CoffeeChatRequest[] = [
  {
    id: "req1",
    developerId: "1",
    requesterName: "이성우",
    requesterMessage: "안녕하세요! 현재 백엔드 개발자로 취업을 준비하고 있는 학생입니다. 카카오에서의 실무 경험과 개발 문화에 대해 궁금한 점들이 많아서 커피챗을 신청드리고 싶습니다.",
    status: "accepted",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: "req2",
    developerId: "2",
    requesterName: "김철수",
    requesterMessage: "네이버에서의 프론트엔드 개발 경험을 듣고 싶습니다!",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 30)
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "developer",
    message: "안녕하세요! 커피챗 신청해주셔서 감사합니다. 궁금한 점이 있으시면 편하게 물어보세요!",
    timestamp: new Date(Date.now() - 1000 * 60 * 2)
  },
  {
    id: "2",
    sender: "user",
    message: "안녕하세요! 현재 신입 개발자로 취업 준비 중인데, 실무에서 어떤 기술들이 중요한지 궁금합니다.",
    timestamp: new Date(Date.now() - 1000 * 60 * 1)
  }
];
