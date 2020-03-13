export default {
  computed: {
    breadcrumbs() {
      const { meta } = this.$route;
      if (meta.breadcrumbs) {
        return meta.breadcrumbs.map((breadcrumb) =>
          ({
            disabled: breadcrumb.disabled,
            link: breadcrumb.disabled,
            to: breadcrumb.to,
            text: this.checkStorage(breadcrumb.text) || breadcrumb.text,
            label: breadcrumb.label,
            title: breadcrumb.title,
          })
        );
      }
      return [];
    },
  },
  methods: {
    checkStorage(stateProperty) {
      return this.$store.state.app[stateProperty];
    },
  },
};
