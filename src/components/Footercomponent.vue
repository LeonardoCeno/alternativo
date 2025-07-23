<template>
    <footer class="footer-manya">
        <div class="footer-content">
        <div class="footer-col">
            <h3>MANYA</h3>
            <p>Quem vê são os olhos mas quem sente é o coração, Leia, chore, ria, e aproveite! Mais informações em nosso instagram.</p>
            <div class="footer-social">
                <a href="https://www.instagram.com/manya_store2025/" aria-label="Instagram"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg></a>
                <a aria-label="Twitter"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.92c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.97-2.48a8.94 8.94 0 0 1-2.83 1.08a4.48 4.48 0 0 0-7.63 4.08A12.7 12.7 0 0 1 3.1 4.86a4.48 4.48 0 0 0 1.39 5.98a4.44 4.44 0 0 1-2.03-.56v.06a4.48 4.48 0 0 0 3.6 4.39a4.5 4.5 0 0 1-2.02.08a4.48 4.48 0 0 0 4.18 3.11A9 9 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78c0-.2 0-.39-.01-.58a9.1 9.1 0 0 0 2.24-2.32z"/></svg></a>
                <a aria-label="Facebook"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89c1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z"/></svg></a>
            </div>
        </div>
        <div class="footer-col">
            <h4>Institucional</h4>
            <ul>
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Serviço</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Categorias</h4>
            <ul>
                <li><a href="#">Livros</a></li>
                <li><a href="#">Mangás</a></li>
                <li><a href="#">Artbooks</a></li>
                <li><a href="#">Ofertas</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Ajuda</h4>
            <ul>
                <li><a href="#">Perguntas Frequentes</a></li>
                <li><a href="#">Suporte</a></li>
                <li><a href="#">Envio & Devoluções</a></li>
            </ul>
        </div>
        </div>
    <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Projeto Manya. Todos os direitos reservados.</p>
    </div>
    </footer>
</template>

<script setup>
</script>

<style scoped>
.footer-manya {
    background: #06080a;
    color: #fff;
    padding: 40px 0 0 0;
    font-family: 'Inter', Arial, sans-serif;
    border-top: 4px solid #333336;
}
.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    gap: 32px;
}
.footer-col {
    flex: 1 1 180px;
    min-width: 180px;
    margin-bottom: 32px;
}
.footer-col h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #5582ff;
}
.footer-col h4 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: #4879ff;
}
.footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.footer-col ul li {
    margin-bottom: 8px;
}
.footer-col ul li a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
}
.footer-col ul li a:hover {
    color: #00a0fd;
}
.footer-social {
    display: flex;
    gap: 12px;
    margin-top: 12px;
}
.footer-social a {
    color: #fff;
    transition: color 0.2s;
}
.footer-social a:hover {
    color: #00a0fd;
}
.footer-bottom {
    border-top: 1px solid #333;
    text-align: center;
    padding: 18px 0 10px 0;
    font-size: 0.95rem;
    color: #bbb;
    margin-top: 10px;
}
@media (max-width: 900px) {
    .footer-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
    }
    .footer-col {
        margin-bottom: 24px;
    }
}
</style>