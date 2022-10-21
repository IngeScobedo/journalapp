import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidators = {}) => {
  const [formState, setFormState] = useState(initialForm)
  const [formValidatorsConfig, setFormValidators] = useState({})

  useEffect(() => {
    createValidators()
  }, [formState])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidatorsConfig)) {
      if (formValidatorsConfig[formValue] !== null) return false
    }
    return true
  }, [formValidatorsConfig])

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  const createValidators = () => {
    const formCheckedValues = {}
    for (const formField of Object.keys(formValidators)) {
      const [fn, errorMessage = 'Campo requerido'] = formValidators[formField]
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
    }
    console.log(formCheckedValues)
    setFormValidators(formCheckedValues)
  }

  return {
    ...formState,
    ...formValidatorsConfig,
    formState,
    onInputChange,
    onResetForm,
    isFormValid
  }
}
