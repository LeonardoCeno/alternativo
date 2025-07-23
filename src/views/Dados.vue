<template>
<div class="tudo" >
    <div class="dados-container">
        <input type="file" ref="fileInput" accept="image/*" style="display:none" @change="onFileChange" />
        <img :src="userImageUrl" alt="" class="foto-usuario" @click="triggerFileInput" title="Clique para alterar a foto" />
        <div v-if="carregando">Carregando dados...</div>
        <div v-else-if="erro" class="erro">{{ erro }}</div>
        <div v-else>
            <div class="informacoes" ref="informacoesRef">
                <div class="info-item">
                    <img src="/src/components/img/editando.png" alt="editar" class="edit-icon" @click="editarNome" />
                    <template v-if="editandoNome">
                        <input v-model="novoNome" ref="nomeInputRef" type="text" class="info-input" autofocus />
                    </template>
                    <template v-else>
                        <p class="info-label"><strong>Nome:</strong> {{ usuario.name }}</p>
                    </template>
                </div>
                <div class="info-item">
                    <img src="/src/components/img/editando.png" alt="editar" class="edit-icon" @click="editarEmail" />
                    <template v-if="editandoEmail">
                        <input v-model="novoEmail" ref="emailInputRef" type="email" class="info-input" autofocus />
                    </template>
                    <template v-else>
                        <p class="info-label"><strong>Email:</strong> {{ usuario.email }}</p>
                    </template>
                </div>
                <div class="info-item">
                    <img src="/src/components/img/editando.png" alt="editar" style="opacity: 0;" class="edit-icon" @click="editarSenha" />
                    <template v-if="editandoSenha">
                        <input v-model="novaSenha" ref="senhaInputRef" @blur="salvarSenha" @keyup.enter="salvarSenha" type="password" class="info-input" placeholder="Nova senha" autofocus />
                    </template>
                    <template v-else>
                        <p class="info-label"><strong>Senha:</strong> ********</p>
                    </template>
                </div>
                <button v-if="editandoNome || editandoEmail" class="confirmar-btn" @click="confirmarEdicao">Confirmar alterações</button>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, nextTick } from 'vue'
import api, { getUsuario } from '../services/api'

const usuario = ref({})
const carregando = ref(true)
const erro = ref('')
const fileInput = ref(null)
const Inputfile = ref(null)
const wallpaperStyle = ref({})

const BASE_IMAGE_URL = 'http://35.196.79.227:8000'

const userImageUrl = computed(() => {
    if (!usuario.value.image_path) return '/placeholder-image.jpg'
    return BASE_IMAGE_URL + usuario.value.image_path
})

const editandoNome = ref(false)
const editandoEmail = ref(false)
const editandoSenha = ref(false)
const novoNome = ref('')
const novoEmail = ref('')
const novaSenha = ref('')

const nomeInputRef = ref(null)
const emailInputRef = ref(null)
const senhaInputRef = ref(null)

function useClickOutside(targetRef, callback) {
    function handler(event) {
        if (targetRef.value && !targetRef.value.contains(event.target)) {
            callback()
        }
    }
    onMounted(() => {
        document.addEventListener('mousedown', handler)
    })
    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', handler)
    })
}

useClickOutside(senhaInputRef, () => { if (editandoSenha.value) editandoSenha.value = false })

const informacoesRef = ref(null)

function cancelarEdicao() {
    if (editandoNome.value) {
        novoNome.value = usuario.value.name
        editandoNome.value = false
    }
    if (editandoEmail.value) {
        novoEmail.value = usuario.value.email
        editandoEmail.value = false
    }
}

function useClickOutsideDiv(targetRef, callback) {
    function handler(event) {
        if (targetRef.value && !targetRef.value.contains(event.target)) {
            callback()
        }
    }
    onMounted(() => {
        document.addEventListener('mousedown', handler)
    })
    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', handler)
    })
}

useClickOutsideDiv(informacoesRef, cancelarEdicao)

onMounted(async () => {
    await carregarUsuario()
    const savedWallpaper = localStorage.getItem('wallpaperBg')
    if (savedWallpaper) {
        wallpaperStyle.value = {
            backgroundImage: `url('${savedWallpaper}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
    }
})

async function carregarUsuario() {
    try {
        usuario.value = await getUsuario()
        novoNome.value = usuario.value.name
        novoEmail.value = usuario.value.email
        novaSenha.value = ''
    } catch (e) {
        erro.value = 'Erro ao carregar dados do usuário.'
    } finally {
        carregando.value = false
    }
}

function triggerFileInput() {
    if (fileInput.value) fileInput.value.click()
}

async function onFileChange(event) {
    const file = event.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)
    try {
        const response = await api.put('/users/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        usuario.value = response.data
    } catch (e) {
        erro.value = 'Erro ao atualizar imagem de perfil.'
    }
}

function editarNome() {
    editandoNome.value = true
}

function editarEmail() {
    editandoEmail.value = true
}

function editarSenha() {
    editandoSenha.value = true
    novaSenha.value = ''
}

async function confirmarEdicao() {
    let alterou = false
    try {
        if (editandoNome.value && novoNome.value && novoNome.value !== usuario.value.name) {
            alterou = true
        }
        if (editandoEmail.value && novoEmail.value && novoEmail.value !== usuario.value.email) {
            alterou = true
        }
        if (alterou) {
            const response = await api.put('/users/me', { name: novoNome.value, email: novoEmail.value })
            usuario.value = response.data
        }
        editandoNome.value = false
        editandoEmail.value = false
    } catch (e) {
        erro.value = 'Erro ao atualizar dados.'
    }
}

</script>

<style scoped>

.tudo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.dados-container {
    margin-top: 1vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 40%;
    background: #fff;
    padding: 32px 24px;
    font-family: 'Inter', Arial, sans-serif;
}
h2 {
    color: #000000;
    margin-bottom: 24px;
    text-align: center;
    font-size: 3vw;
}
p {
    font-size: 2vw;
    margin-bottom: 12px;
}
.erro {
    color: #e11d48;
    text-align: center;
    margin-top: 20px;
}

.informacoes {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
}

.foto-usuario {
    width: 15vw;
    height: 15vw;
    min-width: 120px;
    min-height: 120px;
    border-radius: 50%;
    border: 1.5px solid #000000;
    margin: 18px 0 28px 0;
    cursor: pointer;
    transition: 0.2s;
    z-index: 2;
    object-fit: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.foto-usuario:hover {
    transition: 0.1s;
    background-color: rgb(196, 196, 196);
    background-image: url('../components/img/baixar.png');
    background-size: 15%;
    opacity: 0.9;
    filter: brightness(80%);
}


.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    flex-wrap: nowrap;
    gap: 8px;
}
.info-label {
    margin: 0;
    user-select: none;
    transition: color 0.2s;
    color: inherit;
    text-decoration: none;
    font-size: 2vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.edit-icon {
    width: 25px;
    height: 25px;
    margin-right: 8px;
    cursor: pointer;
    flex-shrink: 0;
}
.info-input {
    font-size: 2vw;
    min-width: 0;
    flex: 1 1 0%;
}

.confirmar-btn {
    margin-top: 18px;
    padding: 8px 24px;
    background: #06080afa;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
}
.confirmar-btn:hover {
    background: #252525;
}

@media (max-width: 1000px) {
    .info-label, .info-input {
        font-size: 4vw;
    }
    p {
    font-size: 3vw;
    margin-bottom: 12px;
}
    .wallpaper {
        height: 275px;
    }
    .informacoes {
        margin-top: 100px;
    }
}

@media (max-width: 580px) {
    .info-label, .info-input {
        font-size: 3.5vw;
    }
    .wallpaper {
        width: 70vw;
        height: 205px;
    }
    .informacoes {
        margin-top: 50px;
    }
}

</style>