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
    name: 'TutoriasContainer',
    view: 'BreadcrumbContainer',
    meta: { placeholder: 'Tutorias' },
    children: [
      {
        path: '',
        name: 'Tutorias',
        meta: { placeholder: 'Tutorias' },
        view: 'tutorials/Index',
      },
      {
        path: ':tutorialID',
        name: 'Tutoria',
        meta: { breadcrumb: 'currentTutorialName', placeholder: 'Detalhes sobre tutoria' },
        view: 'tutorials/details/Index',
        children: [
          {
            path: '',
            name: 'Informações',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/info/Index',
          },
          {
            path: 'informacoes',
            name: 'Informações',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/info/Index',
          },
          {
            path: 'casos',
            name: 'Casos',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/cases/Index',
          },
          {
            path: 'notas',
            name: 'Notas',
            meta: { breadcrumb: 'disabled' },
            view: 'tutorials/details/evaluations/Index',
          },
        ],
      },
    ],
  },
];
