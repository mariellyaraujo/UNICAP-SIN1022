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
      Alert.alert("Ops!", "Escreva o que você precisa fazer primeiro ✨");
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
          placeholder="O que temos para hoje?"
          placeholderTextColor="#BA6B7E"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TouchableOpacity 
          style={[styles.addButton, mutationAdd.isPending && { opacity: 0.7 }]} 
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

      {isFetching && <ActivityIndicator size="small" color="#962D3E" style={{ marginBottom: 10 }} />}

      <ScrollView style={styles.tasksContainer} showsVerticalScrollIndicator={false}>
        {data?.map((t) => (
          <View key={t.id || t.objectId} style={styles.taskCard}>
            <View style={styles.taskInfo}>
              <Switch
                value={t.concluida}
                trackColor={{ false: "#F8BBD0", true: "#962D3E" }}
                thumbColor={t.concluida ? "#fff" : "#fff"}
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
    backgroundColor: "#FCE4EC", 
    paddingTop: 60,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A0E0E", 
    marginBottom: 25,
    fontFamily: "System", 
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF5F8", 
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 55,
    fontSize: 16,
    color: "#962D3E",
    borderWidth: 1,
    borderColor: "#F8BBD0",
    shadowColor: "#962D3E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addButton: {
    backgroundColor: "#962D3E", 
    width: 55,
    height: 55,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "300",
  },
  tasksContainer: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#962D3E", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  taskText: {
    fontSize: 17,
    color: "#5D4037",
    marginLeft: 12,
    flex: 1,
  },
  strikethroughText: {
    textDecorationLine: "line-through",
    color: "#BA6B7E", 
    fontStyle: 'italic'
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#FFF0F3",
  },
  deleteButtonText: {
    color: "#962D3E",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: 'uppercase'
  },
});