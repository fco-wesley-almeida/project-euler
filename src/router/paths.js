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
    path: '/perfil',
    name: 'Perfil',
    view: 'profile/index',
  },
  {
    path: '/tutorias',
    view: 'BreadcrumbContainer',
    meta: {placeholder: 'Tutorias'},
    children: [
      {
        path: '',
        name: 'Tutorias',
        meta: {breadcrumb: 'disabled'},
        view: 'tutorials/index',
      },
      {
        path: ':tutorialID',
        meta: {breadcrumb: 'currentTutorialName', placeholder: 'Detalhes sobre tutoria'},
        view: 'tutorialDetails/index',
        children: [
          {
            path: 'informacoes',
            name: 'Informações',
            meta: {breadcrumb: 'currentTutorialName', label: "Informações"},
            view: 'tutorialDetails/info/index',
          },
          {
            path: 'casos',
            name: 'Casos',
            meta: {breadcrumb: 'currentTutorialName', label: "Casos"},
            view: 'tutorialDetails/cases/index',
          },
          {
            path: 'notas',
            name: 'Notas',
            meta: {breadcrumb: 'currentTutorialName', label: "Notas"},
            view: 'tutorialDetails/evaluations/index',
          },
          {
            path: 'participantes',
            name: 'Participantes',
            meta: {breadcrumb: 'currentTutorialName', label: "Participantes"},
            view: 'tutorialDetails/participants/index',
          },
        ],
      },
    ],
  },
  {
    path: '/tutorias/:tutorialID/casos/:caseID',
    meta: {breadcrumb: 'currentTutorialName', placeholder: 'Tutoria'},
    view: 'caseDetails/index',
    children: [
          {
            path: 'passos',
            name: 'Passos',
            meta: {breadcrumb: 'currentCaseName', placeholder: "Caso"},
            view: 'caseDetails/steps/index',
          }
        ],
  },
];
