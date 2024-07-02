import { useFormik } from "formik";

// ручная валидация формы
const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Обязательное поле!';
    } else if (values.name.length < 2) {
        errors.name = 'Минимум 2 символа для заполнения'
    }

    if (!values.email) {
        errors.email = 'Обязательное поле!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Не правильный email адресс';
    }
    // Дальше можно добавить проверки остальных полей...

    return errors;
}

const Form = () => {
    const formik = useFormik({
        // 1. начальное значение
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false,
        },
        // 2. функция ручной валидации формы
        validate, // сокращенная форма validate: validate (эта функция будет срабатывать каждый раз при срабатываеии функции handleChange)
        // 3. функция (handleSubmit) при отправке нашей формы (Конструкция с JSON что бы вывести удобо читаемый объект)
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
        // 4. У этого хука есть объект touched (который отвечает за то что если мы взаимодействуем с конкретным инпутом то только тогда именно в нём будет выскакивать подсказка что мы сделали что то не так. если мы не назначим событие onBlur то подсказки будут выскакивать на всех инпутах )
    })

  return (
      <form className="form" onSubmit={formik.handleSubmit}>
          <h2>Отправить пожертвование</h2>
          <label htmlFor="name">Ваше имя</label>
          <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              // onBlur событие когда фокус ушел с инпута  
              onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}
          <label htmlFor="email">Ваша почта</label>
          <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              // onBlur событие когда фокус ушел с инпута  
              onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.name ? <div>{formik.errors.email}</div> : null}
          <label htmlFor="amount">Количество</label>
          <input
              id="amount"
              name="amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              // onBlur событие когда фокус ушел с инпута  
              onBlur={formik.handleBlur}
          />
          <label htmlFor="currency">Валюта</label>
          <select
              id="currency"
              name="currency"
              value={formik.values.currency}
              onChange={formik.handleChange}
              // onBlur событие когда фокус ушел с инпута  
              onBlur={formik.handleBlur}
              >
                  <option value="">Выберите валюту</option>
                  <option value="USD">USD</option>
                  <option value="UAH">UAH</option>
                  <option value="RUB">RUB</option>
          </select>
          <label htmlFor="text">Ваше сообщение</label>
          <textarea 
              id="text"
              name="text"
              value={formik.values.text}
              onChange={formik.handleChange}
              // onBlur событие когда фокус ушел с инпута  
              onBlur={formik.handleBlur}
          />
          <label className="checkbox">
              <input 
                name="terms" 
                type="checkbox"
                value={formik.values.terms}
                onChange={formik.handleChange}
                // onBlur событие когда фокус ушел с инпута  
                onBlur={formik.handleBlur}
                 />
              Соглашаетесь с политикой конфиденциальности?
          </label>
          <button type="submit">Отправить</button>
      </form>
  )
}

export default Form;