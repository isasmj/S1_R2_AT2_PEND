const url = "http://localhost:8000/produtos";

const display = document.querySelector("#conteudo");
const inputId = document.querySelector("#prodId");
const inputNome = document.querySelector("#nomeProd");
const inputValor = document.querySelector("#valor");
const inputCat = document.querySelector("#idCategoria");

const btnGet = document.querySelector("#get");
const btnPost = document.querySelector("#post");
const btnPut = document.querySelector("#put");
const btnDelete = document.querySelector("#delete");

function limparFormulario() {
    inputId.value = "";
    inputNome.value = "";
    inputValor.value = "";
    inputCat.value = "";
}

async function listarProdutos() {
    try {
        const resposta = await fetch(url);
        const resultado = await resposta.json();

        display.innerHTML = "";

        if (resultado.produtos) {
            for (let item of resultado.produtos) {
                const card = document.createElement("div");
                card.className = "produto-item";
                
                // CORRIGIDO: Agora usando crases (backticks) corretamente
                card.innerHTML = `<span><strong>ID: ${item.id}</strong> | ${item.nomeProd} - R$ ${item.valor}</span>`;
                
                display.appendChild(card);
            }
        }
    } catch (err) {
        console.error("Erro na busca:", err);
    }
}

async function cadastrarProduto() {
    if (!inputNome.value || !inputValor.value) {
        return alert("Preencha os campos obrigatórios!");
    }

    const objetoProduto = {
        nomeProd: inputNome.value,
        valor: parseFloat(inputValor.value),
        idCategoria: parseInt(inputCat.value)
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objetoProduto)
        });

        if (res.ok) {
            alert("Sucesso: Produto cadastrado.");
            limparFormulario();
            listarProdutos();
        } else {
            alert("Erro ao tentar cadastrar.");
        }
    } catch (err) {
        console.error("Erro ao cadastrar:", err);
    }
}

async function atualizarProduto() {
    const id = inputId.value;
    if (!id) return alert("Informe o ID para alteração");

    const corpoReq = {
        nomeProd: inputNome.value,
        valor: parseFloat(inputValor.value),
        idCategoria: parseInt(inputCat.value)
    };

    try {
        const res = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpoReq)
        });

        if (res.ok) {
            alert("Produto alterado!");
            limparFormulario();
            listarProdutos();
        } else {
            alert("Erro ao alterar o produto.");
        }
    } catch (err) {
        console.error("Erro ao atualizar:", err);
    }
}

async function excluirProduto() {
    const id = inputId.value;
    if (!id) return alert("ID obrigatório para excluir");

    if (confirm("Deseja realmente excluir este produto?")) {
        try {
            const res = await fetch(`${url}/${id}`, { method: "DELETE" });
            
            if (res.ok) {
                alert("Excluído com sucesso!");
                limparFormulario();
                listarProdutos();
            } else {
                alert("Erro ao excluir.");
            }
        } catch (err) {
            console.error("Erro ao excluir:", err);
        }
    }
}

btnGet.onclick = (e) => { e.preventDefault(); listarProdutos(); };
btnPost.onclick = (e) => { e.preventDefault(); cadastrarProduto(); };
btnPut.onclick = (e) => { e.preventDefault(); atualizarProduto(); };
btnDelete.onclick = (e) => { e.preventDefault(); excluirProduto(); };
