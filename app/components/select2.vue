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
        data() {
            return {
                isChangeTriggered: false
            };
        },
        mounted: function () {
            var vm = this
            $(this.$el)
            // init select2
                .select2()
                .val(String(this.value))
                .trigger('change')
                // emit event on change.
                .on('change', function (ev, args) {
                    if (this.value == '' || this.value == null || this.value == undefined) {

                        //return;
                    }
                    if (args && !( "ignore" in args)) {
                        vm.$emit('input', String(this.value));

                        this.isChangeTriggered = true;
                    }
                    if (vm.onchange2) {
                        vm.onchange2();
                    }
                });
            Vue.nextTick(() => {
                $(this.$el).val(this.value)
                    .trigger('change', {ignore: true})
            });
        },
        watch: {
            value: function (value) {
                // update value
                var $select = $(this.$el).val(String(value));
                if (this.isChangeTriggered == false) {
                    $select.trigger('change', {ignore: true});
                    this.isChangeTriggered == true;
                }
                //$(this.$el).select2("val", String(value)).trigger('change');
            }
        },

        destroyed: function () {
            $(this.$el).off().select2('destroy')
        }
    };
</script>
