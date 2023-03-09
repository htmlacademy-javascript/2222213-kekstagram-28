const MIN_OBJ_COUNT = 1;
const MAX_OBJ_COUNT = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Пустынный пляж, видимо не сезон.',
  'Необычный указатель на пляж.',
  'Личное фото на берегу.',
  'На обед, суп.',
  'Крутая тачка.',
  'На завтрак ягоды и сок',
  'Таких обувниц в России я не видел.',
  'Дорога к морю.',
  'Суши-Кот.',
  'На концерте.',
  'Тапочки с фонариком? ЧТО?.',
  'Животный мир удивляет.',
];

const NAMES = [
  'Иван-Тюлпан',
  'Александр',
  'Виктория',
  'Анастасия',
  'Гектар',
  'Акриция',
  'Лилиту',
  'Кандрафон',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getMessage = () => {
  const randomMessageIndex = getRandomInteger(0, MESSAGES.length - 1);
  return MESSAGES[randomMessageIndex];
};

const getName = () => {
  const randomNameIndex = getRandomInteger(0, NAMES.length - 1);
  return NAMES[randomNameIndex];
};

const getDescription = () => {
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
  return DESCRIPTIONS[randomDescriptionIndex];
};

const getComments = (commentsCount) => {
  const comments = [];
  for (let i = 0; i <= commentsCount; i++) {
    const avatarNumber = getRandomInteger(1, 6);
    const comment = {
      id: i,
      avatar: `img/avatar-${avatarNumber}.svg`,
      message: getMessage(),
      name: getName(),
    };
    comments.push(comment);
  }
  return comments;
};

const getObjects = () => {
  const objects = [];
  for (let i = MIN_OBJ_COUNT; i <= MAX_OBJ_COUNT; i++) {
    const commentsCount = getRandomInteger(0, 3);
    const obj = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getDescription(),
      likes: getRandomInteger(15, 200),
      comment: getComments(commentsCount),
    };
    objects.push(obj);
  }
  return objects;
};

getObjects();
// console.log(getObjects());
