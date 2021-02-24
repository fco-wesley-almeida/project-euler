/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import * as breadcrumbs from './breadcrumbs'
import ResetPassword from '@/views/auth/ResetPassword.vue'

export default [
  {
    path: '/semautorizacao',
    name: '',
    view: 'Unauthorized',
    meta: {
      breadcrumbs: breadcrumbs.unauthorized
    }
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    view: 'auth/Signup',
  },
  {
    path: '/resetarsenha',
    name: 'ResetarSenha',
    view: 'auth/ResetPassword',
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
    meta: { breadcrumbs: [breadcrumbs.tutorial] },
    view: 'tutorialDetails/index',
    children: [
      {
        path: 'informacoes',
        name: 'TutorialInfo',
        meta: { breadcrumbs: breadcrumbs.tutorial },
        view: 'tutorialDetails/info',
      },
      {
        path: 'casos',
        name: 'TutorialCases',
        meta: { breadcrumbs: breadcrumbs.tutorial },
        view: 'tutorialDetails/cases',
      },
      {
        path: 'notas',
        name: 'TutorialGrades',
        meta: { breadcrumbs: breadcrumbs.tutorial },
        view: 'tutorialDetails/evaluations',
      },
      {
        path: 'participantes',
        name: 'TutorialParticipants',
        meta: { breadcrumbs: breadcrumbs.tutorial },
        view: 'tutorialDetails/participants',
      },
    ],
  },
  {
    path: '/tutorias/:tutorialID/casos/:caseID',
    meta: { breadcrumbs: breadcrumbs.tutorialCase },
    view: 'caseDetails/index',
    children: [
      {
        path: 'conteudo',
        name: 'CaseContent',
        meta: { breadcrumbs: breadcrumbs.tutorialCase },
        view: 'caseDetails/content',
      },
      {
        path: 'objetivos',
        name: 'CaseObjectives',
        meta: { breadcrumbs: breadcrumbs.tutorialCase },
        view: 'caseDetails/objectives',
      },
      {
        path: 'passos-abertura',
        name: 'CaseSteps',
        meta: { breadcrumbs: breadcrumbs.tutorialCase },
        view: 'caseDetails/open_steps',
      },
      {
        path: 'passos-fechamento',
        name: 'CloseSteps',
        meta: { breadcrumbs: breadcrumbs.tutorialCase },
        view: 'caseDetails/close_steps',
      },
      {
        path: 'grupos',
        name: 'CaseGroups',
        meta: { breadcrumbs: breadcrumbs.tutorialCase },
        view: 'caseDetails/groups',
      },
    ],
  },
  {
    path: '/tutorias/:tutorialID/casos/:caseID/passos/:step',
    meta: { breadcrumbs: breadcrumbs.step },
    name: "CaseStep",
    view: 'caseSteps/index',
    children: [
      {
        path: 'conteudo',
        name: 'TermsContent',
        meta: { breadcrumbs: breadcrumbs.step },
        view: 'caseDetails/content',
      },
      {
        path: 'individual',
        name: 'TermsIndividual',
        meta: { breadcrumbs: breadcrumbs.step },
        view: 'caseSteps/terms/individual',
      },
      {
        path: 'geral',
        name: 'TermsRanking',
        meta: { breadcrumbs: breadcrumbs.step },
        view: 'caseSteps/terms/ranking',
      }
    ],
  },
];