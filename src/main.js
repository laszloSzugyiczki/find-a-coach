import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
//import BaseDialog from '@/components/base/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(()=>import('@/components/base/BaseDialog.vue'));

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-checkbox', BaseCheckbox);
app.component('base-dialog', BaseDialog);

app.use(router);
app.use(store);
app.mount('#app');
