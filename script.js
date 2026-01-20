
/* ===== CONTADORES ===== */
document.addEventListener("DOMContentLoaded", () => {
    const contadores = document.querySelectorAll(".contador");

    contadores.forEach(contador => {
        const max = Number(contador.getAttribute("data-max"));
        let atual = 0;
        const incremento = Math.ceil(max / 60);

        const timer = setInterval(() => {
            atual += incremento;

            if (atual >= max) {
                contador.textContent = max;
                clearInterval(timer);
            } else {
                contador.textContent = atual;
            }
        }, 70);
    });
});



/* ===== CARROSSEL ===== */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let indexAtual = 0;

function atualizarCarrossel() {
    slides.forEach(slide => {
        slide.classList.remove("active", "left", "right");
    });

    slides[indexAtual].classList.add("active");

    const prev = (indexAtual - 1 + slides.length) % slides.length;
    const next = (indexAtual + 1) % slides.length;

    slides[prev].classList.add("left");
    slides[next].classList.add("right");

    dots.forEach(dot => dot.classList.remove("active"));
    dots[indexAtual].classList.add("active");
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        indexAtual = index;
        atualizarCarrossel();
    });
});

slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
        indexAtual = index;
        atualizarCarrossel();
    });
});

atualizarCarrossel();




/* VIDEO SCROLL  */
gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".stack-card");
const section = document.querySelector(".stack-section");
const stack = section.querySelector(".stack");

section.style.height = `${cards.length * 150}vh`;

/* Estado inicial */
cards.forEach((card, i) => {
    gsap.set(card, {
        yPercent: i === 0 ? 0 : 120,
        scale: 1,
        filter: "blur(0px)",
        zIndex: i
    });
});

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: stack,
        pinSpacing: true,
        anticipatePin: 1
    }
});

cards.forEach((card, i) => {
    if (i === 0) return;

    // Animação do card ATUAL entrando
    tl.to(card, {
        yPercent: 0,
        duration: 1
    }, i - 1);


    tl.to(cards[i - 1], {
        scale: 0.9,
        filter: "blur(10px)",
        opacity: 0.5,
        duration: 1
    }, "<");
});



/* ===== ANIMAÇÃO DE TROCA DE PALAVRAS NO TÍTULO ===== */
const palavras = ["crescer", "evoluir", "inovar", "expandir", "fortalecer", "liderar"];
let i = 0;
const elementoPalavra = document.querySelector("#palavra-mutavel");

function trocarPalavra() {
    const proximaPalavra = palavras[(i + 1) % palavras.length];

    // Timeline para a troca
    const tlPalavra = gsap.timeline({
        onComplete: () => {
            i++;
            setTimeout(trocarPalavra, 2000); // Espera 2 segundos para a próxima troca
        }
    });

    // 1. Sai a palavra atual (sobe e some)
    tlPalavra.to(elementoPalavra, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
    })
        // 2. Muda o texto enquanto está invisível
        .call(() => {
            elementoPalavra.textContent = proximaPalavra;
        })
        // 3. Entra a nova palavra (vem de baixo para o centro)
        .fromTo(elementoPalavra,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
}

// Inicia a animação após carregar a página
window.addEventListener("load", () => {
    setTimeout(trocarPalavra, 2000);

    
});





/* ===== ANIMAÇÃO DA DESCRIÇÃO ===== */
window.addEventListener("load", () => {
    gsap.to(".descricao", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",
        delay: 1 // Começa um pouco depois do título principal
    });
});

const textoDescricao = document.querySelector(".descricao");
const conteudoOriginal = textoDescricao.textContent;
textoDescricao.textContent = ""; // 
textoDescricao.style.opacity = "1";
textoDescricao.style.filter = "none";

let charIndex = 0;

function digitar() {
    if (charIndex < conteudoOriginal.length) {
        textoDescricao.textContent += conteudoOriginal.charAt(charIndex);
        charIndex++;
        setTimeout(digitar, 15); // Velocidade da digitação
    }
}

// Inicia a digitação 
setTimeout(digitar, 0.5);




/* ===== ANIMAÇÕES DA BOX INFO (HEADER) ===== */
window.addEventListener("load", () => {
    // 1. Entrada suave do card
    gsap.to(".box-info", {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5

        
    });

    

    // 2. Animação de "pulo" nos números quando o contador termina
    const animarNumero = (elemento) => {
        gsap.fromTo(elemento, 
            { scale: 1 }, 
            { scale: 1.3, duration: 9.2, yoyo: true, repeat: 1, ease: "power2.out" }
        );
    };

    // Melhorando o contador existente para incluir o efeito
    const contadores = document.querySelectorAll(".contador");
    contadores.forEach(contador => {
        const max = Number(contador.getAttribute("data-max"));
        let atual = 0;
        
        const timer = setInterval(() => {
            atual += Math.ceil(max / 30); // Velocidade ajustada
            if (atual >= max) {
                contador.textContent = max;
                clearInterval(timer);
                animarNumero(contador); // Chama o efeito visual ao finalizar
            } else {
                contador.textContent = atual;
            }
        }, 170);
    });
});


/* ===== ANIMAÇÃO DE REVELAR AO SCROLL ===== */
window.addEventListener("load", () => {
    // Seleciona todos os elementos com a classe .revelar
    const itensParaRevelar = gsap.utils.toArray(".revelar");

    itensParaRevelar.forEach((item) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%", // Começa a animar quando o topo do item atinge 85% da altura da tela
                toggleActions: "play none none none", // Toca uma vez e não reseta ao voltar
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Animação especial para as LI da lista (efeito cascata/stagger)
    gsap.to(".lado-direito li", {
        scrollTrigger: {
            trigger: ".lado-direito ul",
            start: "top 80%"
        },
        opacity: 1,
        x: 0,
        stagger: 0.2, // Faz um aparecer depois do outro
        duration: 0.8,
        ease: "back.out(1.7)"
    });
});







