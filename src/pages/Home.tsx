import { useEffect, useState } from 'react';
import { getFilmes, excluirFilme } from '../services/api';
import { Form } from '../components/Form';

interface Filme {
  id: string;
  titulo: string;
  imagem: string;
  nota: number;
}

export function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  
  // Estado que armazena o filme selecionado para edição (null = modo criação)
  const [filmeEmEdicao, setFilmeEmEdicao] = useState<Filme | null>(null);

  async function carregarDados() {
    const dados = await getFilmes();
    setFilmes(dados);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleExcluir(id: string) {
    if (confirm('Tem a certeza que quer excluir este filme?')) {
      await excluirFilme(id);
      carregarDados();
    }
  }

  // Define o filme atual no estado para preencher o formulário
  function handleEditar(filme: Filme) {
    setFilmeEmEdicao(filme);
    
    // Rola a página para o topo para facilitar a visualização do formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Callback executado após salvar/atualizar um filme com sucesso
  function handleSucesso() {
    carregarDados();          // Recarrega a lista atualizada
    setFilmeEmEdicao(null);   // Reseta o estado para sair do modo edição
  }

  // Função para cancelar a operação e limpar o formulário
  function handleCancelar() {
    setFilmeEmEdicao(null);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Meu Catálogo de Filmes</h1>
      
      {/* Componente de Formulário recebendo os estados e callbacks de controle */}
      <Form 
        onSuccess={handleSucesso} 
        filmeEmEdicao={filmeEmEdicao}
        aoCancelar={handleCancelar}
      />
      
      <hr style={{ margin: '20px 0' }} />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filmes.map(filme => (
          <li key={filme.id} style={{ border: '1px solid #ddd', marginBottom: '15px', padding: '15px', borderRadius: '8px', display: 'flex', gap: '20px', backgroundColor: '#fff', color: '#000' }}>
            
            {/* Renderização da Imagem */}
            <div style={{ flexShrink: 0 }}>
              {filme.imagem ? (
                <img src={filme.imagem} alt={filme.titulo} style={{ width: '120px', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
              ) : (
                <div style={{ width: '120px', height: '180px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sem img</div>
              )}
            </div>
            
            {/* Renderização dos Detalhes e Ações */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ marginTop: 0 }}>{filme.titulo}</h2>
                <p><strong>Nota:</strong> {filme.nota} / 10 ⭐</p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleEditar(filme)}
                  style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Editar
                </button>

                <button 
                  onClick={() => handleExcluir(filme.id)}
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}