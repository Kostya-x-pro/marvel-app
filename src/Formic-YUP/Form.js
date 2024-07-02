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
            />
            <ErrorMessage className='error' name="name" component="div"/> 
            <label htmlFor="email">Ваша почта</label>
            <Field
                id="email"
                name="email"
                type="email"
            />
            <ErrorMessage className='error' name="email" component="div"/>
            <label htmlFor="amount">Количество</label>
            <Field
                id="amount"
                name="amount"
                type="number"
            />
            <ErrorMessage className='error' name="amount" component="div"/>
            <label htmlFor="currency">Валюта</label>
            <Field
                id="currency"
                name="currency"
                as="select" // этот проп говорит компоненту Field что бы он рендорился как "select"
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </Field>
            <ErrorMessage className='error' name="currency" component="div"/>
            <label htmlFor="text">Ваше сообщение</label>
            <Field
                id="text"
                name="text"
                as="textarea"
            />
            <ErrorMessage className='error' name="text" component="div"/>
            <label className="checkbox">
                <Field 
                    name="terms" 
                    type="checkbox"
                    />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            <ErrorMessage className='error' name="terms" component="div"/>
            <button type="submit">Отправить</button>
        </Form>
     </Formik>
  )
}

export default CustomForm;