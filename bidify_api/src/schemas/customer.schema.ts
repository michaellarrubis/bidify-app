import { z } from 'zod'

export const createCustomerSchema = z.object({
  body: z
    .object({
      customer: z.object({
        store_id: z.number(),
        key: z.string(),
        name: z.string().min(1, { message: '名前は必須です' }),
        tel: z.string().min(1, { message: '電話番号は必須です' }),
        email: z.string().min(1, { message: 'メールアドレスは必須です' }),
        zip_code_1: z.string().min(1, { message: '郵便番号は必須です' }),
        pref_code_1: z.string().min(1, { message: '都道府県は必須です' }),
        city_1: z.string().min(1, { message: '市区町村は必須です' }),
        address1_1: z.string().min(1, { message: '番地は必須です' }),
        address2_1: z.string().min(1, { message: '建物名は必須です' }),
        zip_code_2: z.string(),
        pref_code_2: z.string(),
        city_2: z.string(),
        address1_2: z.string(),
        address2_2: z.string(),
        value_1: z.string().optional(),
        value_2: z.string().optional(),
        value_3: z.string().optional(),
        value_4: z.string().optional(),
        value_5: z.string().optional(),
        value_6: z.string().optional(),
        value_7: z.string().optional(),
        value_8: z.string().optional(),
        value_9: z.string().optional(),
        value_10: z.string().optional(),
      }),
      customerOptionKey: z.object({}).optional(),
    })
    .strict(),
})

export const findCustomerSchema = z.object({
  query: z.object({
    page: z.string(),
    size: z.string(),
  }),
})

export const findOneCustomerSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})
