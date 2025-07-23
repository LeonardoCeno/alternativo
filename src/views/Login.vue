<template>
    <div class="login-bg">
        <div class="login-card">
            <router-link to="/">
            <img :src="logo" alt="Logo" class="login-logo" />
            </router-link>
        <h2 v-if="!showRegister">Bem-vindo ao Manya!</h2>
        <h2 v-else>Crie sua conta</h2>
        <form v-if="!showRegister" @submit.prevent="handleLogin">
        <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" required placeholder="Digite seu e-mail" />
        </div>
        <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="password" required placeholder="Digite sua senha" />
        </div>
        <button type="submit" :disabled="loading">Entrar</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p class="toggle-form">Não tem conta? <a href="#" @click.prevent="showRegister = true">Criar conta</a></p>
        </form>
        <form v-else @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" id="name" v-model="registerName" required placeholder="Seu nome completo" />
            </div>
            <div class="form-group">
                <label for="registerEmail">E-mail</label>
                <input type="email" id="registerEmail" v-model="registerEmail" required placeholder="Digite seu e-mail" />
            </div>
            <div class="form-group">
                <label for="registerPassword">Senha</label>
                <input type="password" id="registerPassword" v-model="registerPassword" required placeholder="Crie uma senha" />
            </div>
            <button type="submit" :disabled="loading">Cadastrar</button>
            <p v-if="registerError" class="error">{{ registerError }}</p>
            <p v-if="registerSuccess" class="success">{{ registerSuccess }}</p>
            <p class="toggle-form">Já tem conta? <a href="#" @click.prevent="showRegister = false">Entrar</a></p>
        </form>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../components/img/LOGOMANYA-Photoroom.png'
import { login, register } from '../services/api'

const logo = logoImg
const showRegister = ref(false)

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const registerError = ref('')
const registerSuccess = ref('')

const router = useRouter()

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.detail || 'Erro ao fazer login.'
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  registerError.value = ''
  registerSuccess.value = ''
  loading.value = true
  try {
    await register(registerName.value, registerEmail.value, registerPassword.value)
    registerSuccess.value = 'Cadastro realizado com sucesso! Faça login.'
    registerName.value = ''
    registerEmail.value = ''
    registerPassword.value = ''
    showRegister.value = false
  } catch (err) {
    registerError.value = err.response?.data?.detail || 'Erro ao cadastrar.'
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #06080a 0%, #14323b 60%, #4f46e5 100%);
}

.login-card {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
  padding: 40px 32px 32px 32px;
  width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.login-logo {
  width: 140px;
  height: auto;
  margin-bottom: 8px;
  filter: invert(1) hue-rotate(180deg) brightness(0.7);
}

h2 {
  color: #06080a;
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
}

.form-group {
  width: 300px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  font-weight: 500;
  margin-bottom: 6px;
  color: #14323b;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #bfc9d1;
  border-radius: 6px;
  font-size: 16px;
  background: #f8fafc;
  color: #222;
  transition: border 0.2s;
}
input:focus {
  border: 1.5px solid #4f46e5;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #14323b 0%, #4f46e5 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s, filter 0.2s;
  box-shadow: 0 2px 8px rgba(79,70,229,0.08);
}
button:disabled {
  background: #bfc9d1;
  cursor: not-allowed;
  filter: grayscale(0.3);
}

.toggle-form {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size: 15px;
}
.toggle-form a {
  color: #4f46e5;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
}
.toggle-form a:hover {
  color: #14323b;
}

.error {
  color: #e11d48;
  margin-top: 10px;
  text-align: center;
  font-size: 15px;
}
.success {
  color: #22c55e;
  margin-top: 10px;
  text-align: center;
  font-size: 15px;
}

@media (max-width: 600px) {
  .login-card {
    max-width: 70vw;
  }
  .login-logo {
    width: 100px;
  }
}
</style>
