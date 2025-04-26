// Translations for the website
const translations = {
    en: {
        // Navigation
        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "nav.documentation": "Documentation",
        "nav.papers": "Research Papers",
        
        // Hero section
        "hero.title": "RetentionLabs",
        "hero.subtitle": "Better Memory System for Artificial Intelligence",
        "hero.github": "GitHub",
        "hero.projects": "Our Projects",
        
        // About section
        "about.title": "About RetentionLabs",
        "about.description1": "RetentionLabs is an open-source project group focused on researching and developing AI memory solutions. Our mission is to overcome the context length limitations of Self-Attention mechanisms in large language models.",
        "about.description2": "We believe that by enhancing AI systems with better memory capabilities, we can create more helpful, consistent, and personalized AI experiences.",
        "about.feature1.title": "Long-term Memory",
        "about.feature1.description": "Enabling AI to retain information across extended interactions",
        "about.feature2.title": "Weight-Based Storage",
        "about.feature2.description": "Storing memories directly in model weights rather than external databases",
        "about.feature3.title": "Open Source",
        "about.feature3.description": "Collaborative development for the advancement of AI memory research",
        
        // Projects section
        "projects.title": "Our Projects",
        "projects.retention.status": "Active",
        "projects.retention.description": "A PyTorch adapter that enhances language models with memory capabilities. Unlike RAG approaches, RetentionEngine stores information directly in the adapter weights, allowing for more efficient and integrated memory retention.",
        "projects.retention.feature1": "Conversation Memory",
        "projects.retention.feature2": "Weight-Based Storage",
        "projects.retention.feature3": "Easy Integration",
        "projects.future.title": "Future Projects",
        "projects.future.status": "Planned",
        "projects.future.description": "We're constantly exploring new approaches to AI memory. Stay tuned for more innovative projects that will push the boundaries of what's possible with artificial intelligence memory systems.",
        "projects.learnMore": "Learn More",
        "projects.github": "GitHub",
        "projects.contribute": "Contribute",
        
        // Contact section
        "contact.title": "Get Involved",
        "contact.intro": "Interested in contributing to RetentionLabs or have questions about our projects?",
        "contact.github.title": "GitHub",
        "contact.github.description": "Check out our repositories and contribute to the code",
        "contact.email.title": "Email",
        
        // Footer
        "footer.tagline": "An open-source project group focused on researching AI memory to overcome context length limitations in large language models.",
        "footer.navigation": "Navigation",
        "footer.resources": "Resources",
        "footer.connect": "Connect",
        "footer.rights": "All rights reserved."
    },
    ko: {
        // Navigation
        "nav.about": "소개",
        "nav.projects": "프로젝트",
        "nav.contact": "연락처",
        "nav.documentation": "문서",
        "nav.papers": "연구 논문",
        
        // Hero section
        "hero.title": "RetentionLabs",
        "hero.subtitle": "인공지능에게 더 나은 기억을",
        "hero.github": "GitHub",
        "hero.projects": "프로젝트 보기",
        
        // About section
        "about.title": "RetentionLabs 소개",
        "about.description1": "RetentionLabs는 인공지능의 메모리 솔루션을 연구하고 개발하는 오픈소스 프로젝트 그룹입니다. 우리의 미션은 대규모 언어 모델의 Self-Attention 메커니즘의 컨텍스트 길이 한계를 극복하는 것입니다.",
        "about.description2": "인공지능 시스템에 더 나은 메모리 기능을 제공함으로써, 더 유용하고, 일관성 있으며, 개인화된 AI 경험을 만들 수 있다고 믿습니다.",
        "about.feature1.title": "장기 기억",
        "about.feature1.description": "AI가 장기간의 상호작용에서 정보를 유지할 수 있도록 합니다",
        "about.feature2.title": "가중치 기반 저장",
        "about.feature2.description": "외부 데이터베이스가 아닌 모델 가중치에 직접 메모리를 저장합니다",
        "about.feature3.title": "오픈 소스",
        "about.feature3.description": "AI 메모리 연구 발전을 위한 협력적 개발을 지향합니다",
        
        // Projects section
        "projects.title": "프로젝트",
        "projects.retention.status": "진행 중",
        "projects.retention.description": "언어 모델에 메모리 기능을 추가하는 PyTorch 어댑터입니다. RAG 접근 방식과 달리, RetentionEngine은 정보를 어댑터 가중치에 직접 저장하여 더 효율적이고 통합된 메모리 유지를 가능하게 합니다.",
        "projects.retention.feature1": "장기 메모리 보존",
        "projects.retention.feature2": "가중치 기반 저장",
        "projects.retention.feature3": "쉬운 통합",
        "projects.future.title": "향후 프로젝트",
        "projects.future.status": "계획 중",
        "projects.future.description": "우리는 AI 메모리에 대한 새로운 접근 방식을 지속적으로 탐구하고 있습니다. 인공지능 메모리 시스템의 가능성을 확장할 혁신적인 프로젝트를 기대해 주세요.",
        "projects.learnMore": "자세히 보기",
        "projects.github": "GitHub",
        "projects.contribute": "기여하기",
        
        // Contact section
        "contact.title": "참여하기",
        "contact.intro": "RetentionLabs에 기여하거나 프로젝트에 대한 질문이 있으신가요?",
        "contact.github.title": "GitHub",
        "contact.github.description": "저장소를 확인하고 코드에 기여해 보세요",
        "contact.email.title": "이메일",
        
        // Footer
        "footer.tagline": "RetentionLabs는 대규모 언어 모델의 컨텍스트 길이 한계를 극복하기 위해 AI 메모리를 연구하는 오픈소스 프로젝트 그룹입니다.",
        "footer.navigation": "탐색",
        "footer.resources": "리소스",
        "footer.connect": "연결",
    }
};

// Default language
let currentLanguage = 'en';

// Function to set the language
function setLanguage(language) {
    if (!translations[language]) {
        console.error(`Language ${language} not supported`);
        return;
    }
    
    currentLanguage = language;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${language}`).classList.add('active');
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Save language preference
    localStorage.setItem('preferredLanguage', language);
}

// Initialize language from saved preference or browser language
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const browserLanguage = navigator.language.split('-')[0];
    
    if (savedLanguage && translations[savedLanguage]) {
        setLanguage(savedLanguage);
    } else if (browserLanguage && translations[browserLanguage]) {
        setLanguage(browserLanguage);
    } else {
        setLanguage('en'); // Default to English
    }
});
