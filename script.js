/*
  script.js
  - Objetivo: demonstrar injeção de um catálogo simples na home.
  - Estrutura: dados -> render -> interações (newsletter / botões)
*/

document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo. Em produção, esses viriam de uma API.
    // Dados de exemplo com categoria (útil para filtrar em páginas)
    const products = [
        { id:1, name: 'Camiseta Fé', category: 'camiseta', price: 'R$ 79,90', img: 'https://placehold.co/600x600?text=Camiseta+Fe', desc: 'Algodão 100%, estampa inspiradora' },
        { id:2, name: 'Moletom Esperança', category: 'moletom', price: 'R$ 189,90', img: 'https://placehold.co/600x600?text=Moletom+Esperanca', desc: 'Quentinho e confortável, ideal para cultos' },
        { id:3, name: 'Boné Graça', category: 'bone', price: 'R$ 49,90', img: 'https://placehold.co/600x600?text=Bone+Graca', desc: 'Ajustável, bordado com símbolo' },
        { id:4, name: 'Máscara de Oração', category: 'acessorio', price: 'R$ 19,90', img: 'https://placehold.co/600x600?text=M%C3%A1scara', desc: 'Proteção com mensagem' }
    ];

    // Disponibiliza a lista globalmente para páginas que a consumam (ex.: produtos.html)
    window.products = products;

    document.querySelectorAll('.product-grid').forEach(grid => {
        // detecta categoria padrão do container (data-category) ou usa 'all'
        const defaultCategory = grid.getAttribute('data-category') || 'all';
        renderProducts(grid, products, defaultCategory);
    });

    // Menu responsivo: toggle para nav em telas pequenas
    const menuToggle = document.querySelectorAll('.menu-toggle');
    menuToggle.forEach(btn => {
        const targetId = btn.getAttribute('aria-controls');
        const menu = document.getElementById(targetId);
        if(!menu) return;
        btn.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen);
        });
    });

    // Inicializa comportamento do formulário de newsletter (simulado)
    const form = document.getElementById('newsletter-form');
    if(form) form.addEventListener('submit', handleNewsletterSubmit);
});

/** Renderiza uma lista de produtos dentro de um container DOM */
function renderProducts(container, products, category = 'all'){
    // Limpa conteúdo existente (se houver)
    container.innerHTML = '';

    // Filtra por categoria quando necessário
    const list = category === 'all' ? products : products.filter(p => p.category === category);

    if(list.length === 0){
        container.innerHTML = '<p>Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    list.forEach(p => {
        const card = createProductCard(p);
        container.appendChild(card);
    });
}

/** Cria o elemento DOM de um cartão de produto */
function createProductCard(product){
    const card = document.createElement('article');
    card.className = 'product-card';

    // Estrutura do cartão: imagem, título, descrição, preço e ações
    card.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p class="desc">${product.desc}</p>
        <p class="price">${product.price}</p>
        <div class="product-actions" style="margin-top:10px;display:flex;gap:8px;">
            <a class="btn" href="produtos.html">Ver</a>
            <button class="btn" aria-label="Adicionar ${product.name} ao carrinho">Adicionar</button>
        </div>
    `;

    // Retornar o elemento pronto para ser inserido na página
    return card;
}

/** Handler simples para o formulário de newsletter (apenas demonstração) */
function handleNewsletterSubmit(event){
    event.preventDefault();
    const emailInput = document.getElementById('email');
    if(!emailInput) return;
    const email = emailInput.value.trim();
    if(!email) return alert('Por favor informe um e-mail válido.');

    // Em produção: enviar para API via fetch/axios
    alert(`Obrigado! ${email} foi inscrito.`);
    event.target.reset();
}
