import { useState, useEffect } from 'react';
import { criarFilme, atualizarFilme } from '../services/api';

// Interface para os dados do filme (ID opcional para casos de criação)
interface FilmeDados {
  id?: string;
  titulo: string;
  imagem: string;
  nota: number;
}

// Interface das props recebidas pelo componente Form
interface FormProps {
  onSuccess: () => void;            // Callback executado após salvar com sucesso
  filmeEmEdicao: FilmeDados | null; // Objeto do filme a ser editado (null = criação)
  aoCancelar: () => void;           // Callback para cancelar a operação
}

export function Form({ onSuccess, filmeEmEdicao, aoCancelar }: FormProps) {
  const [titulo, setTitulo] = useState('');
  const [imagem, setImagem] = useState('');
  const [nota, setNota] = useState(0);

  // Effect para sincronizar os campos do formulário quando o filme selecionado muda
  useEffect(() => {
    if (filmeEmEdicao) {
      setTitulo(filmeEmEdicao.titulo);
      setImagem(filmeEmEdicao.imagem);
      setNota(filmeEmEdicao.nota);
    } else {
      // Reseta os campos se não houver filme em edição
      setTitulo('');
      setImagem('');
      setNota(0);
    }
  }, [filmeEmEdicao]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const dadosDoFilme = { titulo, imagem, nota };

    if (filmeEmEdicao && filmeEmEdicao.id) {
      // Atualização de registro existente
      await atualizarFilme(filmeEmEdicao.id, dadosDoFilme);
      alert('Filme atualizado com sucesso!');
    } else {
      // Criação de novo registro
      await criarFilme(dadosDoFilme);
      alert('Filme adicionado com sucesso!');
    }

    // Limpa o formulário e notifica o componente pai
    setTitulo('');
    setImagem('');
    setNota(0);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
      <h3>{filmeEmEdicao ? 'Editar Filme' : 'Adicionar Novo Filme'}</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Título: </label>
        <input 
          type="text" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          required 
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>URL da Imagem: </label>
        <input 
          type="text" 
          value={imagem} 
          onChange={(e) => setImagem(e.target.value)} 
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Nota (0-10): </label>
        <input 
          type="number" 
          value={nota} 
          onChange={(e) => setNota(Number(e.target.value))} 
          min="0" max="10"
        />
      </div>

      <button type="submit">{filmeEmEdicao ? 'Salvar Alterações' : 'Adicionar Filme'}</button>
      
      {/* Botão de Cancelar (renderizado apenas no modo de edição) */}
      {filmeEmEdicao && (
        <button 
          type="button" 
          onClick={aoCancelar}
          style={{ marginLeft: '10px', backgroundColor: '#ccc' }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}