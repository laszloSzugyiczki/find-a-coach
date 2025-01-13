<template>
    <base-dialog :show="!!error" title="An error occured." @close="handleError">
    <p>{{error}}</p>
    </base-dialog>
    <section>
        <coach-filter @change-filters="setFilters"></coach-filter>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="flat" @click="loadCoaches">Refresh</base-button>
                <!-- <base-button v-if="!isCoach && !isLoading" to="/register" link>Register as a coach</base-button> -->
                <base-button v-if="!isLoggedIn" to="/auth?red=register" link>Login to register as a coach</base-button>
                <base-button v-if="isLoggedIn && !isCoach && !isLoading" to="/register" link>Register as a coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else>
                <coach-item 
                    v-for="coach in filteredCoaches" 
                    :key="coach.id"
                    :id="coach.id"
                    :firstName="coach.firstName"
                    :lastName="coach.lastName"
                    :areas="coach.areas"
                    :description="coach.description"
                    :hourlyRate="coach.hourlyRate">
                </coach-item>
            </ul>
        </base-card>
    </section>
</template>

<script>
    import CoachFilter from '@/components/coaches/CoachFilter.vue';
    import CoachItem from '@/components/coaches/CoachItem.vue';
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    export default {
        name: 'CoachList',
        data(){
            return {
                error: null,
                isLoading: false,
                activeFilters: {
                    frontend: true,
                    backend: true,
                    career: true
                }
            };
        },
        components:{
            CoachItem,
            CoachFilter
        },
        computed:{
            ...mapGetters({coaches: 'getAllCoaches', isCoach: 'isCoach', isLoggedIn: 'isAuthenticated'}),
            filteredCoaches(){
                return this.coaches.filter(coach => {
                    if (this.activeFilters.frontend && coach.areas.includes('frontend')){
                        return true;
                    }
                    if (this.activeFilters.backend && coach.areas.includes('backend')){
                        return true;
                    }
                    if (this.activeFilters.career && coach.areas.includes('career')){
                        return true;
                    }
                    return false;
                });
            }
        },
        created(){
            this.loadCoaches();
        },
        methods:{
            ...mapActions(['setCoachesAction']),
            setFilters(updatedFilters){
                this.activeFilters = updatedFilters;
            },
            async loadCoaches(){
                this.isLoading = true;
                await this.setCoachesAction().catch((err) => {
                    this.error = err.message || "Something went wrong, please try again later!";
                    
                });
                this.isLoading = false;
            },
            handleError(){
                this.error = null;
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 90%;
        margin: 0 auto;
    }

    .controls {
        display: flex;
        justify-content: space-between;
    }
</style>