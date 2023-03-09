export function createSwitchStorageBtn(isLocalStorage) {
  const $switchBtn = document.createElement('button'),
    $nav = document.querySelector('.nav');

  $switchBtn.classList.add('btn', 'btn-link', 'nav-link');

  setSwitchBtnContent($switchBtn, isLocalStorage)

  $switchBtn.addEventListener('click', () => {
    localStorage.setItem('isLocal', !isLocalStorage);
    window.location.reload();
  })

  $nav.parentNode.insertBefore($switchBtn, $nav.nextSibling);
}

function setSwitchBtnContent($switchBtn, isLocalStorage) {
  if (isLocalStorage) {
    $switchBtn.textContent = 'Перейти на серверное хранилище';
  } else {
    $switchBtn.textContent = 'Перейти на локальное хранилище';
  }
}

export function checkStorageIsLocal() {
  const unparsed = localStorage.getItem('isLocal');
  return JSON.parse(unparsed) ?? 'local';
}

