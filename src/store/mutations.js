export default {
    addCoach(state, payload){
        state.coaches.push(payload);
    },
    addRequest(state, payload){
        state.requests.push(payload);
    },
    setCoaches(state, payload){
        state.coaches = payload;
    },
    setRequests(state, payload){
        state.requests = payload;
    },
    setUser(state, payload){
        state.token = payload.token;
        state.userId = payload.userId;
    }
}