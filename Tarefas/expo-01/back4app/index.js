import axios from "axios";

const urlBase = "https://parseapi.back4app.com/classes/Tarefa";
const headers = {
  "X-Parse-Application-Id": "V5XCMWk5ZbEwZJLNPUH8UcQs2S2JfqQGiqE2XqyS",
  "X-Parse-JavaScript-Key": "alleCh5CXaYMwccNUMlbqAyU3KQfy6Z9M2pQN79x",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export async function getTarefas() {
  const response = await axios.get(urlBase, {
    headers: headers,
  });
  return response.data.results;
}

export async function adicionarTarefa(novaTarefa) {
  const response = await axios.post(urlBase, novaTarefa, {
    headers: headersJson,
  });
  return response.data;
}

export async function atualizarTarefa(id, concluida) {
  const response = await axios.put(`${urlBase}/${id}`, { concluida }, {
    headers: headersJson,
  });
  return response.data;
}

export async function deletarTarefa(id) {
  const response = await axios.delete(`${urlBase}/${id}`, {
    headers: headers,
  });
  return response.data;
}
