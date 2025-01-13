<template>
    <div>
        <base-dialog  :show="!!error" title="An error occured" @close="handleError">
        <p>{{ error }}</p>
        </base-dialog>
        <base-dialog fixed :show="isLoading" title="Authenticating">
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">E-mail</label>
                    <input id="e-mail" name="email" type="email" v-model.trim="email" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" v-model="password" />
                </div>
                <p v-if="!formIsValid">
                    Please enter a valid e-mail address and password (must be at least 8 characters long)
                </p>
                <base-button>{{ submitButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
            </form>
        </base-card>
    </div>    
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        };
    },
    computed:{
        submitButtonCaption(){
            if (this.mode == 'login'){
                return 'Login';
            }else{
                return 'Sign up';
            }
        },
        switchModeButtonCaption(){
            if (this.mode == 'login'){
                return 'Sign up instead';
            }else{
                return 'Login instead';
            }
        }
    },
    methods:{
        ...mapActions(['auth']),
        async submitForm(){
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.password.length < 8){
                this.formIsValid = false;
                return;
            }
            let actionPayload = {
                    email: this.email, 
                    password: this.password,
                    mode: null
                };
            this.isLoading = true;
            if (this.mode == 'login'){
                actionPayload.mode = 'login';
            }else{
                actionPayload.mode = 'signup';
            }
            try{
                await this.auth(actionPayload);
                if (this.$route.query.red === 'register'){
                    this.$router.replace('/register');
                }else{
                    this.$router.replace('/coaches');
                }
            }catch(err){
                console.log(err);
                this.error = err.message || 'Failed to authenticate, please try again later!';
                console.log(this.error)
            }
            
            this.isLoading = false;
        },
        switchAuthMode(){
            this.formIsValid = true;
            if (this.mode === 'login'){
                this.mode = 'signUp';
            }else{
                this.mode = 'login';
            }
        },
        handleError(){
            this.error = null;
        }
    }
}
</script>
<style scoped>
    form {
        margin: 1rem;
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

</style>