<template>
    <div id="home">
        <section class="logo-home">
            <div class="container">
                <div class="logo">
                    <Logo />
                </div>
            </div>
        </section>
        <section class="landing">
            <div class="container">
                <div class="grid">
                    <div class="landing-text">
                        <h1 class="font-size-300">Redirects, made easy.</h1>
                        <div class="buttons">
                            <router-link class="button" to="/data">
                                <span class="hover"></span>
                                <span class="label">Get started</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="landing-art">
                        Artwork
                        <Theme />
                    </div>
                </div>
            </div>
        </section>
        <section class="by">
            <div class="container">
                <p>Created by</p>
            </div>
        </section>
    </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import Theme from '../components/theme/Theme.vue'

export default {
    name: 'Home',
    components: {
        Logo,
        Theme
    }
}
</script>

<style lang="scss" scoped>
#home {
    max-width: 100%;
}

.logo-home {
    margin-top: 10vh;

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 100%;
    }

    svg {
        max-width: 220px;
        width: 100%;
    }
}

.landing {
    .container {
        max-width: 1300px;
        margin: 0 auto;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 3em;
        height: 68vh;
        place-content: center;
    }
    .buttons {
        margin-top: 3em;
    }
}
</style>
