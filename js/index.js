// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
fruitsJSON = `[
  {"index": "0", "kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"index": "1", "kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"index": "2", "kind": "Личи", "color": "розово-красный", "weight": 17},
  {"index": "3", "kind": "Карамбола", "color": "желтый", "weight": 28},
  {"index": "4", "kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

function fruitsClear () {
  fruitsList.innerHTML = " ";
}

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

    fruitsClear();

  for (let i = 0; i < fruits.length; i++) {
    let index = document.createElement ("div");
    index.innerHTML = "index" + ': ' + fruits[i].index;
    let kind = document.createElement ("div");
    kind.innerHTML = "kind" + ': ' + fruits[i].kind;
    let color = document.createElement ("div");
    color.innerHTML = "color" + ': ' + fruits[i].color;
    let weight = document.createElement ("div");
    weight.innerHTML = "weight (кг)" + ': ' + fruits[i].weight;

    let info = document.createElement ("div");
    info.className = "fruit__info"
    info.appendChild (index);
    info.appendChild (kind);
    info.appendChild (color);
    info.appendChild (weight);

    let li = document.createElement("li");
    
    if (fruits[i].color === "фиолетовый") {
      li.className = "fruit__item" + " " + "fruit_violet";
    } else if (fruits[i].color === "зеленый") {
      li.className = "fruit__item" + " " + "fruit_green";
    } else if (fruits[i].color === "желтый") {
      li.className = "fruit__item" + " " + "fruit_yellow";
    } else if (fruits[i].color === "светло-коричневый") {
      li.className = "fruit__item" + " " + "fruit_lightbrown";
    } else {
      li.className = "fruit__item" + " " + "fruit_carmazin";
    }

    li.appendChild(info);

    fruitsList.appendChild(li);
    
    

    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    let randomFruit = getRandomInt(0, fruits.length - 1);
    let fruitsNewArr = fruits.splice(randomFruit, 1)[0];
    result.push(fruitsNewArr);
      
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }

  let isEqual = JSON.stringify(fruits) === JSON.stringify(result);
  console.log(isEqual);

  if (JSON.stringify(fruits) === JSON.stringify(result)) {
    alert ('Mistake');
  } else {
    fruits = result; 
  }

  
  
};


shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
// let minWeight = document.querySelector('.minweight__input').value;
let minWeightParam = 0
let maxWeightParam = 0

document.querySelector('.minweight__input').addEventListener("input", () => {
  minWeightParam = Number(document.querySelector('.minweight__input').value)
})
document.querySelector('.maxweight__input').addEventListener("input", () => {
  maxWeightParam = Number(document.querySelector('.maxweight__input').value)
});

const filterByWeight = (min, max) => {
  let sorted = fruits.filter(item => min <= item.weight && item.weight <= max)
  fruits = sorted
}

filterButton.addEventListener('click', () => {
  filterByWeight(minWeightParam, maxWeightParam);
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  const priority = ['красный', 'розово-красный', 'желтый', 'зеленый', 'светло-коричневый', 'фиолетовый', 'XXXL']
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 > priority2;
};
  // TODO: допишите функцию сравнения двух элементов по цвету



const sortAPI = {
  bubbleSort(fruits, comparation) {

  const n = fruits.length;
  
  for (let i=0; i < n-1; i++){
    for (let j = 0; j < n-1-i; j++){
      if (comparation (fruits[j], fruits[j+1])) {
        let temp = fruits[j+1];
        fruits[j+1] = fruits[j];
      fruits[j] = temp;
      }
    }
  }
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {

    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = "sorting...";
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
