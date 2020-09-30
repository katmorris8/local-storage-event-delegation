const clearBtn = document.querySelector('.clear-btn');
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];

window.onload = showClearButton;

function addItem(e) {
  e.preventDefault();
  if (items.length === 0) {
    const starter = {
      text: 'taco/untaco all',
      done: false
    }
    items.push(starter);
    showClearButton();
  }
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  }
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  if (index === '0') {
    items['0'].done ? items.forEach(item => item.done = false) : items.forEach(item => item.done = true);
  } else {
    items[index].done = !items[index].done;
  }
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function clearItems() {
  items = [];
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
  showClearButton();
}

function showClearButton() {
  items.length === 0 ? clearBtn.style.display = 'none' : clearBtn.style.display = 'flex';
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearBtn.addEventListener('click', clearItems);

populateList(items, itemsList);
