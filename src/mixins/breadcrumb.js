export default {
  computed: {
    breadcrumbs() {
      const pathArray = this.$route.path.split('/');
      pathArray.shift();
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        const { meta } = this.$route.matched[idx];

        if (meta.breadcrumb !== 'disabled') {
          breadcrumbArray.push({
            disabled: false,
            link: true,
            to: {
              path: breadcrumbArray[idx - 1]
                ? `/${breadcrumbArray[idx - 1].path}/${path}`
                : `/${path}`,
            },
            text: this.checkStorage(meta.breadcrumb) || meta.placeholder || path,
          });
        }

        return breadcrumbArray;
      }, []);

      breadcrumbs[breadcrumbs.length - 1].disabled = true;
      return breadcrumbs;
    },
  },
  methods: {
    checkStorage(stateProperty) {
      return this.$store.state.app[stateProperty];
    },
  },
};
