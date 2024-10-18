document.querySelectorAll('.adicionar').forEach(button => {
    button.addEventListener('click', () => {
        const produto = button.parentElement;
        const nome = produto.dataset.nome;
        const preco = parseFloat(produto.dataset.preco);
        const imgSrc = produto.querySelector('img').src; // Captura a imagem do produto
        
        // Adiciona o produto ao carrinho
        adicionarAoCarrinho(nome, preco, imgSrc);
    });
});

// Modal para exibir detalhes do produto
const modal = document.getElementById('modal');
const imagemModal = document.getElementById('imagem-modal');
const nomeProdutoModal = document.getElementById('nome-produto-modal');
const descricaoProdutoModal = document.getElementById('descricao-produto-modal');
const fecharModal = document.querySelector('.fechar');

document.querySelectorAll('.produto img').forEach(img => {
    img.addEventListener('click', () => {
        const produto = img.parentElement;
        const nome = produto.dataset.nome;
        const descricao = produto.querySelector('p').textContent;
        const src = img.src;

        // Atualiza o modal com os dados do produto
        nomeProdutoModal.textContent = nome;
        descricaoProdutoModal.textContent = descricao;
        imagemModal.src = src;

        // Abre o modal
        modal.style.display = 'block';
    });
});

// Fecha o modal ao clicar no botão de fechar
fecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco, imgSrc) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
        total += preco;
    } else {
        carrinho.push({ nome, preco, quantidade: 1, imgSrc });
        total += preco;
    }
    
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        const li = document.createElement('li');
        
        // Adiciona a mini foto do produto
        const img = document.createElement('img');
        img.src = item.imgSrc;
        img.style.width = '50px'; // Ajuste o tamanho da mini foto
        img.style.marginRight = '10px'; // Espaço entre a imagem e o texto
        li.appendChild(img);
        
        li.appendChild(document.createTextNode(`${item.nome} - R$ ${item.preco.toFixed(2)} (Quantidade: ${item.quantidade})`));
        
        // Botão para remover o item
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', () => {
            removerDoCarrinho(item.nome);
        });
        
        li.appendChild(removerButton);
        listaCarrinho.appendChild(li);
    });

    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(nome) {
    const itemIndex = carrinho.findIndex(item => item.nome === nome);

    if (itemIndex !== -1) {
        const item = carrinho[itemIndex];
        total -= item.preco;

        if (item.quantidade > 1) {
            item.quantidade--;
        } else {
            carrinho.splice(itemIndex, 1); // Remove o item se a quantidade for 1
        }
        
        atualizarCarrinho();
    }
}
