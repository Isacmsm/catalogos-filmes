// Define a URL base da API local
const BASE_URL = 'http://localhost:3000';

// Busca a lista completa de filmes (GET)
export async function getFilmes() {
  const response = await fetch(`${BASE_URL}/filmes`);
  return await response.json();
}

// Interface para tipagem do objeto de filme na criação/edição
interface NovoFilme {
  titulo: string;
  imagem: string;
  nota: number;
  descricao?: string;
}

// Envia um novo filme para o banco de dados (POST)
export async function criarFilme(filme: NovoFilme) {
  const response = await fetch(`${BASE_URL}/filmes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filme),
  });

  return await response.json();
}

// Remove um filme do banco de dados pelo ID (DELETE)
export async function excluirFilme(id: string) {
  await fetch(`${BASE_URL}/filmes/${id}`, {
    method: 'DELETE',
  });
}

// Atualiza os dados de um filme existente (PUT)
export async function atualizarFilme(id: string, filme: NovoFilme) {
  const response = await fetch(`${BASE_URL}/filmes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filme),
  });

  return await response.json();
}