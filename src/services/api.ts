// src/services/api.ts

// Define a URL base da API (JSON Server rodando localmente)
const BASE_URL = 'http://localhost:3000';

// Função assíncrona para buscar todos os filmes do banco de dados
export async function getFilmes() {
  // Faz a requisição HTTP (GET) para o endpoint /filmes
  const response = await fetch(`${BASE_URL}/filmes`);
  
  // Converte a resposta bruta da requisição para o formato JSON
  return await response.json();
}