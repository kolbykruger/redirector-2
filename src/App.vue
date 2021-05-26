<template>
    <transition name="sidebar" mode="in-out">
        <Aside v-if="sidebar" />
    </transition>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="slide" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
    <Decor :status="decor" />
    <Theme />
</template>

<script>
import Aside from '@/components/Aside'
import Decor from '@/components/Decor'
import Theme from '@/components/theme/Theme'

export default {
    components: {
        Aside,
        Decor,
        Theme
    },
    data() {
        return {
            sidebar: false,
            decor: false
        }
    },
    mounted() {
        document.getElementById('app').style.minHeight = window.innerHeight + 'px'
    },
    watch: {
        $route(value) {
            this.sidebar = value.name.toLowerCase() != 'home' ? true : false
            this.decor = value.name.toLowerCase() != 'home' ? true : false
        }
    }
}
</script>
