<template>
    <span class="badge" :class="type">{{ title }}</span>
</template>

<script>
export default {
    props: ['text', 'type'],
    computed:{
        title(){
            return this.text?.toUpperCase();
        }
    }
}
</script>

<style scoped>
    .badge {
        /* background-color: #ccc;
        color: #252525;
        border-radius: 30px;
        padding: 0.5rem 1.5rem;
        display: inline-block;
        margin-right: 0.5rem;
        display: inline-block; */
        margin: 10px;
        padding: 10px 15px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        border-radius: 15px;
        display: inline-block;
        border: 0px;
        font-weight: 700;
        box-shadow: 0px 0px 14px -7px #f09819;
        background-image: linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .badge:hover{
        background-position: right center;
        /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }

    /* .frontend {
        background-image: linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%);
        /* background-color: #3d008d;
        color: white; 
    }

    .backend {
        background-image: linear-gradient(45deg, #ce3213 0%, #d6a662  51%, #ce3213  100%);
        color: white;
    }

    .career {
        background-image: linear-gradient(45deg, #ce3213 0%, #d6a662  51%, #ce3213  100%);
        color: white;
    } */
</style>