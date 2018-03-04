<template>
    <select>
        <slot></slot>
    </select>
</template>

<script>
    import Vue from "vue";

    export default {
        props: ['options', 'value'],
        template: `
  <select>
    <slot></slot>
  </select>
`,
        mounted: function () {
            var vm = this
            $(this.$el)
            // init select2
                .select2({ data: this.options.map(x => { return { id: x.ID, text: x.NAME}}) })
                .val(this.value)
                .trigger('change')
                // emit event on change.
                .on('change', function () {
                    vm.$emit('input', this.value)
                })
        },
        watch: {
            value: function (value) {
                // update value
                $(this.$el).val(value)
            },
            options: function (options) {
                // update options
                $(this.$el).empty().select2({ data: options.map(x => { return { id: x.ID, text: x.NAME}}) })
            }
        },
        destroyed: function () {
            $(this.$el).off().select2('destroy')
        }
    };
</script>
