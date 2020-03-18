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
    name: 'Tutorias',
    meta: {
      breadcrumbs: breadcrumbs.tutorials
    },
    view: 'tutorials/index',
  },
  {
    path: '/tutorias/:tutorialID',
    meta: {breadcrumbs: [breadcrumbs.tutorial]},
    view: 'tutorialDetails/index',
    children: [
      {
        path: 'informacoes',
        name: 'TutoriaInfo',
        meta: {breadcrumbs: breadcrumbs.tutorial},
        view: 'tutorialDetails/info',
      },
      {
        path: 'casos',
        name: 'TutoriaCasos',
        meta: {breadcrumbs: breadcrumbs.tutorial},
        view: 'tutorialDetails/cases',
      },
      {
        path: 'notas',
        name: 'TutoriaNotas',
        meta: {breadcrumbs: breadcrumbs.tutorial},
        view: 'tutorialDetails/evaluations',
      },
      {
        path: 'participantes',
        name: 'TutoriaParticipantes',
        meta: {breadcrumbs: breadcrumbs.tutorial},
        view: 'tutorialDetails/participants',
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
        name: 'CasoPassos',
        meta: {breadcrumbs: breadcrumbs.tutorialCase},
        view: 'caseDetails/steps',
      },
      {
        path: 'geral',
        name: 'CasoGrupos',
        meta: {breadcrumbs: breadcrumbs.tutorialCase},
        view: 'caseDetails/groups',
      }
    ],
  },
  {
    path: '/tutorias/:tutorialID/casos/:caseID/passos',
    meta: {breadcrumbs: breadcrumbs.step},
    view: 'caseSteps/index',
    children: [
      {
        path: '1',
        meta: {breadcrumbs: breadcrumbs.step1},
        view: 'caseSteps/terms/index',
        children: [
          {
            path: 'individual',
            name: 'TermosIndividual',
            meta: {breadcrumbs: breadcrumbs.step1},
            view: 'caseSteps/terms/individual',
          },
          {
            path: 'geral',
            name: 'TermosGeral',
            meta: {breadcrumbs: breadcrumbs.step1},
            view: 'caseSteps/terms/ranking',
          }
        ],
      },
    ],
  }
];
