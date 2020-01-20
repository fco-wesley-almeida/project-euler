/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/semautorizacao',
    name: ' ',
    view: 'Unauthorized',
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    view: 'auth/Signup',
  },
  {
    path: '/login',
    name: 'Login',
    view: 'auth/Login',
  },
  {
    path: '/tutorias',
    view: 'BreadcrumbContainer',
    meta: { placeholder: 'Tutorias' },
    children: [
      {
        path: '',
        name: 'Tutorias',
        meta: { breadcrumb: 'disabled' },
        view: 'tutorials/index',
      },
      {
        path: ':tutorialID',
        meta: { breadcrumb: 'currentTutorialName', placeholder: 'Detalhes sobre tutoria' },
        view: 'tutorials/details/index',
        children: [
          {
            path: '',
            name: 'Informações',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/info/index',
          },
          {
            path: 'informacoes',
            name: 'Informações',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/info/index',
          },
          {
            path: 'casos',
            name: 'Casos',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/cases/index',
          },
          {
            path: 'notas',
            name: 'Notas',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/evaluations/index',
          },
          {
            path: 'participantes',
            name: 'Participantes',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/participants/index',
          },
        ],
      },
    ],
  },
];
