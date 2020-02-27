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
      if (this.$route.params.caseID && breadcrumbs[0].text !== "Tutorias"){
        //return this.addCasePrefix(breadcrumbs);
      }
      return breadcrumbs;
    },
  },
  methods: {
    checkStorage(stateProperty) {
      return this.$store.state.app[stateProperty];
    },
    addCasePrefix(array) {
      let newArray = array.slice();
      newArray.unshift({
        disabled: false,
        link: true,
        to: {
          path: `/tutorias/${this.$route.params.tutorialID}`,
        },
        text: this.$store.state.app.currentTutorialName,
        title: "lkamsd",
        label: "lkamlsd"
      });
      newArray.unshift({
        disabled: false,
        link: true,
        to: {
          path:"/tutorias/",
        },
        text: "Tutorias",
        title: "kjnkj",
        label: "lkmlk"
      });
      console.log(newArray);
      return newArray;
    }
  },
};
