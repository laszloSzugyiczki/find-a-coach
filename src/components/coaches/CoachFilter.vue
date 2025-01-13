<template>
    <base-card>
        <h2>Find your coach</h2>
        <span class="filter-option">
            {{ updatedFilters }}
            <base-checkbox id="frontend" checked @changed="setFilter">Frontend</base-checkbox>
            <base-checkbox id="backend" checked @changed="setFilter">Backend</base-checkbox>
            <base-checkbox id="career" checked @changed="setFilter">Career</base-checkbox>
        </span>
    </base-card>
</template>

<script>
export default {
    emits:['change-filters'],
    data(){
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true
            }
        };
    },
    methods:{
        setFilter(e){
            const inputId = e.target.id;
            const isActive = e.target.checked;
            const updatedFilters= {
                ...this.filters,
                [inputId]: isActive
            }
            this.filters = updatedFilters;
            this.$emit('change-filters', updatedFilters)
        }
    }
}
</script>

<style scoped>
    h2 {
        margin: 0.5rem 0;
    }

    .filter-option {
        margin-right: 1rem;
    }

    .filter-option label,
    .filter-option input {
        vertical-align: middle;
    }

    .filter-option label {
        margin-left: 0.25rem;
    }

    .filter-option.active label {
        font-weight: bold;
    }
</style>