<template >
    <div id="xbn-app" :bindResize="handelReset">
        <nt-row class="marketing-main" :style="{height: mainHeight + 'px'}" :aa="mainHeightGuider">
            <nt-col class="marketing-left">
                <p class="marketing-logo">
                    <span>智投后台管理</span>
                </p>
                <ul class="nt-menu">
                    <li class="nt-menu-item" v-for="item in items" :class="isSelected(item)" @click="handleRouter(item)">
                        <p v-text="item.text"></p>
                    </li>
                </ul>
            </nt-col>
            <nt-col :span="24">
                <router-view></router-view>
            </nt-col>
        </nt-row>
    </div>
</template>

<script>
    export default {
        props: {
            items: {
                type: Object,
                default() {
                    return {
                        ad: {text: '广告管理', router: '/ad-manage-list'},
                        pr: {text: '商品管理', router: '/product-manage'},
                        //fi: {text: '财务管理', router: '/financialMng'}
                    }
                }
            }
        },

        data: function() {
            return {
                mainHeight() {
                    return this.setMainHeight()
                }
            }
        },

        components: {

        },

        methods: {
            isSelected(item) {
                return this.$route.path.indexOf(item.router) > -1? 'active': ''
            },

            handleRouter(item) {
                this.$router.replace(item.router)
            },

            setMainHeight() {
                let topHeight = 70,
                    bottomLine = 3

                return innerHeight - bottomLine
            }
        },

        watch: {

        },

        computed: {
            mainHeightGuider() {
                this.mainHeight = this.setMainHeight()
            },

            activeItem() {
                let item,
                    path = this.$route.path

                for (let i in this.items) {
                    item = this.items[i]
                    if ( item.router === path ) {
                        break;
                    }
                }
                return item
            },

            handelReset() {
                var me = this
                window.addEventListener('resize', () => { me.mainHeight = me.setMainHeight() })
            }
        }
    }
</script>


