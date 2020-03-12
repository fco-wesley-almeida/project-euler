/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import * as breadcrumbs from './breadcrumbs'
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
    meta: {
      breadcrumbs: breadcrumbs.tutorials
    },
    children: [
      {
        path: '',
        name: 'Tutorias',
        meta: {
          breadcrumbs: breadcrumbs.tutorials
        },
        view: 'tutorials/index',
      },
      {
        path: ':tutorialID',
        meta: {breadcrumbs: [breadcrumbs.tutorials, breadcrumbs.tutorial]},
        view: 'tutorialDetails/index',
        children: [
          {
            path: 'informacoes',
            name: 'Tutoria',
            meta: {breadcrumbs: breadcrumbs.tutorial},
            view: 'tutorialDetails/info/index',
          },
          {
            path: 'casos',
            name: 'TutoriaCasos',
            meta: {breadcrumbs: breadcrumbs.tutorial},
            view: 'tutorialDetails/cases/index',
          },
          {
            path: 'notas',
            name: 'TutoriaNotas',
            meta: {breadcrumbs: breadcrumbs.tutorial},
            view: 'tutorialDetails/evaluations/index',
          },
          {
            path: 'participantes',
            name: 'TutoriaParticipantes',
            meta: {breadcrumbs: breadcrumbs.tutorial},
            view: 'tutorialDetails/participants/index',
          },
        ],
      },
    ],
  },
  {
    path: '/tutorias/:tutorialID/casos/:caseID',
    meta: {breadcrumbs: breadcrumbs.tutorialCase},
    view: 'caseDetails/index',
    children: [
      {
        path: 'passos',
        name: 'Passos',
        meta: {breadcrumbs: breadcrumbs.tutorialCase},
        view: 'caseDetails/steps/index',
      },
      {
        path: 'grupos',
        name: 'Grupos',
        meta: {breadcrumbs: breadcrumbs.tutorialCase},
        view: 'caseDetails/groups/index',
      }
    ],
  },
  {
    path: '/tutorias/:tutorialID/casos/:caseID/passos/1',
    meta: {breadcrumbs: breadcrumbs.step1},
    view: 'caseSteps/terms/index',
    children: [
      {
        path: 'individual',
        name: 'TermosIndividual',
        meta: {breadcrumbs: breadcrumbs.step1},
        view: 'caseSteps/terms/individual/index',
      },
      {
        path: 'geral',
        name: 'TermosGeral',
        meta: {breadcrumbs: breadcrumbs.step1},
        view: 'caseSteps/terms/ranking/index',
      }
    ],
  },
];
