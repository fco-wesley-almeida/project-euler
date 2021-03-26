export default {
  data: () => ({
    formRules: {
      required: value => !!value || 'Campo obrigatório',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'E-mail inválido';
      },
      password: value => value.length >= 6 || 'Mínimo de 6 caracteres',
      number: (value) => {
        const pattern = /^\+?(0|[1-9]\d*)$/;
        return (pattern.test(value) && value > 0) || 'Insira um número!';
      },
    },
  }),
};