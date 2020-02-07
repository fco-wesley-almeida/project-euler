export default {
  computed: {
    breadcrumbs() {
      const pathArray = this.$route.path.split('/');
      pathArray.shift();
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        const route = this.$route.matched[idx];
        if (route) {
          const { meta } = this.$route.matched[idx];

          if (meta.breadcrumb !== 'disabled') {
            breadcrumbArray.push({
              disabled: false,
              link: true,
              to: {
                path: breadcrumbArray[idx - 1]
                  ? `${breadcrumbArray[idx - 1].to.path}/${path}`
                  : `/${path}`,
              },
              text: this.checkStorage(meta.breadcrumb) || meta.placeholder || path,
              title: meta.placeholder,
              label: meta.label
            });
          }
        }
        return breadcrumbArray;
      }, []);
      const lastRoute = breadcrumbs[breadcrumbs.length - 1];
      if (lastRoute) {
        lastRoute.disabled = true;
      }
      return breadcrumbs;
    },
  },
  methods: {
    checkStorage(stateProperty) {
      return this.$store.state.app[stateProperty];
    },
  },
};
