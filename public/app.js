// Each block initializes one pattern. IDs must be unique when composing examples.
const form = document.querySelector('#signup');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstInvalid = null;
  const rules = [
    ['name', (value) => value.trim().length > 0, 'Enter your name.'],
    [
      'email',
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      'Enter an email such as name@example.com.',
    ],
  ];
  for (const [id, valid, message] of rules) {
    const input = document.getElementById(id),
      ok = valid(input.value);
    input.setAttribute('aria-invalid', String(!ok));
    document.getElementById(id + '-error').textContent = ok ? '' : message;
    if (!ok && !firstInvalid) firstInvalid = input;
  }
  document.querySelector('#form-status').textContent = firstInvalid
    ? 'Please correct the highlighted fields.'
    : 'Example complete. No information was sent or stored.';
  firstInvalid?.focus();
});
const dialog = document.querySelector('#dialog'),
  opener = document.querySelector('#open-dialog');
opener.addEventListener('click', () => dialog.showModal());
dialog.addEventListener('close', () => opener.focus());
const menuButton = document.querySelector('#menu-button'),
  menu = document.querySelector('#menu'),
  items = [...menu.querySelectorAll('[role=menuitem]')];
function closeMenu(restore = false) {
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  if (restore) menuButton.focus();
}
function openMenu(index = 0) {
  menu.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  items[index].focus();
}
menuButton.addEventListener('click', () => (menu.hidden ? openMenu() : closeMenu(true)));
menuButton.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    openMenu(e.key === 'ArrowUp' ? items.length - 1 : 0);
  }
});
menu.addEventListener('keydown', (e) => {
  const index = items.indexOf(document.activeElement);
  let next;
  if (e.key === 'ArrowDown') next = (index + 1) % items.length;
  if (e.key === 'ArrowUp') next = (index + items.length - 1) % items.length;
  if (e.key === 'Home') next = 0;
  if (e.key === 'End') next = items.length - 1;
  if (next !== undefined) {
    e.preventDefault();
    items[next].focus();
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMenu(true);
  }
  if (e.key === 'Tab') {
    closeMenu();
    menuButton.focus();
  }
});
for (const item of items)
  item.addEventListener('click', () => {
    document.querySelector('#menu-status').textContent =
      item.textContent + ' selected. This is a demonstration action.';
    closeMenu(true);
  });
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
});
document.addEventListener('focusin', (e) => {
  if (!menu.contains(e.target) && e.target !== menuButton) closeMenu();
});
const tabs = [...document.querySelectorAll('[role=tab]')];
function activate(tab) {
  for (const item of tabs) {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  }
  tab.focus();
}
for (const tab of tabs) {
  tab.addEventListener('click', () => activate(tab));
  tab.addEventListener('keydown', (e) => {
    const index = tabs.indexOf(tab);
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      e.preventDefault();
      activate(tabs[next]);
    }
  });
}
const toast = document.querySelector('#toast'),
  dismiss = document.querySelector('#dismiss');
let notifications = 0;
document.querySelector('#notify').addEventListener('click', () => {
  toast.textContent =
    'Demonstration ' +
    ++notifications +
    ' completed. No information was saved and no network request was made.';
  dismiss.hidden = false;
});
dismiss.addEventListener('click', () => {
  toast.textContent = '';
  dismiss.hidden = true;
  document.querySelector('#notify').focus();
});
