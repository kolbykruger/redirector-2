<template>
    <aside>
        <div class="logo">
            <router-link to="/">
                <Logo />
            </router-link>
        </div>
        <nav>
            <span class="progress">
                <span class="progress-bar" :style="{ maxHeight: progress }"></span>
            </span>
            <ul>
                <li v-for="(route, index) in routes" :key="index">
                    <router-link
                        v-if="route.status"
                        class="navigation-link navigation-link--active"
                        :to="'/' + route.stage"
                    >
                        <span class="navigation-link-circle">
                            <span class="navigation-link-circle-bg"></span>
                            <span class="navigation-link-circle-dot"></span>
                            <span class="navigation-link-circle-ping"></span>
                        </span>
                        <span class="navigation-link-title">
                            {{ route.stage }}
                        </span>
                    </router-link>
                    <div class="navigation-link navigation-link--disabled" v-else>
                        <span class="navigation-link-circle">
                            <span class="navigation-link-circle-bg"></span>
                            <span class="navigation-link-circle-dot"></span>
                            <span class="navigation-link-circle-ping"></span>
                        </span>
                        <span class="navigation-link-title">
                            {{ route.stage }}
                        </span>
                    </div>
                </li>
            </ul>
        </nav>
        <Statistics :stages="routes" />
    </aside>
</template>

<script>
import Statistics from '../components/utility/Statistics'
import Logo from '../components/Logo'

export default {
    name: 'Aside',
    components: {
        Logo,
        Statistics
    },
    data() {
        return {
            routes: [],
            progress: '0%'
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
        },
        progressCalculator() {
            const trues = this.routes.filter(item => {
                return item.status == true
            })

            if (trues.length == this.routes.length) {
                this.progress = 'calc(100% + 1.75em)'
            } else {
                this.progress = (trues.length / this.routes.length) * 100 + '%'
            }
        }
    },
    mounted() {
        this.getStages()
        this.progressCalculator()
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
            this.progressCalculator()
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
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    z-index: 10;

    .logo {
        margin-top: 3vh;
        margin-bottom: 3vh;
        width: 100%;

        svg {
            display: block;
            width: 100%;
            max-width: 170px;
        }
    }

    nav {
        display: grid;
        grid-template-columns: 5px auto;
        grid-gap: 1.5em;
        margin-bottom: 5vh;
        margin-left: 0.5em;

        ul {
            height: 100%;
            padding-top: 1.5em;

            li {
                &:last-of-type {
                    .navigation-link {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .navigation-link {
            position: relative;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            line-height: 1;
            margin-bottom: 1.25em;

            &-circle {
                position: absolute;
                top: 55%;
                left: 0;
                --size: 11px;
                width: var(--size);
                height: var(--size);
                border-radius: 50%;
                background: c('base-2');
                transform: translate(calc(-1.5em + 3px), -50%);
                z-index: 2;

                &-bg,
                &-dot,
                &-ping {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }

                &-bg {
                    background: green;
                    background: c('base-0');
                    transform: scale(1.75);
                    z-index: 1;
                }

                &-dot {
                    background: c('base-2');
                    z-index: 3;
                }

                &-ping {
                    background: c('base-2');
                    border: 3px solid c('base-2');
                    transform: scale(0.75);
                    z-index: 2;
                }
            }

            &--disabled {
                color: c('tertiary-base');
                cursor: not-allowed;
            }

            &--active {
                .navigation-link-circle-dot {
                    animation: dot 0.6s 0.3s cubic-bezier(0.53, 0.21, 0, 1) forwards;

                    @keyframes dot {
                        to {
                            background: c('primary-base');
                        }
                    }
                }
            }

            &.router-link-exact-active {
                .navigation-link-circle {
                    &-ping {
                        animation: ping 2.5s cubic-bezier(0.53, 0.21, 0, 1) infinite;

                        @keyframes ping {
                            from {
                                transform: scale(0.75);
                                opacity: 1;
                            }
                            to {
                                transform: scale(2.75);
                                opacity: 0;
                            }
                        }
                    }
                }
            }
        }
    }

    .progress {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        background: c('base-1');
        border-radius: 0.375em;

        &-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 200%;
            max-height: 0;
            background: c('primary-base');
            border-radius: 0.375em;
            transition: max-height 0.6s cubic-bezier(0.53, 0.21, 0, 1);
        }
    }
}
</style>
