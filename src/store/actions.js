import axios from 'axios';
import router from '../router';

let timer;

export default {
    async addCoachAction(context, payload){
        const userId = context.getters.userId
        const coachData= {
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
        }
        console.log(coachData);
        const token = context.getters.token;
        const response = await axios.put(`https://vue-http-demo-b13cc-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
            JSON.stringify(coachData));

        if (!response){
            const error = new Error(response.data.message || 'Failed to send request!');
            throw error;
        }

        context.commit('addCoach', {
            ...coachData,
            id: userId
        });
    },
    async addRequestAction(context, payload){
        const coachId = payload.coachId;
        delete payload.coachId;
        const response = await axios.post(`https://vue-http-demo-b13cc-default-rtdb.firebaseio.com/requests/${coachId}.json`,
            JSON.stringify(payload)
        ).catch((err) => {
            const error = new Error(err.message || 'Failed to fetch data!');
            throw error;
         });
        if (!response){
            const error = new Error(response.data.message || 'Failed to send request!');
            throw error;
        }
        payload.id = response.data.name;

        context.commit('addRequest', payload);
    },
    async setCoachesAction(context){
        const response = await axios.get('https://vue-http-demo-b13cc-default-rtdb.firebaseio.com/coaches.json').catch((err) => {
            const error = new Error(err.message || 'Failed to fetch data!');
            throw error;
         });
        
        if (!response){
            const error = new Error(response.data.message || 'Failed to send request!');
            throw error;
        }

        const coaches = [];
        for (const key in response.data){
            coaches.push({...response.data[key], id: key});
        }
        context.commit('setCoaches', coaches);
    },
    async setRequestsAction(context){
        const coachId = context.getters.userId;
        const token = context.getters.token;
        const response = 
        await axios.get(`https://vue-http-demo-b13cc-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`).catch((err) =>
            {
            const error = new Error(err.message || 'Failed to fetch data!');
            throw error;
        });
        
        if (!response){
            const error = new Error(response.data.message || 'Failed to fetch request!');
            throw error;
        }

        const requests = [];
        for (const key in response.data){
            requests.push({...response.data[key], id: key});
        }
        context.commit('setRequests', requests);
    },
    // async signUpAction(context, payload){
    //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAm5cVuDE57EY-y_t5Om_gbXG_cCTo_3tA', 
    //         {
    //             email: payload.email,
    //             password: payload.password,
    //             returnSecureToken: true
    //         }
    //     ).catch((err) => {
    //         const error = new Error(err.message || 'Failed to fetch data!');
    //         throw error;
    //      });

    //     if (!response){
    //         const error = new Error(response.data.message || 'Failed to authenticate!');
    //         throw error;
    //     }
        
    //     console.log(response.data);

    //     context.commit('setUser', {
    //         token: response.data.idToken,
    //         userId: response.data.localId,
    //         tokenExpiration: response.data.expiresIn,

    //     })
    // },
    async auth(context, payload){
        const mode = payload.mode;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAm5cVuDE57EY-y_t5Om_gbXG_cCTo_3tA';
        if (mode === 'login'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAm5cVuDE57EY-y_t5Om_gbXG_cCTo_3tA'
        }
        try{
            const response = await axios.post(url, 
            {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            });
            if (!response){
                console.log(response.data.error.message);
                const error = new Error(response.data.error.message || 'Failed to authenticate!');
                throw error;
            }
            const expiresIn = +response.data.expiresIn * 1000;

            const expirationDate = new Date().getTime + expiresIn;

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('tokenExpiration', expirationDate);

            timer = setTimeout(()=>{
                context.dispatch('logoutAction');
                router.replace('/coaches');
            }, expiresIn);

            context.commit('setUser', {
                token: response.data.idToken,
                userId: response.data.localId
            });
        }catch(err) {
            const error = new Error(err.response.data.error.message || 'Failed to fetch data!');
            throw error;
         }
    },
    tryLoginAction(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const expiresIn = +tokenExpiration - new Date().getTime();
        
        if (expiresIn < 10000){
            return;
        }

        timer = setTimeout(()=>{
            context.dispatch('logoutAction');
            router.replace('/coaches');
        }, expiresIn);
        
        if (token && userId){
            context.commit('setUser', {
                token,
                userId
            });
        }
    },
    logoutAction(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        clearTimeout(timer);
        context.commit('setUser', {
            token: null,
            userId: null
        })
        router.replace('/coaches');
    }
}