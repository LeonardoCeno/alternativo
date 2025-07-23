<template>
    <div class="fixador" >
    <header>
        <a class="logo desktop" href="/">
        <img src="../components/img/agrsimtabao-Photoroom.png" alt="" />
        </a>
        <div class="input desktop">
            <input type="text" placeholder="Livros, Mangás, novas visões..." />
            <img src="../components/img/LupaFinal.png" alt="" />
        </div>
        <div class="botoes desktop">
            <button>
            <p>Carrinho</p>
            <img src="../components/img/carrinhofinal.png" alt="" />
            </button>
            <button>
                <p>Pedidos</p>
                <img src="../components/img/listafinal.png" alt="" />
            </button>
            <router-link v-if="!isLoggedIn" to="/login">   
            <button>
                <p>Entrar</p>
                <img src="../components/img/usuariofinal.png" alt="" />
            </button>
            </router-link>
            <div v-else class="conta-dropdown-wrapper" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false" style="position: relative; display: inline-block;">
                <button>
                    <p>Conta</p>
                    <img src="../components/img/usuariofinal.png" alt="" />
                </button>
                <div v-if="showDropdown" class="conta-dropdown-menu">
                    <button @click="goToPainel">Dados</button>
                    <button @click="logout">Sair</button>
                </div>
            </div>
        </div>
        <div class="topo-mobile mobile">
            <a class="logo" href="">
            <img src="../components/img/agrsimtabao-Photoroom.png" alt="" />
            </a>
            <div class="botoes">
                <router-link v-if="!isLoggedIn" to="/login">   
            <button>
                <p>Entrar</p>
                <img src="../components/img/usuariofinal.png" alt="" />
            </button>
            </router-link>
            <div v-else class="conta-dropdown-wrapper" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false" style="position: relative; display: inline-block;">
                <button>
                    <p>Conta</p>
                    <img src="../components/img/usuariofinal.png" alt="" />
                </button>
                <div v-if="showDropdown" class="conta-dropdown-menu">
                    <button @click="goToPainel">Dados</button>
                    <button @click="logout">Sair</button>
                </div>
            </div>
                <button>
                <p>Pedidos</p>
                <img src="../components/img/listafinal.png" alt="" />
                </button>
                <button>
                <p>Carrinho</p>
                <img src="../components/img/carrinhofinal.png" alt="" />
                </button>
            </div>
        </div>
        <div class="input mobile">
            <input type="text" placeholder="Pesquisar" />
            <img src="../components/img/LupaFinal.png" alt="" />
        </div>
    </header>

    <div v-if="!esconderCategorias" class="Categorias">
        <div class="categorias-dropdown-wrapper" @mouseenter="showCategoriasDropdown = true" @mouseleave="showCategoriasDropdown = false" style="position: relative; display: inline-block;">
            <button href="#">
                <img src="../components/img/listafinal.png" alt=""> <p>Categorias</p>
            </button>
            <div v-if="showCategoriasDropdown" class="categorias-dropdown-menu">
                <button @click="() => {}">Ação</button>
                <button @click="() => {}">Comédia</button>
                <button @click="() => {}">Romance</button>
                <button @click="() => {}">Livros</button>
                <button @click="() => {}">Mangás</button>
                <button @click="() => {}">Artbooks</button>
                <button @click="() => {}">Ofertas</button>
                <button @click="() => {}">Tudo</button>
            </div>
        </div>
        <button href=""> <img src="../components/img/Lancamentofinal-Photoroom.png" alt=""> <p>Lançamentos</p></button>
        <button href=""> <img src="../components/img//Livrofinalverdadeiro-Photoroom.png" alt=""> <p>Livros</p></button>
        <button href=""> <img src="../components/img/mangáfinal.png" alt=""> <p>Mangás</p></button>
        <button href=""> <img src="../components/img/pincel.png" alt=""> <p>Artbooks</p></button>
        <button href=""> <img src="../components/img/ofertasfinal.png" alt=""> <p>Ofertas</p></button>
        <button href=""> <img src="../components/img/Tudofinal-Photoroom.png" alt=""> <p>Tudo</p></button>
    </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '../services/api'
import { useRouter, useRoute } from 'vue-router'

// Função para checar se o usuário está logado (token em memória)
const isLoggedIn = computed(() => !!api.defaults.headers.common['Authorization'])
const showDropdown = ref(false)
const showCategoriasDropdown = ref(false)
const router = useRouter()
const route = useRoute()

const painelChildrenRoutes = [
    'Dados', 'Cupons', 'Pedidos', 'Favoritos', 'Enderecos', 'Carrinho',
    'ADMcategorias', 'ADMprodutos', 'ADMpedidos', 'ADMcupons'
]

const esconderCategorias = computed(() => {
    return painelChildrenRoutes.includes(route.name)
})

function logout() {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    showDropdown.value = false
    window.location.reload()
}

function goToPainel() {
    showDropdown.value = false
    router.push('/dados')
}
</script>

<style scoped>

header {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.658);
    min-height: 12vh;
    gap: 6vw;
    flex-wrap: wrap;
    padding: 10px;
}

.logo {
    position: relative;
    left: 20px;
    width: 12%;
    display: flex;
}

.logo img {
    width: auto;
    height: 105px;
    filter: brightness(20%);
    transform: rotate(-9deg);
}

.logo img:hover{
    transition: 0.4s ease-in-out;
    filter: brightness(65%);
}

.input {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 0 20px;
    width: 36vw;
    height: 45px;
    gap: 10px;
    flex-shrink: 1;
    border: 1px solid #000000;
}

.input img {
    width: auto;
    height: 4vh;
    filter: brightness(20%);
}

input {
    width: 36vw;
    border: none;
    outline: none;
    background-color: transparent;
    min-width: 100px;
    font-size: 16px;
    color: #333;
}

input::placeholder {
    color: #888;
    font-style: italic;
}

.botoes {
    display: flex;
    gap: 10px;
    font-size: 15px;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    right: 15px;
}

.botoes p {
    font-weight: bold;
    font-size: 16px;
}

button {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #000000;
    white-space: nowrap;
    background: transparent;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    transition: color 0.1s;
    font-weight: 500;
    font-size: 15px;
    height: 55px;
}

.botoes button:hover {
    color: #079ac7;
}

button img {
    width: auto;
    height: 3vh;
    transition: 0.1s;
}

button:hover img {
    filter: invert(45%) sepia(65%) saturate(1000%) hue-rotate(160deg) brightness(105%) contrast(100%);
}

.botoes img {
    width: 24px;
    height: 24px;
}

.mobile {
    display: none;
}

@media (max-width: 768px) {
    .desktop {
        display: none;
    }
    .mobile {
        display: flex;
    }
    header {
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .topo-mobile {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 90vw;
    }

    .topo-mobile .logo {
        justify-content: flex-start;
        width: auto;
    }

    .topo-mobile .logo img {
        height: 60px;
        filter: brightness(20%);
    }

    .topo-mobile .logo img:hover {
        transition: 0.4s ease-in-out;
        filter: brightness(65%);
    }

    .input {
        width: 90vw;
    }

    input {
        width: 75vw;
    }

    .botoes {
        gap: 20px;
        flex-wrap: nowrap;
        justify-content: flex-end;
    }

    button p {
        font-size: 14px;
    }

    button img {
        height: 4vh;
    }

    .logo {
        position: static;
    }
}

.Categorias {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 7.5vh;
    background: #02060af5;
    font-size: 14px;
    gap: 70px;
}

.Categorias img {
    width: 1.1vw;
    min-width: 12px;
    height: auto;
    filter: brightness(0) invert(1);
    transition: all 0.3s ease;
}

.Categorias button {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 5px 10px;
    border-radius: 10px;
    transition: color 0.2s ease;
    color: white;
    height: 55px;
    font-weight: bold;
}

.Categorias button:hover {
    color: #63b3ed;
}

.Categorias button:hover img {
    filter: brightness(0) invert(45%) sepia(65%) saturate(1050%) hue-rotate(160deg) brightness(115%) contrast(100%);
}

@media (max-width: 950px) {
    .Categorias button:nth-child(3),
    .Categorias button:nth-child(5),
    .Categorias button:nth-child(4) {
        display: none;
    }
    .Categorias {
        gap: 55px;
    }
}

@media (max-width: 550px) {
    .Categorias button:nth-child(6) {
        display: none;
    }
    .Categorias {
        gap: 40px;
    }
}

.conta-dropdown-menu {
    position: absolute;
    top: 51px;
    background: #fff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    min-width: 150px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    margin-top: 4px;
    border: 1px, solid #000000;
}
.conta-dropdown-menu button {
    color: #000000;
    padding: 10px 18px;
    text-align: left;
    width: 200px;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s;
}
.conta-dropdown-menu button:hover {
    color: #079ac7;
    transition: color 0.2s;
}

.categorias-dropdown-menu {
    position: absolute;
    top: 51px;
    background: #fff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    min-width: 150px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    margin-top: 4px;
    border: 1px, solid #000000;
}
.categorias-dropdown-menu button {
    color: #000000;
    padding: 10px 18px;
    text-align: left;
    width: 200px;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s;
}
.categorias-dropdown-menu button:hover {
    color: #079ac7;
    transition: 0.1s;
}

</style>
