<template>
    <header>
        <nav>
            <h1> <router-link to="/coaches">Find a coach</router-link></h1>
        <ul>
            <li>
                <router-link to="/coaches">All Coaches</router-link>
            </li>
            <li v-if="isLoggedIn">
                <router-link  to="/requests">Requests</router-link>
            </li>
            <li v-else>
                <router-link  to="/auth">Login</router-link>
            </li>
            <li>
                <base-button v-if="isLoggedIn" @click="logout">Logout</base-button>
            </li>
        </ul>
    </nav>
    </header>
    
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
export default {
    
    computed:{
        ...mapGetters({isLoggedIn: 'isAuthenticated'})
    },
    methods:{
        ...mapActions({logout: 'logoutAction'})
    }
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 50px;
        background-color: #333;
        color: #fff;
    }

    header a {
        text-decoration: none;
        color: #fff;
        font-size: 1rem;
        transition: color 0.3s ease;
    }

    a:active,
    a:hover,
    a.router-link-active {
        color: #f0a500;
    }

    h1 {
        margin: 0;
    }

    h1 a {
        color: white;
        margin: 0;
    }

    h1 a:hover,
    h1 a:active,
    h1 a.router-link-active {
        border-color: transparent;
    }

    header nav {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    header ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    li {
        margin: 0 0.5rem;
    }
</style>