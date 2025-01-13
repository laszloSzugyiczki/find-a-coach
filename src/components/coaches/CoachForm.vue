<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model.trim="firstName.value" @focus="resetValidity('firstName')" />
            <p v-if="!firstName.isValid">Firstname should not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastname">Lastname</label>
            <input type="text" id="lastname" v-model.trim="lastName.value" @focus="resetValidity('lastName')" />
            <p v-if="!lastName.isValid">Lastname should not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !description.isValid}">
            <label for="decription">Description</label>
            <textarea type="text" id="decription" v-model.trim="description.value"
                @focus="resetValidity('description')"></textarea>
            <p v-if="!description.isValid">Description should not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !rate.isValid}">
            <label for="rate">Hourly rate</label>
            <input type="number" id="rate" v-model.number="rate.value" @focus="resetValidity('rate')" />
            <p v-if="!rate.isValid">Rate should be higher than 0.</p>
        </div>
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas of experties</h3>
            <div>
                <base-checkbox id="frontend" value="frontend" @changed="updateAreas('frontend', $event)"
                    @focus="resetValidity('areas')">Frontend development</base-checkbox>
            </div>
            <div>
                <base-checkbox id="backend" value="backend" @changed="updateAreas('backend', $event)"
                    @focus="resetValidity('areas')">Backend development</base-checkbox>
            </div>
            <div>
                <base-checkbox id="career" value="career" @changed="updateAreas('career', $event)"
                    @focus="resetValidity('areas')">Career advisory</base-checkbox>
            </div>
            <p v-if="!areas.isValid">At least one area of experties should be selected.</p>
            <p v-if="!formIsvalid">Please correct the errors above before you register.</p>
            <base-button>Register</base-button>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            firstName: {
                value: '',
                isValid: true
            },
            lastName: {
                value: '',
                isValid: true
            },
            description: {
                value: '',
                isValid: true
            },
            rate: {
                value: null,
                isValid: true
            },
            areas: {
                value: [],
                isValid: true
            },
            formIsvalid: true
        };
    },
    methods: {
        ...mapActions(['addCoachAction']),
        updateAreas(area, e) {
            if (e.target.checked) {
                if (!this.areas.value.includes(area)) {
                    this.areas.value.push(area);
                }
            } else {
                const index = this.areas.value.indexOf(area)
                if (index > -1) {
                    this.areas.value.splice(index, 1);
                }
            }
        },
        submitForm() {
            this.validateForm();

            if (!this.formIsvalid) {
                return;
            }

            const formData = {
                first: this.firstName.value,
                last: this.lastName.value,
                desc: this.description.value,
                rate: this.rate.value,
                areas: this.areas.value
            };
            this.addCoachAction(formData);
            this.$router.replace('/coaches');
        },
        validateForm() {
            this.formIsvalid = true;
            if (this.firstName.value === '') {
                this.firstName.isValid = false;
                this.formIsvalid = false;
            }
            if (this.lastName.value === '') {
                this.lastName.isValid = false;
                this.formIsvalid = false;
            }
            if (this.description.value === '') {
                this.description.isValid = false;
                this.formIsvalid = false;
            }
            if (!this.rate.value || this.rate.value <= 0) {
                this.rate.isValid = false;
                this.formIsvalid = false;
            }
            if (this.areas.value.length === 0) {
                this.areas.isValid = false;
                this.formIsvalid = false;
            }
        },
        resetValidity(input) {
            this[input].isValid = true;
        }
    }
}
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}



input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>