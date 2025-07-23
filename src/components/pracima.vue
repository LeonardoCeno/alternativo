<template>
    <button v-if="visivel" class="btn-topo" @click="voltarAoTopo">▲</button>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    visivel: { type: Boolean, default: true }
})
function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.btn-topo {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 22px;
    top: 80%;
    transform: translateY(-50%);
    z-index: 9999;
    background: #222;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0.7;
}
.btn-topo:hover {
    opacity: 1;
}
</style>
