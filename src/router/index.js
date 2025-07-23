import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Market.vue'
import LoginView from '../views/Login.vue'
import PainelView from '../views/Painel.vue'
import DadosView from '../views/Dados.vue'
import CuponsView from '../views/Cupons.vue'
import PedidosView from '../views/Pedidos.vue'
import FavoritosView from '../views/Favoritos.vue'
import EnderecosView from '../views/Enderecos.vue'
import CarrinhoView from '../views/Carrinho.vue'
import ADMcategoriasView from '../views/ADMcategorias.vue'
import ADMprodutosView from '../views/ADMprodutos.vue'
import ADMpedidosView from '../views/ADMpedidos.vue'
import ADMcuponsView from '../views/ADMcupons.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/painel',
      name: 'Painel',
      component: PainelView,
      children: [
        {
          path: '/dados',
          name: 'Dados',
          component: DadosView,
        },
        {
          path: '/cupons',
          name: 'Cupons',
          component: CuponsView,
        },
        {
          path: '/pedidos',
          name: 'Pedidos',
          component: PedidosView,
        },
        {
          path: '/favoritos',
          name: 'Favoritos',
          component: FavoritosView,
        },
        {
          path: '/enderecos',
          name: 'Enderecos',
          component: EnderecosView,
        },
        {
          path: '/carrinho',
          name: 'Carrinho',
          component: CarrinhoView,
        },
        {
          path: '/ADMcategorias',
          name: 'ADMcategorias',
          component: ADMcategoriasView,
        },
        {
          path: '/ADMprodutos',
          name: 'ADMprodutos',
          component: ADMprodutosView,
        },
        {
          path: '/ADMpedidos',
          name: 'ADMpedidos',
          component: ADMpedidosView,
        },
        {
          path: '/ADMcupons',
          name: 'ADMcupons',
          component: ADMcuponsView,
        },
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const painelRoutes = [
    'Painel', 'Dados', 'Cupons', 'Pedidos', 'Favoritos', 'Enderecos', 'Carrinho',
    'ADMcategorias', 'ADMprodutos', 'ADMpedidos', 'ADMcupons'
  ]
  const token = localStorage.getItem('token')
  if (painelRoutes.includes(to.name) && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
