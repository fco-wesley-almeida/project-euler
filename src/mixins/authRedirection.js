
export default {
  computed: {
    userIsAuthorized() {
      return false;
    },
  },
  beforeMount() {
    if (!this.userIsAuthorized) {
      this.$router.replace(
        {
          path: '/semautorizacao',
        },
      );
    }
  },
};
