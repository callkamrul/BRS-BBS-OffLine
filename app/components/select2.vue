<template>
    <select>
        <slot></slot>
    </select>
</template>

<script>
    import Vue from "vue";

    export default {
        props: ['value', 'onchange2'],
        template: `
  <select>
    <slot></slot>
  </select>
`,
        mounted: function () {
            var vm = this
            $(this.$el)
            // init select2
                .select2()
                .val(this.value)
                .trigger('change')
                // emit event on change.
                .on('change', function () {
                    if (this.value === '') {
                        return;
                    }
                    vm.$emit('input', this.value);
                    if (vm.onchange2){
                        vm.onchange2();
                    }
                })
        },
        watch: {
            value: function (value) {
                // update value
                $(this.$el).val(value).trigger('change');
            }
        },

        destroyed: function () {
            $(this.$el).off().select2('destroy')
        }
    };
</script>
