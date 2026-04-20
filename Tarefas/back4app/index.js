import axios from "axios";

const urlBase = "https://atv-tarefas-aos.vercel.app/tarefas";

export async function getTarefas() {
  const response = await axios.get(urlBase);
  return response.data; 
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa);
  return response.data;
}

export async function atualizarTarefa(id, descricao, concluida) {
  const response = await axios.put(`${urlBase}/${id}`, { 
    descricao, 
    concluida 
  });
  return response.data;
}

export async function deletarTarefa(id) {
  const response = await axios.delete(`${urlBase}/${id}`);
  return response.data;
}