/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (error, response) => {
      if(response && response.success){
        response.data.forEach(el => {
          this.element.querySelector('.accounts-select').insertAdjacentHTML('beforeend', `<option value="${el.id}">${el.name}</option>`);
        })
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if(response && response.success){
        App.update();
        this.element.reset();
        this.element.closest('.modal').style.display = 'none';
      } else {
        alert(response.error)
      }
    });
  }
}