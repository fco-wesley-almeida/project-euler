export const tutorials = [{
  disabled: false,
  link: true,
  to: { name: 'Tutorias', params: {} },
  text: 'Tutorias',
  label: '',
  title: 'Tutorias',
}];

export const tutorial = tutorials.concat([{
  disabled: false,
  link: true,
  to: { name: 'TutorialInfo' },
  text: 'currentTutorialName',
  label: '',
  title: 'Tutoria',
}]);

export const tutorialCase = tutorial.concat([{
  disabled: false,
  link: true,
  to: { name: 'CaseSteps' },
  text: 'currentCaseName',
  label: '',
  title: 'Caso',
}]);

export const step = tutorialCase.concat([{
  disabled: false,
  link: true,
  to: { name: 'CaseSteps' },
  text: 'currentStep',
  label: '',
  title: 'Passos',
}]);

