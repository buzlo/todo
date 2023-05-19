import { required, helpers } from '@vuelidate/validators'

export function useCreateRules() {
  const telValidate = helpers.regex(/^\+7 \d{3} \d{3}-\d{2}-\d{2}$/)
  const rules = {
    title: { required },
    tel: { required, telValidate }
  }

  return rules
}
