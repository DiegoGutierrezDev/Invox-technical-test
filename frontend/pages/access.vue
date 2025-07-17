<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-xl rounded-2xl w-96 p-6">
      <div class="flex mb-6 border-b border-gray-200">
        <button
          class="flex-1 text-center py-2 font-semibold"
          :class="{
            'border-b-2 border-purple text-purple': activeTab === 'login',
            'text-gray-500': activeTab !== 'login',
          }"
          @click="activeTab = 'login'"
        >
          Login
        </button>
        <button
          class="flex-1 text-center py-2 font-semibold"
          :class="{
            'border-b-2 border-purple text-purple': activeTab === 'register',
            'text-gray-500': activeTab !== 'register',
          }"
          @click="activeTab = 'register'"
        >
          Registro
        </button>
      </div>

      <form
        class="space-y-4"
        @submit.prevent="
          activeTab === 'login' ? 'submitLogin()' : submitRegister()
        "
      >
        <input
          v-if="activeTab === 'register'"
          v-model="access.name"
          type="text"
          placeholder="Nombre"
          class="input"
          required
        />
        <input
          v-model="access.email"
          type="email"
          placeholder="Email"
          class="input"
          required
        />
        <input
          v-model="access.password"
          type="password"
          placeholder="Contraseña"
          class="input"
          required
        />
        <div v-if="errorMessage" class="text-red-600 text-sm">
          {{ errorMessage }}
        </div>
        <button type="submit" class="btn">
          {{ activeTab === "login" ? "Login" : "Registrarse" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { reactive, ref } from "vue";

const activeTab = ref<"login" | "register">("login");
const errorMessage = ref<string | null>(null);

interface Form {
  name: string;
  email: string;
  password: string;
}

const access = reactive<Form>({
  name: "",
  email: "",
  password: "",
});

// const submitLogin = () => {
//   console.log("Login con:", access.value);
// };

const submitRegister = async () => {
  const endpoint =
    activeTab.value === "login"
      ? "Login"
      : "https://n1c91b8y49.execute-api.us-east-1.amazonaws.com/dev/users";
  errorMessage.value = "";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(access),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Algo salió mal");
    }
  } catch (err: any) {
    errorMessage.value = err.message || "Error desconocido";
  }
};
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded-lg text-sm;
}
.btn {
  @apply w-full bg-purple text-white py-2 rounded-lg hover:bg-dark-purple;
}
</style>
