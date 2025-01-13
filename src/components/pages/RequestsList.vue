<template>
    <base-dialog :show="!!error" title="An error occured." @close="handleError">
    <p>{{error}}</p>
    </base-dialog>
    <section>
        <base-card>
            <header>
                <h2>Request received</h2>
                <ul v-if="hasRequests">
                   <request-item v-for="request in requests" 
                    :key="request.id" 
                    :message="request.message"
                    :email="request.userEmail"></request-item>
                </ul>
                <h3 v-else>You haven't recieved any requests yet.</h3>
            </header>
        </base-card>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import requestItem from '@/components/requests/requestItem.vue';
export default {
    data(){
        return {
            isLoading: false,
            error: null
        };
    },
    components:{
        requestItem
    },
    computed:{
        ...mapGetters({requests: 'getRequests', hasRequests: 'hasRequests'}),
    },
    methods:{
        ...mapActions(['setRequestsAction']),
        async loadRequests(){
            this.isLoading = true;
            await this.setRequestsAction().catch(err => {
                this.error = err.message || "Something went wrong, please try again later!";
            });
            this.isLoading = false;
        },
        handleError(){
            this.error = null;
        }
    },
    created(){
        this.loadRequests();
    }
}
</script>

<style scoped>
    header {
        text-align: center;
    }

    ul {
        list-style: none;
        margin: 2rem auto;
        padding: 0;
        max-width: 30rem;
    }

    h3 {
        text-align: center;
    }
</style>