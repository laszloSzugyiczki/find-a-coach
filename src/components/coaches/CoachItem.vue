<template>
    <li>
        <div class="container">
            <h3>{{ name }}</h3>
            <base-badge v-for="area in areas" :key="area" :text="area" :type="area">
            </base-badge> 
            <div class="actions">
                <base-button link mode="flat" :to="contactLink">Contact</base-button>
                <base-button link :to="detailsLink">Details</base-button>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'CoachItem',
        props: ['id', 'firstName', 'lastName', 'areas', 'description', 'hourlyRate'],
        computed:{
            name(){
                return this.firstName + ' ' + this.lastName;
            },
            contactLink(){
                return '/coaches/' + this.id + '/contact';
            },
            detailsLink(){
                return '/coaches/' + this.id;
            }
        }
    }
</script>

<style scoped>
    li {
        margin: 1rem 0;
        border: 1px solid #c5c4c4;
        padding: 1rem;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
    }

    h3 {
        font-size: 1.5rem;
    }

    h3,
    h4 {
        margin: 0.5rem 0;
        color: #333;
    }

    div {
        margin: 0.5rem 0;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
    }
</style>