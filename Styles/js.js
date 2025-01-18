
            document.addEventListener('DOMContentLoaded', function() {
                // Initialize AOS
                if (typeof AOS !== 'undefined') {
                    AOS.init({
                        duration: 1000,
                        once: true
                    });
                }
                
    
                // FAQ Functionality
                document.querySelectorAll('.faq-question').forEach(question => {
                    question.addEventListener('click', () => {
                        const faqItem = question.parentElement;
                        const isActive = faqItem.classList.contains('active');
                        
                        // Cerrar todos los items activos
                        document.querySelectorAll('.faq-item').forEach(item => {
                            item.classList.remove('active');
                        });
                        
                        // Si el item clickeado no estaba activo, abrirlo
                        if (!isActive) {
                            faqItem.classList.add('active');
                        }
                    });
                });
    
                // Fix header navigation
                const navLinks = document.querySelectorAll('.nav-links a, .sidebar-links a');
                navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href').substring(1);
                        const targetSection = document.getElementById(targetId);
                        
                        if (targetSection) {
                            // Close sidebar if it's open
                            const sidebar = document.querySelector('.sidebar');
                            const overlay = document.querySelector('.sidebar-overlay');
                            if (sidebar && sidebar.classList.contains('active')) {
                                sidebar.classList.remove('active');
                                overlay.classList.remove('active');
                            }
    
                            // Scroll to section with offset for fixed header
                            const headerHeight = document.querySelector('.navbar').offsetHeight;
                            const targetPosition = targetSection.offsetTop - headerHeight;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    });
                });
    
                // Navbar scroll effect
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    window.addEventListener('scroll', function() {
                        if (window.scrollY > 50) {
                            navbar.classList.add('scrolled');
                        } else {
                            navbar.classList.remove('scrolled');
                        }
                    });
                }
    
                // Mobile menu toggle
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                const sidebar = document.querySelector('.sidebar');
                const sidebarOverlay = document.querySelector('.sidebar-overlay');
                const sidebarClose = document.querySelector('.sidebar-close');
    
                if (mobileMenuBtn && sidebar && sidebarOverlay) {
                    mobileMenuBtn.addEventListener('click', () => {
                        sidebar.classList.add('active');
                        sidebarOverlay.classList.add('active');
                    });
    
                    sidebarClose.addEventListener('click', () => {
                        sidebar.classList.remove('active');
                        sidebarOverlay.classList.remove('active');
                    });
    
                    sidebarOverlay.addEventListener('click', () => {
                        sidebar.classList.remove('active');
                        sidebarOverlay.classList.remove('active');
                    });
                }
    
                // Search System Implementation
                const searchSystem = {
                    data: {
                        servicios: [
                            {
                                title: 'Células Madre',
                                description: 'Tratamiento avanzado de regeneración celular que utiliza células madre para reparar y regenerar tejidos dañados.',
                                section: 'servicios',
                                keywords: ['regeneracion', 'celulas', 'madre', 'terapia', 'medicina regenerativa', 'tratamiento'],
                                category: 'Tratamiento',
                                relevance: 'Alta'
                            },
                            {
                                title: 'Exosomas',
                                description: 'Innovador tratamiento nebulizado para una absorción eficiente de células madre dirigidas a órganos vitales.',
                                section: 'servicios',
                                keywords: ['exosomas', 'nebulizacion', 'celulas', 'regeneracion', 'tratamiento'],
                                category: 'Tratamiento',
                                relevance: 'Alta'
                            },
                            {
                                title: 'Sueroterapia',
                                description: 'Infusiones intravenosas personalizadas para nutrir, revitalizar y equilibrar el organismo.',
                                section: 'servicios',
                                keywords: ['suero', 'terapia', 'infusion', 'vitaminas', 'nutricion'],
                                category: 'Tratamiento',
                                relevance: 'Media'
                            },
                            {
                                title: 'Diagnóstico Metabólico',
                                description: 'Análisis completo del metabolismo para identificar desequilibrios y crear planes personalizados.',
                                section: 'servicios',
                                keywords: ['diagnostico', 'metabolismo', 'analisis', 'evaluacion'],
                                category: 'Información',
                                relevance: 'Alta'
                            },
                            {
                                title: 'Capilaroscopia',
                                description: 'Estudio avanzado de la microcirculación para evaluar la salud vascular.',
                                section: 'servicios',
                                keywords: ['capilar', 'circulacion', 'diagnostico', 'vascular'],
                                category: 'Información',
                                relevance: 'Media'
                            },
                            {
                                title: 'Sueros de Placenta',
                                description: 'Tratamiento innovador con biomoléculas placentarias para regeneración celular y rejuvenecimiento.',
                                section: 'servicios',
                                keywords: ['placenta', 'suero', 'regeneracion', 'rejuvenecimiento'],
                                category: 'Tratamiento',
                                relevance: 'Alta'
                            },
                            {
                                title: 'Equipo Médico',
                                description: 'Conoce a nuestro equipo de profesionales altamente capacitados.',
                                section: 'equipo',
                                keywords: ['doctores', 'medicos', 'especialistas', 'profesionales'],
                                category: 'Información',
                                relevance: 'Media'
                            },
                            {
                                title: 'Agendar Cita',
                                description: 'Programa tu consulta con nuestros especialistas.',
                                section: 'agenda',
                                keywords: ['cita', 'consulta', 'agenda', 'programar'],
                                category: 'Servicios',
                                relevance: 'Alta'
                            },
                            {
                                title: 'Contacto',
                                description: 'Información de contacto y ubicación de nuestra clínica.',
                                section: 'contacto',
                                keywords: ['ubicacion', 'telefono', 'email', 'direccion'],
                                category: 'Información',
                                relevance: 'Media'
                            }
                        ]
                    },
                    searchInput: null,
                    searchResults: null,
                    filterButtons: null,
                    searchContainer: null,
                    searchIcon: null,
                    currentFilter: 'todo',
    
                    init() {
                        this.searchInput = document.querySelector('.main-search-bar');
                        this.searchResults = document.querySelector('.search-results');
                        this.filterButtons = document.querySelectorAll('.main-filter-btn');
                        this.searchContainer = document.querySelector('.main-search-container');
                        this.searchIcon = document.querySelector('.search-icon');
                        
                        this.bindEvents();
                        this.setupKeyboardNavigation();
                    },
    
                    bindEvents() {
                        if (this.searchIcon) {
                            this.searchIcon.addEventListener('click', () => {
                                this.searchContainer.classList.toggle('active');
                                if (this.searchContainer.classList.contains('active')) {
                                    this.searchInput.focus();
                                }
                            });
                        }
    
                        if (this.searchInput) {
                            this.searchInput.addEventListener('input', (e) => {
                                this.handleSearch(e.target.value);
                            });
                        }
    
                        if (this.filterButtons) {
                            this.filterButtons.forEach(btn => {
                                btn.addEventListener('click', () => {
                                    this.filterButtons.forEach(b => b.classList.remove('active'));
                                    btn.classList.add('active');
                                    this.currentFilter = btn.textContent.toLowerCase();
                                    this.handleSearch(this.searchInput.value);
                                });
                            });
                        }
    
                        // Close search when clicking outside
                        document.addEventListener('click', (e) => {
                            if (!e.target.closest('.main-search-container') && 
                                !e.target.closest('.search-icon')) {
                                this.searchContainer.classList.remove('active');
                            }
                        });
                    },
    
                    setupKeyboardNavigation() {
                        let currentIndex = -1;
                        const results = this.searchResults;
    
                        document.addEventListener('keydown', (e) => {
                            const items = results.querySelectorAll('.search-result-item');
                            if (!items.length) return;
    
                            if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                                this.focusResult(items, currentIndex);
                            } else if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                currentIndex = Math.max(currentIndex - 1, 0);
                                this.focusResult(items, currentIndex);
                            } else if (e.key === 'Enter' && currentIndex >= 0) {
                                e.preventDefault();
                                items[currentIndex].click();
                            }
                        });
                    },
    
                    focusResult(items, index) {
                        items.forEach(item => item.classList.remove('selected'));
                        if (index >= 0) {
                            items[index].classList.add('selected');
                            items[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    },
    
                    handleSearch(query) {
                        if (!query) {
                            this.searchResults.innerHTML = '';
                            return;
                        }
    
                        const results = this.data.servicios.filter(item => {
                            const matchesFilter = this.currentFilter === 'todo' || 
                                                item.category.toLowerCase() === this.currentFilter;
                            const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                                               item.keywords.some(k => k.includes(query.toLowerCase()));
                            return matchesFilter && matchesQuery;
                        });
    
                        this.displayResults(results);
                    },
    
                    displayResults(results) {
                        this.searchResults.innerHTML = results.map(result => `
                            <div class="search-result-item" tabindex="0">
                                <h3>${result.title}</h3>
                                <p>${result.description}</p>
                                <div class="search-meta">
                                    <span><i class="fas fa-tag"></i>${result.category}</span>
                                    <span><i class="fas fa-star"></i>${result.relevance}</span>
                                </div>
                            </div>
                        `).join('');
    
                        // Add click handlers to results
                        const resultItems = this.searchResults.querySelectorAll('.search-result-item');
                        resultItems.forEach(item => {
                            item.addEventListener('click', () => {
                                const section = document.querySelector(`#${item.section}`);
                                if (section) {
                                    section.scrollIntoView({ behavior: 'smooth' });
                                    this.searchContainer.classList.remove('active');
                                }
                            });
                        });
                    }
                };
    
                // Initialize search system
                searchSystem.init();
    
                // Back to top button
                const backToTopButton = document.querySelector('.back-to-top');
                
                if (backToTopButton) {
                    window.addEventListener('scroll', () => {
                        if (window.scrollY > 300) {
                            backToTopButton.classList.add('visible');
                        } else {
                            backToTopButton.classList.remove('visible');
                        }
                    });
    
                    backToTopButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    });
                }
    
                // Initialize swiper if it exists
                if (typeof Swiper !== 'undefined') {
                    const swiper = new Swiper('.facilities-carousel', {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                }
    
                

                // Appointment Form Handler
                (function() {
                    emailjs.init("YOUR_USER_ID");
                
                    const form = document.getElementById('appointmentForm');
                    const successMessage = document.getElementById('success-message');
                    
                    const validators = {
                        name: (value) => {
                            if (value.length < 3) return "El nombre debe tener al menos 3 caracteres";
                            if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(value)) return "El nombre solo debe contener letras";
                            return "";
                        },
                        age: (value) => {
                            if (value < 0 || value > 120) return "La edad debe estar entre 0 y 120 años";
                            return "";
                        },
                        email: (value) => {
                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Por favor ingresa un correo electrónico válido";
                            return "";
                        },
                        healthIssue: (value) => {
                            if (!value) return "Por favor selecciona un tipo de problema de salud";
                            return "";
                        }
                    };
                
                    const showError = (fieldName, message) => {
                        const errorElement = form.querySelector(`[data-error="${fieldName}"]`);
                        if (errorElement) {
                            errorElement.textContent = message;
                            errorElement.style.display = message ? 'block' : 'none';
                        }
                    };
                
                    const validateField = (fieldName, value) => {
                        const validator = validators[fieldName];
                        if (validator) {
                            const error = validator(value);
                            showError(fieldName, error);
                            return !error;
                        }
                        return true;
                    };
                
                    form.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        
                        let isValid = true;
                        const formData = new FormData(form);
                        
                        for (const [fieldName, value] of formData.entries()) {
                            if (!validateField(fieldName, value)) {
                                isValid = false;
                            }
                        }
                
                        if (!isValid) return;
                
                        const submitButton = form.querySelector('button[type="submit"]');
                        submitButton.classList.add('loading');
                        submitButton.disabled = true;
                
                        try {
                            await emailjs.send(
                                "YOUR_SERVICE_ID",
                                "YOUR_TEMPLATE_ID",
                                {
                                    to_email: "administracion@clinica-genesis.com",
                                    from_name: formData.get('name'),
                                    from_email: formData.get('email'),
                                    age: formData.get('age'),
                                    health_issue: formData.get('healthIssue'),
                                    message: formData.get('comments')
                                }
                            );
                
                            successMessage.style.display = 'block';
                            form.reset();
                            
                            setTimeout(() => {
                                successMessage.style.display = 'none';
                            }, 5000);
                
                        } catch (error) {
                            console.error('Error:', error);
                            alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente.');
                        } finally {
                            submitButton.classList.remove('loading');
                            submitButton.disabled = false;
                        }
                    });
                
                    form.querySelectorAll('input, select').forEach(input => {
                        input.addEventListener('blur', () => {
                            validateField(input.name, input.value);
                        });
                    });
                })();
            });
    
            // Initialize Google Maps with custom styling
            function initMap() {
                const location = { lat: 40.7128, lng: -74.0060 }; // Replace with your actual coordinates
                const map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: location,
                    styles: [
                        {
                            "featureType": "all",
                            "elementType": "geometry",
                            "stylers": [{"color": "#242f3e"}]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [{"color": "#746855"}]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [{"color": "#242f3e"}]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [{"color": "#17263c"}]
                        }
                    ]
                });
    
                const marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: 'Génesis Medicina Regenerativa'
                });
            }
    //about section

    document.addEventListener('DOMContentLoaded', function() {
        const swiper = new Swiper('.facilities-carousel', {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 20,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 1.5,
                slideShadows: false,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                968: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    });

            // Smooth scroll for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });






            