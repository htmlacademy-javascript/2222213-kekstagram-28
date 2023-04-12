import uploadModalClose from './form.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const bodyTag = document.querySelector('body');
const errorElementTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorElementTemplate.cloneNode(true);

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      if (method === Method.POST) {
        const successElementTemplate = document.querySelector('#success')
          .content
          .querySelector('.success');
        const successElement = successElementTemplate.cloneNode(true);
        bodyTag.append(successElement);
        uploadModalClose();
        successElement.addEventListener('click', () => {
          successElement.remove();
        });
      }
      return response.json();
    })
    .catch(() => {
      bodyTag.append(errorElement);
      uploadModalClose();
      errorElement.addEventListener('click', () => {
        errorElement.remove();
      });
      bodyTag.append(errorElement);
      uploadModalClose();
      errorElement.addEventListener('click', () => {
        errorElement.remove();
      });
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) =>
  load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };

