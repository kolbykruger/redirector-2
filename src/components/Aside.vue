<template>
    <aside>
        <div class="logo">
            <router-link to="/">
                <Logo />
            </router-link>
        </div>
        <nav>
            <ul>
                <li><router-link to="/data">Data</router-link></li>
                <li><router-link to="/processing">Processing</router-link></li>
                <li><router-link to="/intersection">Intersection</router-link></li>
                <li><router-link to="/algorithmic">Alogrithmic</router-link></li>
                <li><router-link to="/definition">Definition</router-link></li>
                <li><router-link to="/culmination">Culmination</router-link></li>
            </ul>
        </nav>
        <div class="nav-utility">
            <Download />
        </div>
    </aside>
</template>

<script>
import Download from '../components/Download'
import Logo from '../components/Logo'

export default {
    name: 'Aside',
    components: {
        Download,
        Logo
    }
}
</script>

<style lang="scss">
aside {
    --spacing: 2em;
    position: fixed;
    top: var(--spacing);
    left: var(--spacing);
    bottom: var(--spacing);
    width: 328px;
    padding: 1em 1.5em;
    background: c('base-0');
    border-radius: 0.375em;
    box-shadow: 0 0.625em 1.25em rgba(35, 45, 75, 0.08);
    display: grid;
    grid-template-rows: 10% auto 10%;
    z-index: 10;

    .logo {
        margin-top: 3vh;
        margin-bottom: 3vh;
        width: 100%;

        a {
        }

        svg {
            display: block;
            width: 100%;
            max-width: 170px;
        }
    }

    nav {
        margin-bottom: 10vh;
        ul {
            display: flex;
            flex-flow: column;
            justify-content: center;
            height: 100%;
        }
    }

    .nav-utility {
        display: flex;
        //justify-content: flex-end;
        align-items: flex-end;
        margin-bottom: 1em;
    }
}
</style>
