const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];
//JSON.parse transforma oque foi transformado em string em uma array com seus  objetos novamnete  
//verifica se já existe registros no localStorage, se caso tiver, ele inicia o array com os registros que tem lá
//se não, ele cria um array vazio.

itens.forEach((element) => {
    criaElemento(element);
});

form.addEventListener('submit',(event) =>{
    event.preventDefault(); 
    
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];
    const existe = itens.find( element => element.nome === nome.value);
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id;
        
        atualizaElemento(itemAtual);

        itens[itens.findIndex(element => element.id === existe.id )] = itemAtual;
    }else{
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        
        criaElemento(itemAtual);
        
        itens.push(itemAtual); //adiciona registros no array
        //localStorage.setItem adiciona registros no localStorage
        //JSON.stringify(itens) converte o objeto para string. 
        
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';
})


function criaElemento(item){
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const quantidadeItem = document.createElement('strong');
    quantidadeItem.innerHTML = item.quantidade;
    quantidadeItem.dataset.id = item.id;
    
    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));
    
    lista.appendChild(novoItem);

}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id);
    })
    
    return elementoBotao;
}


function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
   
}

function deletaElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}