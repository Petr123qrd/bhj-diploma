/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Ошибка: пустой элемент')
    }
    this.element = element;

    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeButton = this.element.querySelector('.create-income-button'),
          incomeModal = App.getModal('newIncome'),
          expenseButton = this.element.querySelector('.create-expense-button'),
          expenseModal = App.getModal('newExpense');

    incomeButton.addEventListener('click', () => incomeModal.open());
    expenseButton.addEventListener('click', () => expenseModal.open());
  }
}
