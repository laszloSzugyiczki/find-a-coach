<template>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">Your e-mail address</label>
            <input type="email" id="email" v-model.trim="email"/>
        </div>
        <div class="form-control">
            <label for="message">Message</label>
            <textarea id="message" rows="5"  v-model.trim="message"></textarea>
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid e-mail address, and a non-empty message.</p>
        <div class="action">
            <base-button>Send message</base-button>
        </div>
    </form>

</template>

<script>
import { mapActions } from 'vuex';
export default {
    props:['id2'],
    data(){
        return{
            email: '',
            message: '',
            formIsValid: true
        };
    },
    methods:{
        ...mapActions(['addRequestAction']),
        submitForm(){
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.message === ''){
                this.formIsValid = false;
                return;
            }
            this.addRequestAction({userEmail: this.email, message: this.message, coachId: this.$route.params.id})
            this.$router.replace('/requests');
        }
    }
}
</script>

<style scoped>
    form {
        margin: 1rem;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 1rem;
    }

    .form-control {
        margin: 0.5rem 0;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
    }

    .errors {
        font-weight: bold;
        color: red;
    }

    .actions {
        text-align: center;
    }
</style>