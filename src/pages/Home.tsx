import { useEffect, useState } from 'react';
import { getFilmes } from '../services/api';

// Interface que define o tipo de dados esperado para cada filme
interface Filme {
  id: string;
  titulo: string;
  imagem: string;
  nota: number;
}

export function Home() {
  // Estado para armazenar a lista de filmes retornada pela API
  // Inicia com um array vazio
  const [filmes, setFilmes] = useState<Filme[]>([]);

  // Hook useEffect para carregar os dados assim que o componente for montado
  useEffect(() => {
    async function carregarDados() {
      // Busca os dados utilizando o serviço configurado na api.ts
      const dados = await getFilmes();
      setFilmes(dados);
    }
    carregarDados();
  }, []); 

  // Renderização da interface
  return (
    <div>
      <h1>Meu Catálogo de Filmes</h1>
      
      {/* Mapeia a lista de filmes para exibir um item para cada registro */}
      <ul>
        {filmes.map(filme => (
          <li key={filme.id}>
            <h2>{filme.titulo}</h2>
            <img src={filme.imagem} alt={filme.titulo} width={100} />
            <p>Nota: {filme.nota}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}