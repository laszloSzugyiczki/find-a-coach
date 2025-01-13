<template>
    <button v-if="!link" :class="mode">
        <span>
            <slot></slot>
        </span>
    </button>
    <router-link :to="to" v-else :class="mode">
        <span>
            <slot></slot>
        </span>
    </router-link>
</template>

<script>
export default {
    props:{
        link:{
            type: Boolean,
            optional: true,
            default: false
        },
        to:{
            type: String,
            optional: true,
            default: '/'
        },
        mode:{
            type: String,
            optional: true,
            default: null
        }
    }
}
</script>

<style scoped>
    button,
    a {
        text-decoration: none;
        padding: 0.45rem 1.5rem;
        font: inherit;
        background-color: #444;
        border: 1px solid #333;
        color: #f0a500;
        cursor: pointer;
        border-radius: 30px;
        margin-right: 0.5rem;
        display: inline-block;
        transition: all 0.5s;
    }

    .flat {
        border-color: 1px solid #3a0061;;
        color: #3a0061;
        background-color: #fff;
        
    }

    span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }

    span:after {
        content: '»';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -15px;
        transition: 0.5s;
    }

    button:hover span, a:hover span {
        padding-right: 15px;
    }

    button:hover span:after, a:hover span:after {
        opacity: 1;
        right: 0;
    }

    .flat:hover,
    .flat:active,
    .outline:hover,
    .outline:active {
        background-color: #f0a500;
        border-color: #fff;     
    }
</style>