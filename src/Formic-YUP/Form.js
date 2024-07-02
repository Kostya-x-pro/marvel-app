import { useFormik } from "formik";
// Импортировать всё в объект Yup из библеотеки yup
import * as Yup from 'yup'


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
        // 2. функция validationSchema приходит из библеотеки по валидации YUP
        validationSchema: Yup.object({
            name: Yup.string()
                    .min(2, 'Минимум 2 символа!')
                    .required('Обязательное поле!'),
            email: Yup.string()
                    .email('Неправильный email адрес')
                    .required('Обязательное поле!'),
            amount: Yup.number()
                    .min(5, 'Не менее 5')
                    .required('Обязательное поле!'),
            currency: Yup.string().required('Выберите валюту'),
            text: Yup.string()
                    .min(10, 'Минимум 10 символов!'),
            terms: Yup.boolean()
                    .required('Необходимо согласие')
                    .oneOf([true], 'Необходимо согласие'),
        }), 
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
          {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
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
          {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
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
          {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null}
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
          {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div> : null}
          <label htmlFor="text">Ваше сообщение</label>
          <textarea 
              id="text"
              name="text"
              value={formik.values.text}
              onChange={formik.handleChange}
              // onBlur событие когда фокус ушел с инпута  
              onBlur={formik.handleBlur}
          />
          {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null}
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
          {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null}
          <button type="submit">Отправить</button>
      </form>
  )
}

export default Form;