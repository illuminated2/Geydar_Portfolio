document.addEventListener('DOMContentLoaded', function() {
    const bioSection = document.querySelector('.bio');
    const exerciseItems = document.querySelectorAll('.exercise-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const nav = document.querySelector('.premium-nav');
    
    // Элементы анимированных фигур
    const benchPressFigure = document.getElementById('benchPressFigure');
    const squatFigure = document.getElementById('squatFigure');
    const deadliftFigure = document.getElementById('deadliftFigure');
    
    // Переменные для отслеживания показанных анимаций
    let shownAnimations = {
        benchPress: false,
        squat: false,
        deadlift: false
    };
    
    // Функция для показа анимации
    function showFigure(figureElement) {
        if (!figureElement) return;
        
        // Сбрасываем анимацию
        figureElement.classList.remove('show');
        void figureElement.offsetWidth; // Trigger reflow
        
        // Запускаем анимацию
        figureElement.classList.add('show');
        
        // Убираем класс после завершения анимации
        setTimeout(() => {
            figureElement.classList.remove('show');
        }, 2000);
    }
    
    // Специальный Observer для секций компетенций
    const competenceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const exerciseHeader = entry.target.querySelector('.exercise-content h3');
                if (exerciseHeader) {
                    const exerciseType = exerciseHeader.textContent;
                    
                    setTimeout(() => {
                        if (exerciseType.includes('Техническая') && !shownAnimations.benchPress) {
                            showFigure(benchPressFigure);
                            shownAnimations.benchPress = true;
                            console.log('Показан жим лежа - Техническая экспертиза');
                        } else if (exerciseType.includes('Тренерские') && !shownAnimations.squat) {
                            showFigure(squatFigure);
                            shownAnimations.squat = true;
                            console.log('Показан присед - Тренерские навыки');
                        } else if (exerciseType.includes('Организационные') && !shownAnimations.deadlift) {
                            showFigure(deadliftFigure);
                            shownAnimations.deadlift = true;
                            console.log('Показана становая - Организационные способности');
                        }
                    }, 300);
                }
            }
        });
    }, { 
        threshold: 0.5, // Секция должна быть видна на 50%
        rootMargin: '0px 0px -100px 0px' // Срабатывает когда секция входит в viewport
    });
    
    // Обычный Observer для анимации появления секций
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    // Наблюдаем за всеми секциями с обычной анимацией
    sectionObserver.observe(bioSection);
    document.querySelectorAll('.gallery, .achievements, .contact').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Наблюдаем за секциями компетенций с анимациями человечков
    exerciseItems.forEach(item => {
        competenceObserver.observe(item);
        sectionObserver.observe(item); // Также добавляем обычную анимацию
    });
    
    // Плавный скролл
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            bioSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Фиксация навигации при скролле
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Плавные ссылки навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Плавная ссылка для CTA кнопки
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Анимация галереи при наведении
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Обработка формы
    const contactForm = document.querySelector('.premium-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const inputs = this.querySelectorAll('.form-input, .form-textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
            });
            
            if (isValid) {
                alert('Сообщение отправлено! Скоро с вами свяжутся.');
                this.reset();
            } else {
                alert('Пожалуйста, заполните все поля формы.');
            }
        });
    }
    
    // Отключаем начальную анимацию при загрузке
    // setTimeout(() => {
    //     showFigure(benchPressFigure);
    //     shownAnimations.benchPress = true;
    // }, 1500);
});