import { Formik, Form, Field, ErrorMessage } from 'formik';
// Импортировать всё в объект Yup из библеотеки yup
import * as Yup from 'yup'


const CustomForm = () => {
  return (
     <Formik
        // 1. пропс начальное значение 
        initialValues ={{
                    name: '',
                    email: '',
                    amount: 0,
                    currency: '',
                    text: '',
                    terms: false,
                    }}
        // 2. пропс функция validationSchema приходит из библеотеки по валидации YUP
        validationSchema = {Yup.object({
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
        })}
        // 3. функция (handleSubmit) при отправке нашей формы (Конструкция с JSON что бы вывести удобо читаемый объект)
        onSubmit={values => console.log(JSON.stringify(values, null, 2)) }
        // 4. У этого хука есть объект touched (который отвечает за то что если мы взаимодействуем с конкретным инпутом то только тогда именно в нём будет выскакивать подсказка что мы сделали что то не так. если мы не назначим событие onBlur то подсказки будут выскакивать на всех инпутах )
     >
         <Form className="form" >
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <Field
                id="name"
                name="name"
                type="text"
                // Встроенная функция в Формик которая позволяет получить поля конкретного инпута (она заменяет value, onChange={handleChange}, onBlur={handleBlur}) не нужен если мы используем Field (вместо inputa)
                // {...formik.getFieldProps('name')} 
            />
            {/* {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}  компонент ErrorMessage заменяет эту конструкцию */}
            <ErrorMessage className='error' name="name" component="div"/> 
            <label htmlFor="email">Ваша почта</label>
            <Field
                id="email"
                name="email"
                type="email"
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // // onBlur событие когда фокус ушел с инпута  
                // onBlur={formik.handleBlur}
            />
            {/* {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null} */}
            <ErrorMessage className='error' name="email" component="div"/>
            <label htmlFor="amount">Количество</label>
            <Field
                id="amount"
                name="amount"
                type="number"
                // value={formik.values.amount}
                // onChange={formik.handleChange}
                // // onBlur событие когда фокус ушел с инпута  
                // onBlur={formik.handleBlur}
            />
            {/* {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null} */}
            <ErrorMessage className='error' name="amount" component="div"/>
            <label htmlFor="currency">Валюта</label>
            <Field
                id="currency"
                name="currency"
                as="select" // этот проп говорит компоненту Field что бы он рендорился как "select"
                // value={formik.values.currency}
                // onChange={formik.handleChange}
                // // onBlur событие когда фокус ушел с инпута  
                // onBlur={formik.handleBlur}
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </Field>
            {/* {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div> : null} */}
            <ErrorMessage className='error' name="currency" component="div"/>
            <label htmlFor="text">Ваше сообщение</label>
            <Field
                id="text"
                name="text"
                as="textarea"
                // value={formik.values.text}
                // onChange={formik.handleChange}
                // // onBlur событие когда фокус ушел с инпута  
                // onBlur={formik.handleBlur}
            />
            <ErrorMessage className='error' name="text" component="div"/>
            {/* {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null} */}
            <label className="checkbox">
                <Field 
                    name="terms" 
                    type="checkbox"
                    // value={formik.values.terms}
                    // onChange={formik.handleChange}
                    // // onBlur событие когда фокус ушел с инпута  
                    // onBlur={formik.handleBlur}
                    />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {/* {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null} */}
            <ErrorMessage className='error' name="terms" component="div"/>
            <button type="submit">Отправить</button>
        </Form>
     </Formik>
  )
}

export default CustomForm;