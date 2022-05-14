/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      const modal = App.getModal( 'login' );
      if (response && response.user) {
        App.setState( 'user-logged' );
        modal.element.querySelector('#login-form').reset();
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