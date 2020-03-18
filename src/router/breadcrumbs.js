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
  to: { name: 'TutoriaInfo' },
  text: 'currentTutorialName',
  label: '',
  title: 'Tutoria',
}]);

export const tutorialCase = tutorial.concat([{
  disabled: false,
  link: true,
  to: { name: 'CasoPassos' },
  text: 'currentCaseName',
  label: '',
  title: 'Caso',
}]);

export const step = tutorialCase.concat([{
  disabled: false,
  link: true,
  to: { name: 'CasoPassos' },
  text: '',
  label: '',
  title: 'Passos',
}]);

export const step1 = step.concat([{
  disabled: false,
  link: true,
  to: { name: 'TermosIndividual' },
  text: 'Identificação de termos',
  label: '',
  title: 'Passo 1',
}]);

