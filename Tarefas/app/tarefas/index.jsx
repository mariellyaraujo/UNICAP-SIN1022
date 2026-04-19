import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
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
    mutationFn: ({ id, concluida }) => atualizarTarefa(id, concluida),
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
      Alert.alert("Descrição inválida", "Preencha a descrição da tarefa", [
        { text: "OK", onPress: () => {} },
      ]);
      return;
    }
    mutationAdd.mutate({ descricao, concluida: false });
    setDescricao("");
  }

  return (
    <View style={styles.container}>
      {(isFetching || mutationAdd.isPending) && <ActivityIndicator size="large" />}
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button
        title="Adicionar Tarefa"
        onPress={handleAdicionarTarefaPress}
        disabled={mutationAdd.isPending}
      />
      <View style={styles.hr} />
      <View style={styles.tasksContainer}>
        {data?.map((t) => (
          <View key={t.objectId} style={styles.taskRow}>
            <Text style={t.concluida && styles.strikethroughText}>
              {t.descricao}
            </Text>
            <Switch
              value={t.concluida}
              onValueChange={(value) =>
                mutationUpdate.mutate({ id: t.objectId, concluida: value })
              }
            />
            <Button
              title="Excluir"
              color="red"
              onPress={() => mutationDelete.mutate(t.objectId)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tasksContainer: {
    width: "100%",
    paddingLeft: 15,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "90%",
    marginBottom: 5,
  },
  hr: {
    height: 1,
    backgroundColor: "black",
    width: "95%",
    marginVertical: 10,
  },
  strikethroughText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "red",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
