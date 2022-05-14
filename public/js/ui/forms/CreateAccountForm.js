/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      console.log(response)
      const modal = App.getModal( 'createAccount' );
      if (response && response.account) {
        App.update();
        modal.element.querySelector('#new-account-form').reset();
        modal.element.style.display = 'none';
      } else {
        const error = document.createElement('div');
        error.classList.add('alert');
        error.classList.add('alert-danger');
        error.innerText = response.error;
        modal.element.querySelector('.modal-body').append(error);
        setTimeout(()=>{
          modal.element.querySelector('.alert').remove();
        }, 2000)
      }
    });
  }
}