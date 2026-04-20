import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Verifique se o caminho do seu arquivo de API mudou ou se ainda é back4app
import { adicionarTarefa, getTarefas, atualizarTarefa, deletarTarefa } from "@/back4app";

export default function TarefasPage() {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

  const mutationAdd = useMutation({
    mutationFn: adicionarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });

  const mutationUpdate = useMutation({
    // Ajustado para passar id, descricao (opcional) e concluida
    mutationFn: ({ id, descricao, concluida }) => atualizarTarefa(id, descricao, concluida),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id) => deletarTarefa(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });

  const [descricao, setDescricao] = useState("");

  async function handleAdicionarTarefaPress() {
    if (descricao.trim() === "") {
      Alert.alert("Descrição inválida", "Preencha a descrição da tarefa");
      return;
    }
    mutationAdd.mutate({ descricao, concluida: false });
    setDescricao("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="O que precisa ser feito?"
          placeholderTextColor="#888"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TouchableOpacity 
          style={[styles.addButton, mutationAdd.isPending && { backgroundColor: '#ccc' }]} 
          onPress={handleAdicionarTarefaPress}
          disabled={mutationAdd.isPending}
        >
          {mutationAdd.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>+</Text>
          )}
        </TouchableOpacity>
      </View>

      {isFetching && <ActivityIndicator size="small" color="#6200ee" style={{ marginBottom: 10 }} />}

      <ScrollView style={styles.tasksContainer} showsVerticalScrollIndicator={false}>
        {data?.map((t) => (
          // Atenção: Use t.id ou t.objectId conforme sua API retornar
          <View key={t.id || t.objectId} style={styles.taskCard}>
            <View style={styles.taskInfo}>
              <Switch
                value={t.concluida}
                trackColor={{ false: "#eee", true: "#d1c4e9" }}
                thumbColor={t.concluida ? "#6200ee" : "#f4f3f4"}
                onValueChange={(value) =>
                  mutationUpdate.mutate({ id: t.id || t.objectId, descricao: t.descricao, concluida: value })
                }
              />
              <Text style={[styles.taskText, t.concluida && styles.strikethroughText]}>
                {t.descricao}
              </Text>
            </View>
            
            <TouchableOpacity 
              onPress={() => mutationDelete.mutate(t.id || t.objectId)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    backgroundColor: "#6200ee",
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  tasksContainer: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: "#444",
    marginLeft: 10,
    flex: 1,
  },
  strikethroughText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#ffebee",
  },
  deleteButtonText: {
    color: "#ff1744",
    fontSize: 12,
    fontWeight: "bold",
  },
});