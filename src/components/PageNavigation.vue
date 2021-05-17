<template>
    <section class="page-navigation" v-if="status">
        <div class="container">
            <div class="buttons" v-if="to">
                <router-link class="button button--transparent" :to="back" v-if="back">
                    <span class="hover"></span>
                    <span class="icon" v-if="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L6.81066 11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H6.81066L11.5303 17.4697C11.8232 17.7626 11.8232 18.2374 11.5303 18.5303C11.2374 18.8232 10.7626 18.8232 10.4697 18.5303L4.46967 12.5303C4.17678 12.2374 4.17678 11.7626 4.46967 11.4697L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"
                                fill="#22282F"
                            />
                        </svg>
                    </span>
                    <span class="label">Back</span>
                </router-link>
                <router-link class="button" :to="to" v-if="to">
                    <span class="hover"></span>
                    <span class="label">{{ label }}</span>
                    <span class="icon" v-if="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.4697 5.46967C12.7626 5.17678 13.2374 5.17678 13.5303 5.46967L19.5303 11.4697C19.8232 11.7626 19.8232 12.2374 19.5303 12.5303L13.5303 18.5303C13.2374 18.8232 12.7626 18.8232 12.4697 18.5303C12.1768 18.2374 12.1768 17.7626 12.4697 17.4697L17.1893 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H17.1893L12.4697 6.53033C12.1768 6.23744 12.1768 5.76256 12.4697 5.46967Z"
                                fill="#22282F"
                            />
                        </svg>
                    </span>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PageNavigation',
    props: {
        label: {
            type: String,
            default() {
                return 'Next'
            }
        },
        status: {
            type: Boolean,
            default() {
                return false
            }
        },
        to: {
            type: String
        },
        back: {
            type: String
        },
        arrow: {
            type: Boolean,
            default() {
                return true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page-navigation {
    margin-top: 3em;
    margin-bottom: 10vh;
}
</style>
