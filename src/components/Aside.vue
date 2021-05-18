<template>
    <aside>
        <div class="logo">
            <router-link to="/">
                <Logo />
            </router-link>
        </div>
        <nav>
            <ul>
                <li v-for="(route, index) in routes" :key="index">
                    <router-link v-if="route.status" class="navigation-link" :to="'/' + route.stage">
                        <span class="navigation-link-circle">
                            <span class="navigation-link-circle--dot"></span>
                        </span>
                        <span class="navigation-link-title">
                            {{ route.stage }}
                        </span>
                    </router-link>
                    <div class="navigation-link navigation-link--disabled" v-else>
                        <span class="navigation-link-circle">
                            <span class="navigation-link-circle--dot"></span>
                        </span>
                        <span class="navigation-link-title">
                            {{ route.stage }}
                        </span>
                    </div>
                </li>
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
    },
    data() {
        return {
            routes: []
        }
    },
    methods: {
        checkStageStatus(stage) {
            return this.$store.state.stages.stage[stage]
        },
        getStages() {
            const _this = this
            const routes = this.$store.state.stages.stage

            _this.routes = []

            for (const [key, value] of Object.entries(routes)) {
                _this.routes.push({
                    stage: key,
                    status: value
                })
            }
        }
    },
    mounted() {
        this.getStages()
    },
    watch: {
        $route(to) {
            if (to.name != 'Home') {
                this.$store.commit('setStageStatus', {
                    stage: to.name.toLowerCase(),
                    status: true
                })
            }
            this.getStages()
        }
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

        .navigation-link {
            position: relative;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            line-height: 1;
            margin-bottom: 1em;

            &::before {
                content: '';
                position: absolute;
                width: 0.125em;
                height: 100%;
                top: 100%;
                left: 0;
                transform: translate(calc(0.5em - (0.125em / 2)), 0);
                background: c('primary-base');
                border-radius: 0.125em;
            }

            &-circle {
                --size: 1em;
                display: flex;
                align-items: center;
                justify-content: center;
                width: var(--size);
                height: var(--size);
                background: c('base-0');
                margin-right: 1em;
                border-radius: 50%;

                &--dot {
                    --size: 0.45em;
                    display: flex;
                    width: var(--size);
                    height: var(--size);
                    background: c('primary-base');
                    border-radius: 50%;
                }
            }

            &--disabled {
                color: c('tertiary-base');
                cursor: not-allowed;

                .navigation-link-circle {
                    &--dot {
                        background: c('tertiary-lightest');
                    }
                }

                &::before {
                    background: c('tertiary-lightest');
                }
            }
        }

        li:last-of-type {
            .navigation-link {
                &::before {
                    display: none;
                }
            }
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
