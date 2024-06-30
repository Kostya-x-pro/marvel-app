import { createContext } from "react"

// createContext - принимает 1 аргумент (значение по умолчанию)
const dataContext = createContext({
  mail: "name@example.com",
  text: 'some text',
  forceChangeMail: () => {}
})

export default dataContext;