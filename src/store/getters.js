export default {
    getAllCoaches(state){
        return state.coaches;
    },
    userId(state){
        return state.userId;
    },
    isCoach(state){
        return state.coaches.some(coach => coach.id === state.userId);
    },
    getRequests(state){
        return state.requests;
    },
    hasRequests(_, getters){
        return getters.getRequests.length > 0;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token;
    }
}