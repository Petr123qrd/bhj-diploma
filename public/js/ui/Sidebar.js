/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const button = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body');
    button.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const buttons = document.querySelectorAll('.sidebar-menu .menu-item');

    for (let button of buttons) {
      let buttonClassArray = Array.from(button.classList);
      let buttonClass = buttonClassArray[buttonClassArray.length - 1].slice(10);

      if(buttonClass === 'logout'){
        button.addEventListener('click', () => {
          User.logout((err, response) => {
            if(response.success){
              App.setState( 'init' );
            }
          })
        });
      } else {
        let modal = App.getModal(buttonClass);
        button.addEventListener('click', () => modal.open());
      }
    }
  }
}