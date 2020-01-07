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
    path: '/',
    name: 'Tutorias',
    view: 'tutorials/Index',
  },
  {
    path: '/tutorials',
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
      },
    ],
  },
];
