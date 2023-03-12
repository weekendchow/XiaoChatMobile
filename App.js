import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import loadingGif from "./assets/cat-what.gif";

const API_URL = "http://localhost:3000/api";

export default function App() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    console.log(API_URL);

    try {
      const response = await fetch(`${API_URL}/generate-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText: questionInput }),
      });

      const data = await response.json();
      setResult(data.result);
      console.log(data.result);
    } catch (e) {
      console.log(e);
      Alert.alert("Couldn't generate ideas", e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>Thinking hard...</Text>
        <Image
          source={loadingGif}
          style={styles.loading}
          resizeMode="contain"
        />
      </View>
    );
  }

  const onTryAgain = () => {
    setResult("");
  };

  if (result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Here is what I think 💡</Text>
        <View style={styles.answerContainer}>
          <Text style={styles.result}>{result}</Text>
          <TouchableOpacity
            onPress={onTryAgain}
            style={[styles.button, { width: 250, alignSelf: 'center' }]}
          >
            <Text style={styles.buttonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("./assets/dog.png")}
          style={{ width: 30, height: 30, marginBottom: 10 }}
        />
        <Text style={styles.label}>Ask Me</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter a question"
            style={styles.input}
            value={questionInput}
            onChangeText={setQuestionInput}
          />
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Answer me</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginVertical: 80,
  },
  inputContainer: {
    width: 250,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#10a37f",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#10a37f",
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 500,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
  },
  loading: {
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  answerContainer: {
    margin: 20,
  },
  result: {
fontWeight: 'bold',
marginBottom: 40,
  },
});
