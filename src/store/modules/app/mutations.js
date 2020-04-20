import { set } from '@/utils/vuex';

export default {
  setUserID: set('userID'),
  setUser: set('user'),
  setCurrentTutorialName: set('currentTutorialName'),
  setCurrentCaseName: set('currentCaseName'),
  setCurrentStep: set('currentStep')
};
