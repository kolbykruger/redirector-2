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
                        <h1 class="font-size-200">
                            Redirects,<br />
                            made easy
                        </h1>
                        <p>
                            Redirector is an assistant that helps you create <br />
                            your 301 redirects.
                        </p>
                        <ul>
                            <li>Create redirects faster and easier</li>
                            <li>Automatically suggests matches</li>
                            <li>Flexbile format for any website</li>
                        </ul>
                        <div class="buttons">
                            <router-link class="button" to="/data">
                                <span class="hover"></span>
                                <span class="label">Get started</span>
                                <span class="icon"
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M12.4697 5.46967C12.7626 5.17678 13.2374 5.17678 13.5303 5.46967L19.5303 11.4697C19.8232 11.7626 19.8232 12.2374 19.5303 12.5303L13.5303 18.5303C13.2374 18.8232 12.7626 18.8232 12.4697 18.5303C12.1768 18.2374 12.1768 17.7626 12.4697 17.4697L17.1893 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H17.1893L12.4697 6.53033C12.1768 6.23744 12.1768 5.76256 12.4697 5.46967Z"
                                            fill="#22282F"
                                        /></svg
                                ></span>
                            </router-link>
                        </div>
                    </div>
                    <div class="landing-art">
                        <Graphic />
                        <!-- <Theme /> -->
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import Graphic from '../components/Graphic.vue'
// import Theme from '../components/theme/Theme.vue'

export default {
    name: 'Home',
    components: {
        Logo,
        Graphic
        // Theme
    }
}
</script>

<style lang="scss" scoped>
#home {
    max-width: 100%;
}

.logo-home {
    padding-top: 10vh;

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
        max-width: 1400px;
        margin: 0 auto;
    }
    .grid {
        display: grid;
        grid-template-columns: 45% 55%;
        grid-gap: 3em;
        height: 72vh;
        place-content: center;
        align-items: center;
    }

    &-text {
        p {
            margin-top: 2em;
        }

        ul {
            margin-top: 1em;
            padding-left: 1.5em;
            list-style-type: disc;

            li {
                margin-bottom: 0.25em;

                &::marker {
                    color: c('primary-base');
                }
            }
        }
    }

    &-art {
        svg {
            width: 100%;
        }
    }

    .buttons {
        margin-top: 3em;
    }
}
</style>
