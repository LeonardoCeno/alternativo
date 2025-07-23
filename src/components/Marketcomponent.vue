<template>
    <Pracima :visivel="mostrarBtnTopo" />
    <div ref="bannerRef" class="banner">
        <div
        class="carousel-wrapper"
        :style="{ transform: `translateX(-${indexAtual * 100}%)` }">
        <div
            class="carousel-slide"
            v-for="(banner, i) in banners"
            :key="i">
            <a :href="bannerLinks[i]" class="banner-link">
                <img class="img1" :src="banner" alt="banner" />
            </a>
        </div>
        </div>
        <div class="indicators">
            <button 
                v-for="(banner, i) in banners" 
                :key="i"
                class="indicator"
                :class="{ active: indexAtual === i }"
                @click="irParaBanner(i)">
            </button>
        </div>
        
        <button class="nav left" @click="voltar">&#10094;</button>
        <button class="nav right" @click="avancar">&#10095;</button>
    </div>
    <div class="carrosel-linha" >
        <div class="carrosel-movimento">
            <img src="./img/IMAGEMDOSACI.png" alt="">
            <img src="./img/IMAGEMDOSACI2.png" alt="">
            <img src="./img/IMAGEMDOSACI.png" alt="">
            <img src="./img/IMAGEMDOSACI2.png" alt="">
            <img src="./img/IMAGEMDOSACI.png" alt="">
            <img src="./img/IMAGEMDOSACI2.png" alt="">
        </div>
    </div>
    <div class="carrosel-linha" >
        <div class="carrosel-movimento2">
            <img src="./img/IMAGEMDOSACI2.png" alt="">
            <img src="./img/IMAGEMDOSACI.png" alt="">
            <img src="./img/IMAGEMDOSACI2.png" alt="">
            <img src="./img/IMAGEMDOSACI.png" alt="">
            <img src="./img/IMAGEMDOSACI2.png" alt="">
            <img src="./img/IMAGEMDOSACI.png" alt="">
        </div>
    </div>
    <div class="beneficios">
    <div class="item">
        <img src="../components/img/caminhaopenege-Photoroom.png" alt="">
        <div class="texto">
        <strong>FRETE GRÁTIS</strong><br />
        ACIMA DE R$80
        </div>
    </div>

    <div class="item">
        <img src="../components/img/cadeado.png" alt="">
        <div class="texto">
        <strong>COMPRA CERTA</strong><br />
        100% SEGURA
        </div>
    </div>

    <div class="item">
        <img src="../components/img/pix.webp" alt="">
        <div class="texto">
        <strong>PAGAMENTO</strong><br />
        VIA PIX
        </div>
    </div>

    <div class="item">
        <img src="../components/img/cartao.png" alt="">
        <div class="texto">
        <strong>PARCELAS DE</strong><br />
        ATÉ 3X SEM JUROS
        </div>
    </div>
    </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import banner1 from './img/CHEGA.png'
import banner2 from './img/perfect.png'
import banner3 from './img/LIVRO.png'
import Pracima from './pracima.vue'

const banners = [banner1, banner2, banner3]
const bannerLinks = ['', '', ''] // Links para cada banner que vou por ainda
const indexAtual = ref(0)

const mostrarBtnTopo = ref(false)
const bannerRef = ref(null)
let observer = null

const avancar = () => {
    indexAtual.value = (indexAtual.value + 1) % banners.length
}

const voltar = () => {
    indexAtual.value = (indexAtual.value - 1 + banners.length) % banners.length
}

const irParaBanner = (index) => {
    indexAtual.value = index
}

onMounted(() => {
    observer = new window.IntersectionObserver(
        ([entry]) => {
            mostrarBtnTopo.value = !entry.isIntersecting
        },
        { threshold: 0.01 }
        )
        if (bannerRef.value) {
            observer.observe(bannerRef.value)
        }
        setInterval(avancar, 6000)
})

onUnmounted(() => {
        if (observer && bannerRef.value) {
            observer.unobserve(bannerRef.value)
        }
})

</script>

<style scoped>

.carrosel-linha {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    overflow: hidden;
}
.carrosel-movimento {
    display: flex;
    animation: deslizar-linha 120s linear infinite;
    align-items: center;
}

@keyframes deslizar-linha {
    0% { transform: translateX(0); }
    100% { transform: translateX(-300%); }
}

.carrosel-movimento2 {
    display: flex;
    animation: deslizar-linha2 100s linear infinite;
    align-items: center;
}

@keyframes deslizar-linha2 {
    0% { transform: translateX(0); }
    100% { transform: translateX(-300%); }
}

.banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background-color: rgba(240, 240, 240, 0.438);
    height: 45vh;
    min-height: 300px;
    width: 100%;
}

@media (max-width: 1300px) {
    .banner {
        max-width: 98vw;
    }
}
@media (max-width: 900px) {
    .banner {
        min-height: 180px;
        height: 32vw;
        max-width: 100vw;
    }
}
@media (max-width: 650px) {
    .banner {
        min-height: 120px;
        height: 28vw;
        max-width: 100vw;
    }
}
@media (max-width: 480px) {
    .banner {
        min-height: 80px;
        height: 22vw;
        max-width: 100vw;
    }
}

.carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 100%;
    height: 100%;
}

.carousel-slide {
    min-width: 100%;
    height: 100%;
}

.banner-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    cursor: pointer;
}

.img1 {
    width: 100%;
    height: 90%;
    object-position: center;
    background-size: cover;
}

.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background: rgba(0, 0, 0, 0.623);
    color: white;
    border: none;
    padding: 8px 8px;
    cursor: pointer;
    z-index: 10;
}

.left {
    left: 10px;
}

.right {
    right: 10px;
}

.indicators {
    display: flex;
    gap: 12px;
    z-index: 10;
    align-items: center;
    position: relative;
    right: 5px;
    bottom: 1rem;
}

.indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #00264159;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
}

.indicator:hover {
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(1.1);
}

.indicator.active {
    background-color: #14323b;
    transform: scale(1.3);
}

.beneficios {
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    padding: 30px 16px;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;
}

.item {
    background-color: white;
    flex: 1 1 200px;
    max-width: 240px;
    min-width: 160px;
    margin: 0;
    padding: 20px 10px;
    text-align: center;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 10px;
    transition: max-width 0.2s, min-width 0.2s, padding 0.2s;
}

.item img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    margin-bottom: 16px;
    display: block;
    transition: width 0.2s, height 0.2s;
}

.item img[src*="caminhao"] {
    transform: scale(1.8);
    background-color: white;
}

.texto {
    font-size: 0.9rem;
    color: #1c1c1c;
    font-style: italic;
}

.texto strong {
    font-style: normal;
    font-weight: bold;
}

@media (max-width: 768px) {
    .indicators {
    display: none;
    }
    
    .beneficios {
    padding: 30px 16px;
    gap: 20px;
    }
    
    .item {
    padding: 20px 10px;
    }
    
    .item img {
    width: 48px;
    height: 48px;
    }
    
    .item img[src*="caminhao"] {
    transform: scale(1.8);
    }
    
    .texto {
    font-size: 0.9rem;
    }
}

@media (max-width: 650px) {
    
    .indicators {
        bottom: 10px;
        gap: 8px;
    }
    
    .indicator {
        width: 8px;
        height: 8px;
    }
    
    .beneficios {
        padding: 20px 12px;
        gap: 16px;
    }
    
    .item {
        padding: 16px 8px;
    }
    
    .item img {
        width: 40px;
        height: 40px;
    }
    
    .item img[src*="caminhao"] {
        transform: scale(1.5);
    }
    
    .texto {
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .beneficios {
        padding: 16px 8px;
        gap: 12px;
    }
    
    .item {
        padding: 12px 6px;
    }
    
    .item img {
        width: 32px;
        height: 32px;
    }
    
    .item img[src*="caminhao"] {
        transform: scale(1.3);
    }
    
    .texto {
        font-size: 0.7rem;
    }
}

.espaco2 {
    background-color:  #02060af5;
    min-height: 0.2vh;
}
</style>
