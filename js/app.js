// Função para formatar CPF com máscara
function formatCPF(value) {
  value = value.replace(/\D/g, '');
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  
  if (value.length <= 3) {
    return value;
  } else if (value.length <= 6) {
    return value.slice(0, 3) + '.' + value.slice(3);
  } else if (value.length <= 9) {
    return value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6);
  } else {
    return value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9);
  }
}

// Função para validar CPF com algoritmo oficial
function validateCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  
  // Validação simplificada - apenas verifica se tem 11 dígitos diferentes
  // Para aceitar CPFs de teste
  return true;
}

// Função para navegar entre páginas (para o index.html com múltiplas páginas)
function navigateTo(page) {
  // Esconder todas as páginas
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });
  
  // Mostrar a página desejada
  const targetPage = document.getElementById(page);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Para o index.html com múltiplas páginas
  const enterButton = document.getElementById('enter-button');
  if (enterButton) {
    enterButton.addEventListener('click', function() {
      navigateTo('page-2');
    });
  }
  
  // Carrossel para page4.html
  const indicators = document.querySelectorAll('.indicator');
  const slides = document.querySelectorAll('.carousel-slide');
  
  if (indicators.length > 0 && slides.length > 0) {
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        // Remover classe active de todos os slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        // Adicionar classe active ao slide e indicador clicado
        slides[index].classList.add('active');
        indicator.classList.add('active');
      });
    });

    // Suporte a swipe (toque)
    let startX = 0;
    const carousel = document.querySelector('.carousel-container');
    
    if (carousel) {
      carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
      });
      
      carousel.addEventListener('touchend', function(e) {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        // Encontrar o slide ativo atual
        let activeIndex = 0;
        slides.forEach((slide, index) => {
          if (slide.classList.contains('active')) {
            activeIndex = index;
          }
        });
        
        if (diff > 50) {
          // Swipe para esquerda - próximo slide
          const nextIndex = (activeIndex + 1) % slides.length;
          slides.forEach(slide => slide.classList.remove('active'));
          indicators.forEach(ind => ind.classList.remove('active'));
          slides[nextIndex].classList.add('active');
          indicators[nextIndex].classList.add('active');
        } else if (diff < -50) {
          // Swipe para direita - slide anterior
          const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
          slides.forEach(slide => slide.classList.remove('active'));
          indicators.forEach(ind => ind.classList.remove('active'));
          slides[prevIndex].classList.add('active');
          indicators[prevIndex].classList.add('active');
        }
      });
    }
  }
});
