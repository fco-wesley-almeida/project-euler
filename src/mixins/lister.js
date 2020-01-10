export default {
    data: () => ({
        shownItems: [],
        showPlaceholder: false
    }),
    methods: {
        sort(a, b){
          return ('' + a.name).localeCompare(b.name);
        },
    },
    computed: {
        items() { return [] },
        searchString() {''},
    },
    watch: {
        items: {
            immediate: true,
            handler(newItems) {
                const vm = this;
                let toBeAdded = newItems.filter(item => !vm.shownItems.includes(item))
                let toBeRemoved = this.shownItems.filter(item => !newItems.includes(item))
                for (let item of toBeAdded) {
                    this.shownItems.push(item)
                }
                for (let item of toBeRemoved) {
                    let index = this.shownItems.indexOf(item)
                    this.shownItems.splice(index, 1)
                }
                vm.shownItems.sort(vm.sort);
                vm.showPlaceholder = vm.shownItems.length === 0;
            }
        }
    },
};
